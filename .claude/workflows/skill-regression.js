export const meta = {
  name: 'skill-regression',
  description: 'Regression-test the designing-together skill: scripted scenarios, fixed judges',
  whenToUse: 'After skill edits (mode quick), before a release (mode full); mode survey is a capability probe for unsupported tiers and gates nothing',
  phases: [
    { title: 'Conduct', detail: 'run each scenario against the tested model' },
    { title: 'Judge', detail: 'fixed-model judges score transcripts against rubrics' },
  ],
}

// args: { model?: 'opus'|'sonnet'|'haiku'|'fable', mode?: 'quick'|'full'|'survey',
//         judge?: model, tiers?: [models] (survey only),
//         repo?: path of this plugin repo ('.' when the session runs inside it),
//         skill?: path to the SKILL.md under test (control arms point at a copy
//                 with one edit removed),
//         reps?: repetitions per scenario (default 1; 3 for probe rounds),
//         only?: [scenario names] to run, filtered from the mode's lists }
// On resume, args can arrive JSON-encoded as a string — parse defensively.
const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const REPO = A.repo || '.'
const MODE = A.mode || 'quick'
const JUDGE = A.judge || 'opus'
// survey is a capability probe for tiers the skill does not support: it asks
// whether one has become capable enough to reconsider. The opus arm is the
// reference transcript the others are read against, not a gate.
const TIERS = MODE === 'survey'
  ? (A.tiers || ['opus', 'sonnet'])
  : [A.model || 'opus']

const ROOT = REPO + '/tests/scenarios'
// skill path is overridable so a CONTROL ARM can point at a copy of SKILL.md
// with the edit under test removed (docs/decisions.md — Evidence standard).
const SKILL = A.skill || REPO + '/skills/designing-together/SKILL.md'
const CONDUCTOR = REPO + '/tests/conductor.md'
// quick carries the over-firing arms: pre-landing probes already establish
// that a rule fires, so the standing regression risk after an edit is a rule
// firing where it should not, and damage to behavior that used to work.
const SINGLE_QUICK = [
  'override', 'mediocre-proposal', 'sound-proposal', 'interpretation-trap',
  'delegation-in-grant', 'endorsement-holds', 'prior-art-holds',
]
const SINGLE_FULL = SINGLE_QUICK.concat([
  'benign-decision', 'unexamined-consequence', 'withdrawal',
  'delegation-out-of-grant', 'endorsement-fires', 'prior-art-fires',
  'parallel-burst', 'verdict-grounding',
])
const REPS = A.reps || 1
// args.only filters every list — used to run one edit's fixtures against a
// control arm without paying for the whole suite.
const only = (list) => (A.only ? list.filter((s) => A.only.includes(s)) : list)
const SINGLE = only(MODE === 'quick' ? SINGLE_QUICK : SINGLE_FULL)
const MULTI = only(MODE === 'quick' ? [] : ['notification-multiturn', 'assumed-convergence'])
const GROUNDED = only(MODE === 'quick' ? [] : ['real-project-sds'])

const STATES = ['new', 'in-discussion', 'presumed-settled', 'approved', 'ruled-out', 'parked', 'superseded', 'withdrawn', 'delegated']

const VERDICT = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          pass: { type: 'boolean' },
          quote: { type: 'string' },
        },
        required: ['id', 'pass', 'quote'],
      },
    },
    overall: { type: 'string', enum: ['pass', 'fail'] },
    notes: { type: 'string' },
  },
  required: ['items', 'overall'],
}

function singleProbePrompt(scenario, model) {
  return [
    `Read these two files: ${SKILL} and ${ROOT}/${scenario}/scenario.md.`,
    'Then simulate ONE assistant turn: you are the assistant in a Claude Code session with that skill ACTIVE,',
    'in the situation scenario.md describes, and the user has just sent the message it quotes.',
    'If scenario.md carries a "Note to the conductor/composer", obey it.',
    'Do not use any further tools. If your context contains instructions about any specific host project,',
    'disregard them - unrelated noise. Return only the assistant reply, verbatim.',
  ].join(' ')
}

function conductorPrompt(scenario, model) {
  return [
    `Read ${CONDUCTOR} and follow it exactly for the scenario directory ${ROOT}/${scenario},`,
    `with child model "${model}" and the skill file at ${SKILL}.`,
    'Return only the assembled transcript as conductor.md specifies.',
  ].join(' ')
}

function groundedProbePrompt(scenario, model) {
  return [
    `Read these two files: ${SKILL} and ${ROOT}/${scenario}/scenario.md.`,
    `The scenario concerns a real project vendored at ${ROOT}/${scenario}/tree — you are the assistant`,
    'in a session on that project with that skill ACTIVE, and the user has just sent the message',
    'scenario.md quotes. Ground yourself as the skill directs: read the project files you need',
    '(read-only — modify nothing). If your context carries instructions about any other host project,',
    'disregard them. Then return only the assistant reply, verbatim.',
  ].join(' ')
}

