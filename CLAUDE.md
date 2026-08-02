# designing-together (plugin repo)

A Claude Code plugin carrying one skill: `skills/designing-together/SKILL.md`,
which shapes design discussions into open, argued exchanges. This file
documents how the skill is maintained; the README documents what it does
and its grounding in the literature.

## Layout

- `.claude-plugin/plugin.json` — plugin manifest (name, version, metadata).
- `.claude-plugin/marketplace.json` — the repo is its own marketplace, so
  `/plugin marketplace add <owner>/designing-together` works directly.
- `skills/designing-together/SKILL.md` — the skill. The frontmatter
  `description` states triggering conditions only, never the workflow
  (a description that summarizes the process becomes a shortcut agents
  follow instead of reading the skill).
- `docs/decisions.md` — the decision home: a present-tense head plus a
  dated append-only ledger.
- `docs/field-reports/` — observations from real sessions using the
  skill; evidence, not decisions.

**Where a decision lands.** Every decision about this repository goes
in `docs/decisions.md`: the head is rewritten as if the design had
always been so, and the dated entry is appended, in the same change as
the work. This file states the operational rules and points at a
ledger entry when a rule needs its justification — it does not retell
the argument. Point at a head for *what* and *how*, at a dated entry
for *why*, never at a field report or a convergence spec.

**Field reports are ephemeral.** A report is committed under
`docs/field-reports/`, and deleted from the tip once every one of its
findings is resolved or rejected — kept in history, recoverable, never
referenced from a durable document. The entry that resolves a finding
must carry enough of the evidence to stand without the report. This is
the lifecycle the origin project gives specs and plans.

**Target tier is a non-goal, not a limitation.** The skill is for
frontier-tier models and is not simplified for smaller ones; their
role is as implementation workers conducted by a frontier model. "A
smaller model would not follow this" argues neither for nor against
any wording (`docs/decisions.md`, 2026-08-02 — frontier-only is a
non-goal).

## Editing discipline: no behavioral change without evidence

Skill text is process documentation, and edits follow the same
test-first rule as code (the superpowers `writing-skills` skill is the
reference). Concretely, an edit that intends to change agent behavior
requires, in order:

1. **A demonstrated failure or reviewed finding.** Either a baseline
   probe showing the unwanted behavior without the new wording, or a
   finding from a structured review (below). The control arm — the
   skill *without* the proposed wording, on a scenario built to tempt
   the failure — measures whether the wording binds; it does not veto
   it. A control that NEVER exhibits the failure means the guidance
   answers a problem nobody has, and it is not written. A control that
   avoids the failure UNRELIABLY is the case the rule exists for: one
   unprompted success is not reproduction. There the rule is written
   and the control's pass rate is recorded beside it
   (`docs/decisions.md`, 2026-08-02 — an unreliable control writes the
   rule).
2. **Probes of the new wording before it lands.** Fresh subagents
   simulate one assistant turn with the skill text embedded, on
   scenarios that tempt the failure. Check three things: the target
   behavior appears, prior good behavior did not regress, and the rule
   does not over-fire (e.g. the qualitative-claims rule must not reject
   qualitative *goals* — probes exist for both directions).
3. **Honest reporting.** Probe counts are small (often 1–3 per arm);
   results are reported as what they are — evidence that wording binds,
   not statistics. Low variance across reps is the signal that wording
   binds; divergent interpretations mean the form needs tightening
   before more words are added.

Probe hygiene: probe subagents inherit the host project's context, so
every probe prompt instructs them to disregard project-specific
instructions. Scenarios use neutral stacks (a web app, a Python
service) unrelated to any host project.

## The pre-release review (repeatable)

A release is gated on a multi-axis review. Each axis gets its OWN
fresh subagent: independence is the point, so one agent never runs two
axes, and no agent is told what another found. Every prompt carries
the same three constraints — disregard any host-project instructions
in context, modify nothing, and return FINDINGS rather than
replacement wording. A proposed patch from a reviewer is worse than
useless here: under the editing discipline above, a finding is only
step-1 evidence and any wording still needs its own probes.

Axes 1 to 4 are COLD: the agent is given the skill file alone and told
not to read the README, the tests, or anything else. Their value is
arriving without context. Axes 5 to 7 need the surrounding material
and are given exactly what they need and no more.

1. **Cold flaw review** — internal contradictions, loopholes an agent
   could comply through, unfalsifiable or uncheckable rules,
   underspecified mechanics, missing situations, dead text. Ranked by
   severity, each finding quoting the text and naming a concrete bad
   outcome.
2. **Language self-compliance** — the skill audited against its own
   Language section, which by its jurisdiction clause governs the
   skill itself. Idioms, undefined metaphors, qualitative claims doing
   closing work, vague wording where a quantity belongs, sentences
   that need a second reading. A rule the document visibly breaks is a
   weakened rule. This axis also reports what is exemplary, so a later
   revision does not damage it.
