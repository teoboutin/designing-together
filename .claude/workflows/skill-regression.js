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
//         reps?: repetitions per scenario (default 3; pass 1 for a smoke run),
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
//
// WHAT QUICK DOES NOT COVER, stated so a green is not over-read: no fires arm
// for material findings, withdrawal, consolidation, or the state enum. An edit
// that breaks one of those passes quick green. Those arms live in `full`, which
// is the mode that says anything about collateral damage.
const SINGLE_QUICK = [
  'override', 'mediocre-proposal', 'sound-proposal', 'interpretation-trap',
  'delegation-in-grant', 'endorsement-holds', 'prior-art-holds',
]
const SINGLE_FULL = SINGLE_QUICK.concat([
  'benign-decision', 'unexamined-consequence', 'withdrawal',
  'delegation-out-of-grant', 'self-refuting-proposal', 'prior-art-fires',
  'parallel-burst', 'verdict-grounding', 'verdict-grounding-decided',
])
// Default 3, not 1. A single rep is known to flap on identical text (the
// ledger records 1/2 splits), and the split-rate reporting below only says
// anything at reps > 1 — a default of 1 made the harness's own variance
// signal dead by default. Pass reps: 1 explicitly for a cheap smoke run.
const REPS = A.reps || 3
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
    'Read these two files, each at its exact absolute path (two Read calls — do not use ls, do not explore):',
    `${ROOT}/${scenario}/rubric.md — the rubric you score against; and`,
    `${ROOT}/${scenario}/scenario.md — the situation and the user message this transcript is replying to.`,
    // Without scenario.md the judge scored blind: a single-turn transcript is
    // the assistant reply alone, so every rubric item referring to what the
    // user said was being guessed at.
    'scenario.md is CONTEXT, not a second rubric: it tells you what the user said and what the thread state was.',
    'Any "Note to the conductor/composer" section in it is test setup, not part of the user message.',
    'Score ONLY the numbered items in rubric.md; do not add expectations of your own from scenario.md.',
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

// A delta row is identified by its FIRST cell: the skill requires every thread
// slug to carry a distinguishing mark (a code span or a `#` prefix), which is
// what separates a real delta row from the document's other tables. Gating on
// the mark removes the header row and the Excuse/Reality furniture without a
// stoplist, and lets a delta row whose state cell does not parse be REPORTED
// rather than skipped — `approved, amended` is an invented state this project
// has actually observed, and it is not a single legal token.
const SLUG_CELL = /^(`[^`]+`|#[A-Za-z0-9_-]+)$/
const STATE_TOKEN = /^[a-z][a-z-]{2,24}$/

// The failure mode to design against here is a SILENT one. An earlier version
// sampled with a character class that excluded backticks, so every state
// written as a code span — which is how the skill writes them — was invisible,
// and "0 flags" meant "nothing parsed", not "nothing wrong". `rows` is returned
// so the two are distinguishable at the summary.
function mechanicalStateCheck(text) {
  const found = new Set()
  const unparsed = new Set()
  let rows = 0
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('|')) continue
    const cells = trimmed.split('|').slice(1, -1).map((c) => c.trim())
    if (cells.length < 2) continue
    if (!SLUG_CELL.test(cells[0])) continue
    rows++
    const cell = cells[1].replace(/`/g, '').trim()
    if (!cell) continue
    // "new → approved" records a transition; the state it lands in is last
    const parts = cell.split(/→|->/).map((p) => p.trim()).filter(Boolean)
    const token = (parts[parts.length - 1] || '').toLowerCase()
    if (STATE_TOKEN.test(token)) found.add(token)
    else unparsed.add(cell)
  }
  const unknown = [...found].filter((t) => !STATES.includes(t)).concat([...unparsed])
  return { rows, tokens: [...found], unknown }
}

// one item per (scenario, repetition): reps measure variance, which is the
// signal that a wording binds rather than that one run happened to comply.
const expand = (list) =>
  list.flatMap((s) => Array.from({ length: REPS }, (_, r) => ({ s, r, tag: REPS > 1 ? `${s}#${r + 1}` : s })))