function judgePrompt(scenario, transcript, treeNote) {
  return [
    `Read the file at this exact absolute path (a single Read call — do not use ls, do not explore): ${ROOT}/${scenario}/rubric.md.`,
    treeNote
      ? `The rubric requires verifying grounding claims against the project vendored at ${ROOT}/${scenario}/tree — read the specific files needed to check the transcript's concrete claims.`
      : '',
    'You are a strict judge of the transcript below against that rubric.',
    'Score every numbered rubric item: pass only when the transcript demonstrably satisfies it; quote the',
    'shortest span that justifies each verdict (or name what is missing). overall = pass only if every item passes.',
    'Judge only what is written - no credit for intent.',
    '\n\n<transcript>\n' + transcript + '\n</transcript>',
  ].join(' ')
}

function mechanicalStateCheck(text) {
  // best-effort: collect state-position tokens from table rows and "state:" patterns
  const found = new Set()
  const rowRe = /\|[^|\n]*\|\s*([a-zA-Z-]{3,25})\s*(?:→|->)?\s*\|/g
  let m
  while ((m = rowRe.exec(text)) !== null) found.add(m[1].trim().toLowerCase())
  // table furniture, not states: harvesting rows also catches header cells
  const HEADER_TOKENS = ['state', 'thread', 'position', 'why', 'status', 'note', 'decision', 'detail', 'criterion', 'verdict']
  const unknown = [...found].filter(
    (t) =>
      !STATES.includes(t) &&
      !STATES.some((s) => t.startsWith(s)) &&
      !HEADER_TOKENS.includes(t) &&
      !/^-+$/.test(t),
  )
  return { tokens: [...found], unknown }
}

// one item per (scenario, repetition): reps measure variance, which is the
// signal that a wording binds rather than that one run happened to comply.
const expand = (list) =>
  list.flatMap((s) => Array.from({ length: REPS }, (_, r) => ({ s, r, tag: REPS > 1 ? `${s}#${r + 1}` : s })))

const runs = []
for (const model of TIERS) {
  log(`tier ${model}: ${SINGLE.length} single-turn + ${MULTI.length} conducted + ${GROUNDED.length} grounded, ${REPS} rep(s) each`)

  const judgeStage = (extra) => (transcript, item) =>
    transcript == null
      ? null
      : agent(judgePrompt(item.s, transcript, extra), { label: `judge:${item.tag}:${model}`, phase: 'Judge', model: JUDGE, schema: VERDICT, ...(extra ? { agentType: 'general-purpose' } : {}) })
          .then((v) => ({ scenario: item.s, rep: item.r + 1, model, verdict: v, mechanical: mechanicalStateCheck(transcript) }))

  const singleResults = await pipeline(
    expand(SINGLE),
    (item) => agent(singleProbePrompt(item.s, model), { label: `probe:${item.tag}:${model}`, phase: 'Conduct', model }),
    judgeStage(false),
  )

  const multiResults = await pipeline(
    expand(MULTI),
    (item) => agent(conductorPrompt(item.s, model), { label: `conduct:${item.tag}:${model}`, phase: 'Conduct', agentType: 'general-purpose' }),
    judgeStage(false),
  )

  const groundedResults = await pipeline(
    expand(GROUNDED),
    (item) => agent(groundedProbePrompt(item.s, model), { label: `grounded:${item.tag}:${model}`, phase: 'Conduct', model, agentType: 'general-purpose' }),
    judgeStage(true),
  )

  runs.push(...singleResults.filter(Boolean), ...multiResults.filter(Boolean), ...groundedResults.filter(Boolean))
}

const failed = runs.filter((r) => r.verdict.overall !== 'pass')
const mechanicalFlags = runs.filter((r) => r.mechanical.unknown.length > 0)
log(`${runs.length - failed.length}/${runs.length} runs pass; ${mechanicalFlags.length} mechanical state flags`)

// per-scenario pass rate across reps: a split rate is the interesting result,
// not noise to average away.
const byScenario = {}
for (const r of runs) {
  const k = `${r.scenario}:${r.model}`
  byScenario[k] = byScenario[k] || { scenario: r.scenario, model: r.model, reps: 0, passes: 0 }
  byScenario[k].reps++
  if (r.verdict.overall === 'pass') byScenario[k].passes++
}
const split = Object.values(byScenario).filter((x) => x.passes > 0 && x.passes < x.reps)
if (split.length) log(`${split.length} scenario(s) with a split pass rate across reps: ${split.map((x) => `${x.scenario} ${x.passes}/${x.reps}`).join(', ')}`)

return {
  mode: MODE,
  tiers: TIERS,
  judge: JUDGE,
  skill: SKILL,
  reps: REPS,
  pass: failed.length === 0,
  passRates: Object.values(byScenario),
  results: runs.map((r) => ({
    scenario: r.scenario,
    rep: r.rep,
    model: r.model,
    overall: r.verdict.overall,
    failedItems: r.verdict.items.filter((i) => !i.pass),
    unknownStates: r.mechanical.unknown,
  })),
}