3. **Over-application** — for each rule, a realistic scenario where
   its trigger is satisfied but its behavior is wrong, rated by
   likelihood and damage. Distinct from axis 1 and worth its own
   agent: the prior-art move over-fired 0/3 on two successive
   fixtures, and nothing but a dedicated over-firing check would have
   caught it.
4. **Self-sufficiency** — does each rule still bind in a repository
   with no documents, no decision record, and no conventions? This is
   the standing risk below, asked rule by rule. Includes the second
   question of whether the skill assumes vocabulary the USER has not
   been given.
5. **Test suite review** — coverage of rules by fixtures, rubric items
   that test something other than what their scenario claims,
   scenarios that hand the assistant a conclusion it should have had
   to discover, fires/holds pairs where the holds arm is arguably a
   true positive, and places a strict judge fails a correct transcript.
   This axis has demonstrated value: the 0.4.x revision found two
   rubric bugs and one miscalibrated scenario, and each had already
   produced a misleading result.
6. **Document coherence** — `SKILL.md`, `README.md`, `docs/decisions.md`
   and this file checked against each other. Rules with no ledger
   entry, ledger entries the skill does not implement, stale paths and
   section names, README claims the skill no longer satisfies, and
   whether any document is doing another's job under the
   audience-separation rule.
7. **Literature mapping** — each mechanism mapped to published work
   with a verdict of supported, contradicted, refinable, or no
   evidence found, citing checkable sources and flagging unverified
   ones. Run it for mechanisms added since the last mapping, not the
   whole set. The README's literature section is the durable output,
   and a contradicted verdict is the most valuable result it can
   produce.

Behavioral questions that reading cannot answer are NOT a review axis:
they belong to the regression harness below, which supersedes the
ad-hoc pressure probes used before 0.3.0.

## The standing risk to edit against

The generic skill must stay self-sufficient. When editing, ask: does
this rule still bind in a repository with no docs, no ledger, and no
conventions? The extraction history that makes this the standing risk
is in `docs/decisions.md` (head: Origin, and the standing risk).

## The regression workflow (`skill-regression`)

`.claude/workflows/skill-regression.js` perpetuates the probe rounds
as a repeatable harness. It is meant to be launched by a supervisor
session (the model calls the Workflow tool; the user asks for it in
words — "run the skill regression"), not by hand:

- **Always invoke by `scriptPath`, never by name** — see the gotcha
  below: a name resolves the INSTALLED plugin's pinned copy, not this
  repo's. From a session inside this repo:
  `Workflow({scriptPath: '<abs>/.claude/workflows/skill-regression.js',
  args: {model: 'opus', mode: 'quick', repo: '<abs>'}})`. Pass
  `args.repo` as an absolute path from anywhere — workflow agents
  resolve relative paths from the SESSION's working directory, not
  from the script's location.
- `args`: `model` (tier under test, day-to-day `opus`), `mode`
  (`quick` ≈ 14 agents: 7 single-turn probes + judges, carrying the
  OVER-FIRING arms — a pre-landing probe already showed a rule fires,
  so what a post-edit run must catch is a rule firing where it should
  not; `full` adds the remaining probes, two conducted multi-turn
  scenarios, and the grounded real-project scenario (`real-project-sds`:
  the tested agent explores a vendored real codebase read-only, and the
  judge verifies its grounding claims against the tree); `survey` runs
  `full` across `args.tiers` — a CAPABILITY PROBE for tiers that are
  not supported, whose failures are not regressions and gate nothing;
  frontier version drift is covered by running `quick` or `full`
  against the new version), `judge`
  (fixed strong model for scoring, default `opus` — never let it
  follow the tested tier), `reps` (repetitions per scenario, default 1;
  use 3 for probe rounds — the run reports a per-scenario pass rate and
  flags split rates, which is the variance signal that a wording binds),
  `only` (run just these scenarios), and `skill` (path to the SKILL.md
  under test — how a CONTROL ARM is run: point it at a copy with the
  edit under test removed).
- Fixtures live in `tests/scenarios/<name>/` (`scenario.md`,
  `rubric.md`, multi-turn adds `turns.md`); `tests/conductor.md` is
  the conductor protocol for multi-turn scenarios. Probe agents read
  the LIVE `skills/designing-together/SKILL.md` unless `args.skill`
  overrides it, so the harness tests the current skill text by
  default.
- A red run's judge quotes name the failing rubric items; re-runs
  resume cheaply: `Workflow({scriptPath, resumeFromRunId})` replays
  unchanged agents from cache.

### Gotchas observed in practice (keep this list current)

