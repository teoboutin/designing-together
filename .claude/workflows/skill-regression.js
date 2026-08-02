export const meta = {
  name: 'skill-regression',
  description: 'Regression-test the designing-together skill: scripted scenarios, fixed judges',
  whenToUse: 'After skill edits (mode quick), before a release (mode full), on model version bumps (mode survey with tiers)',
  phases: [
    { title: 'Conduct', detail: 'run each scenario against the tested model' },
    { title: 'Judge', detail: 'fixed-model judges score transcripts against rubrics' },
  ],
}

// args: { model?: 'opus'|'sonnet'|'haiku'|'fable', mode?: 'quick'|'full'|'survey',
//         judge?: model, tiers?: [models] (survey only),
//         repo?: path of this plugin repo ('.' when the session runs inside it) }
// On resume, args can arrive JSON-encoded as a string — parse defensively.
const A = typeof args === 'string' ? JSON.parse(args) : (args || {})
const REPO = A.repo || '.'
const MODE = A.mode || 'quick'
const JUDGE = A.judge || 'opus'
const TIERS = MODE === 'survey'
  ? (A.tiers || ['opus', 'sonnet', 'haiku'])
  : [A.model || 'opus']

const ROOT = REPO + '/tests/scenarios'
const SKILL = REPO + '/skills/designing-together/SKILL.md'
const CONDUCTOR = REPO + '/tests/conductor.md'
const SINGLE_QUICK = ['override', 'mediocre-proposal', 'sound-proposal', 'interpretation-trap']
const SINGLE_FULL = SINGLE_QUICK.concat(['benign-decision', 'unexamined-consequence', 'withdrawal'])
const SINGLE = MODE === 'quick' ? SINGLE_QUICK : SINGLE_FULL
const MULTI = MODE === 'quick' ? [] : ['notification-multiturn']
const GROUNDED = MODE === 'quick' ? [] : ['real-project-sds']

const STATES = ['new', 'in-discussion', 'presumed-settled', 'approved', 'ruled-out', 'parked', 'superseded', 'withdrawn']

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
  const HEADER_TOKENS = ['state', 'thread', 'position', 'why', 'status']
  const unknown = [...found].filter(
    (t) =>
      !STATES.includes(t) &&
      !STATES.some((s) => t.startsWith(s)) &&
      !HEADER_TOKENS.includes(t) &&
      !/^-+$/.test(t),
  )
  return { tokens: [...found], unknown }
}

const runs = []
for (const model of TIERS) {
  log(`tier ${model}: ${SINGLE.length} single-turn + ${MULTI.length} conducted scenario(s)`)

  const singleResults = await pipeline(
    SINGLE,
    (s) => agent(singleProbePrompt(s, model), { label: `probe:${s}:${model}`, phase: 'Conduct', model }),
    (transcript, s) =>
      transcript == null
        ? null
        : agent(judgePrompt(s, transcript), { label: `judge:${s}:${model}`, phase: 'Judge', model: JUDGE, schema: VERDICT })
            .then((v) => ({ scenario: s, model, verdict: v, mechanical: mechanicalStateCheck(transcript) })),
  )

  const multiResults = await pipeline(
    MULTI,
    (s) => agent(conductorPrompt(s, model), { label: `conduct:${s}:${model}`, phase: 'Conduct', agentType: 'general-purpose' }),
    (transcript, s) =>
      transcript == null
        ? null
        : agent(judgePrompt(s, transcript), { label: `judge:${s}:${model}`, phase: 'Judge', model: JUDGE, schema: VERDICT })
            .then((v) => ({ scenario: s, model, verdict: v, mechanical: mechanicalStateCheck(transcript) })),
  )

  const groundedResults = await pipeline(
    GROUNDED,
    (s) => agent(groundedProbePrompt(s, model), { label: `grounded:${s}:${model}`, phase: 'Conduct', model, agentType: 'general-purpose' }),
    (transcript, s) =>
      transcript == null
        ? null
        : agent(judgePrompt(s, transcript, true), { label: `judge:${s}:${model}`, phase: 'Judge', model: JUDGE, agentType: 'general-purpose', schema: VERDICT })
            .then((v) => ({ scenario: s, model, verdict: v, mechanical: mechanicalStateCheck(transcript) })),
  )

  runs.push(...singleResults.filter(Boolean), ...multiResults.filter(Boolean), ...groundedResults.filter(Boolean))
}

const failed = runs.filter((r) => r.verdict.overall !== 'pass')
const mechanicalFlags = runs.filter((r) => r.mechanical.unknown.length > 0)
log(`${runs.length - failed.length}/${runs.length} scenarios pass; ${mechanicalFlags.length} mechanical state flags`)

return {
  mode: MODE,
  tiers: TIERS,
  judge: JUDGE,
  pass: failed.length === 0,
  results: runs.map((r) => ({
    scenario: r.scenario,
    model: r.model,
    overall: r.verdict.overall,
    failedItems: r.verdict.items.filter((i) => !i.pass),
    unknownStates: r.mechanical.unknown,
  })),
}