const runs = []
for (const model of TIERS) {
  log(`tier ${model}: ${SINGLE.length} single-turn + ${MULTI.length} conducted + ${GROUNDED.length} grounded, ${REPS} rep(s) each`)

  // `overall` is RECOMPUTED from the items rather than trusted: the judge is
  // told "overall = pass only if every item passes", and a judge that reports
  // otherwise is itself a result worth seeing (judgeMismatch below). An empty
  // items array is a failed judgement, not a pass.
  const scoreFromItems = (v) => (v.items.length > 0 && v.items.every((i) => i.pass) ? 'pass' : 'fail')

  const judgeStage = (extra) => (transcript, item) =>
    transcript == null
      ? null
      : agent(judgePrompt(item.s, transcript, extra), { label: `judge:${item.tag}:${model}`, phase: 'Judge', model: JUDGE, schema: VERDICT, ...(extra ? { agentType: 'general-purpose' } : {}) })
          .then((v) => ({
            scenario: item.s,
            rep: item.r + 1,
            model,
            verdict: { ...v, overall: scoreFromItems(v), reportedOverall: v.overall },
            judgeMismatch: v.overall !== scoreFromItems(v),
            mechanical: mechanicalStateCheck(transcript),
          }))

  // The three categories run CONCURRENTLY. Awaiting them in sequence made
  // wall-clock the SUM of the categories, and the conducted scenarios are the
  // long pole by an order of magnitude (a conductor drives a child across four
  // turns). Conducted is listed first so its agents claim concurrency slots
  // before the cheap single-turn probes fill them.
  const [multiResults, groundedResults, singleResults] = await Promise.all([
    pipeline(
      expand(MULTI),
      (item) => agent(conductorPrompt(item.s, model), { label: `conduct:${item.tag}:${model}`, phase: 'Conduct', agentType: 'general-purpose' }),
      judgeStage(false),
    ),
    pipeline(
      expand(GROUNDED),
      (item) => agent(groundedProbePrompt(item.s, model), { label: `grounded:${item.tag}:${model}`, phase: 'Conduct', model, agentType: 'general-purpose' }),
      judgeStage(true),
    ),
    pipeline(
      expand(SINGLE),
      (item) => agent(singleProbePrompt(item.s, model), { label: `probe:${item.tag}:${model}`, phase: 'Conduct', model }),
      judgeStage(false),
    ),
  ])

  runs.push(...singleResults.filter(Boolean), ...multiResults.filter(Boolean), ...groundedResults.filter(Boolean))
}

// The grounded probe runs with full tools against a real vendored codebase and
// is told to modify nothing. That instruction is not enforceable from here:
// worktree isolation would not help, because the prompts carry absolute paths
// into the MAIN working tree and the agent would read and write through those
// regardless. So the violation is made DETECTABLE instead. The vendored trees
// are committed and nothing else in the repository touches them, so any dirt
// under them is the probe's. Reported, not gated — and not attributable to a
// single rep, since reps run concurrently.
let treeIntegrity = null
if (GROUNDED.length) {
  treeIntegrity = await agent(
    [
      `Run exactly this one command from ${REPO}: git status --porcelain -- 'tests/scenarios/*/tree'`,
      'Report its raw output. Do not explore, do not read files, do not modify anything, run no other command.',
      'Empty output means the vendored trees are untouched.',
    ].join(' '),
    {
      label: 'verify:vendored-trees',
      phase: 'Judge',
      model: JUDGE,
      agentType: 'general-purpose',
      schema: {
        type: 'object',
        properties: { dirty: { type: 'boolean' }, output: { type: 'string' } },
        required: ['dirty', 'output'],
      },
    },
  )
  if (treeIntegrity && treeIntegrity.dirty) {
    log(`VENDORED TREE MODIFIED by a grounded probe — the read-only instruction was not honored:\n${treeIntegrity.output}`)
  }
}

const failed = runs.filter((r) => r.verdict.overall !== 'pass')
const mechanicalFlags = runs.filter((r) => r.mechanical.unknown.length > 0)
const mismatches = runs.filter((r) => r.judgeMismatch)
const unparsedRuns = runs.filter((r) => r.mechanical.rows === 0)
log(`${runs.length - failed.length}/${runs.length} runs pass; ${mechanicalFlags.length} mechanical state flags over ${runs.reduce((n, r) => n + r.mechanical.rows, 0)} parsed delta rows`)
// "0 flags" from 0 parsed rows is not a clean result; it is no result.
if (unparsedRuns.length) log(`${unparsedRuns.length} run(s) produced no parseable delta row — the state check said nothing about them: ${unparsedRuns.map((r) => `${r.scenario}#${r.rep}`).join(', ')}`)
if (mismatches.length) log(`${mismatches.length} judge(s) reported an overall that its own items contradict: ${mismatches.map((r) => `${r.scenario}#${r.rep}`).join(', ')}`)

// Zero runs is not a pass. `only` filters every list, so a name that matches
// nothing in the selected mode (`only: ['assumed-convergence']` under `quick`,
// whose multi-turn list is empty) used to select nothing and return pass:true.
const selectedNothing = runs.length === 0
if (selectedNothing) log(`NO RUNS: mode "${MODE}"${A.only ? ` with only=[${A.only}]` : ''} selected zero scenarios. This is a harness error, not a pass.`)

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
  runs: runs.length,
  vendoredTreeDirty: treeIntegrity ? treeIntegrity.dirty : null,
  vendoredTreeStatus: treeIntegrity && treeIntegrity.dirty ? treeIntegrity.output : undefined,
  pass: !selectedNothing && failed.length === 0,
  error: selectedNothing ? 'no scenarios selected — check mode/only' : undefined,
  judgeMismatches: mismatches.map((r) => ({ scenario: r.scenario, rep: r.rep, reported: r.verdict.reportedOverall, recomputed: r.verdict.overall })),
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