- **`Workflow({name: 'skill-regression'})` runs the INSTALLED PLUGIN's
  copy, not this repo's.** The plugin ships `.claude/workflows/`, so a
  name-based invocation resolves the version in
  `plugins/cache/designing-together/<version>/` — pinned, and blind to
  every edit made here since that release. Observed 2026-08-02: a run
  launched by name executed the 0.3.0 script, silently ignoring
  `args.only` and `args.reps` and running the old scenario list; the
  persisted script was byte-identical to the plugin cache copy.
  Fixtures are unaffected — the agents read `tests/scenarios/` live
  from disk — which is what makes the mismatch hard to see. **After
  editing the script, always invoke with `scriptPath` pointing at
  `.claude/workflows/skill-regression.js` in this repo.**
- **A subagent's own children cannot route results back to it.** A
  research agent that spawned sub-agents could not reach its parent by
  name (`SendMessage` to `general-purpose` fails), so a completed
  child's report arrived only as a top-level task notification, twice,
  once compressed. Expect duplicate and out-of-order delivery, and do
  not assume a parent's summary contains its children's findings.
- **Never edit `SKILL.md` while a run is in flight.** Probe agents read
  the file when their turn starts, not when the workflow launches, so
  concurrent edits give different reps different skill text. Observed
  2026-08-02: one rep of a control run was judged against the
  four-column delta format while a sibling rep was judged against the
  three-column one, in the same run. Freeze a copy and pass
  `args.skill` at it whenever the working tree may move.
- **Grandchild notifications bubble to the launcher in real time.**
  The conductor's child (the tested assistant) emits a
  task-notification to the top-level session after EVERY turn, before
  the conductor's own result arrives. Do not mistake these for the
  conductor's transcript, do not act on them, and expect the same
  task-id to notify repeatedly.
- **SendMessage continuation is background-only.** A child spawned
  with `run_in_background: false` replies synchronously, but every
  SendMessage continuation resumes it in the background; the promised
  completion notification can arrive late. The conductor therefore
  polls the child's JSONL output file and extracts the last assistant
  text (protocol in `tests/conductor.md`).
- **Relayed messages arrive wrapped.** A SendMessage body reaches the
  child inside an agent-message envelope with trust caveats; keep the
  "The user replies:" framing INSIDE the body so the child reads it
  as the simulated user, not as a peer agent's instruction.
- **Judges explore unless forbidden.** One judge ran a relative `ls`
  from the session cwd and reported the rubric missing while three
  siblings read the same layout fine. Judge prompts must give the
  exact absolute path and say "a single Read call — do not explore".
- **Workflow scripts have no filesystem access.** Anything the script
  cannot embed must be read by the agents it spawns; that is why the
  fixtures are files and the prompts carry paths.
- **Mechanical transcript checks false-positive on table furniture.**
  A regex that harvests state tokens from delta tables also catches
  header cells ("state") and separators ("---"); filter them before
  reporting unknown states.
- **The conductor needs `agentType: 'general-purpose'`** — the default
  workflow subagent may lack the Agent/SendMessage tools it needs to
  spawn and continue its child.
- **A conductor that ends its turn waiting returns that as its
  result.** In one workflow run the conductor's entire returned
  "transcript" was "I'll wait for the background task's completion
  notification." — child notifications may not reach a
  workflow-spawned agent's context. The conductor protocol therefore
  forbids ending the turn to wait: all waiting happens inside a Bash
  polling loop over the child's output file.
- **On resume, `args` can arrive JSON-encoded as a string.** The first
  launch delivered args as an object; the `resumeFromRunId` relaunch
  delivered the same args as a quoted JSON string, silently breaking
  `args.repo` (paths fell back to the session cwd). The script parses
  defensively (`typeof args === 'string' ? JSON.parse(args) : args`);
  keep that guard.

## Releases

Committing is not releasing. A release is: bump `version` in
`.claude-plugin/plugin.json`, commit, push, then refresh local installs
with `claude plugin update designing-together@designing-together`.
Local commits without a push stay unpublished, which is the intended
state for work between releases.

### How the harness updates installs

Pushing without a version bump never reaches installs, so
documentation and harness changes can be pushed freely between
releases; the argument for why that holds is in `docs/decisions.md`
(head: Release mechanics), together with the open question about this
plugin's `"./"` marketplace source.

Operational details: Claude Code checks marketplaces and plugins for
updates in the background at session start (random delay up to about
10 minutes); a running session keeps its loaded versions and picks up
changes via `/reload-plugins` or at the next launch. Marketplace
clones refresh via `git pull` without credential helpers (on failure
Claude Code re-clones; `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1`
keeps the existing clone). `DISABLE_AUTOUPDATER=1` disables all
auto-updating; `FORCE_AUTOUPDATE_PLUGINS=1` re-enables plugin updates
under it.
