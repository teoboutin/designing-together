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
  `description` states triggering conditions and, at most, a capability
  gate — never the workflow (a description that summarizes the process
  becomes a shortcut agents follow instead of reading the skill). The
  gate is the one non-triggering sentence allowed, because a model
  below the bar produces the format without the discipline and the
  description is the only place an installer sees that before running
  it.
- `docs/decisions.md` — the decision record: per-territory sections,
  each a present-tense head followed by the dated entries that argued
  it.
- `docs/open-items.md` — the repository's open state: live tripwires,
  parked predictions, the literature watch list. Current reality only,
  by presence.
- `docs/field-reports/` — observations from real sessions using the
  skill; evidence, not decisions.
- `docs/reviews/` — consolidated pre-release review findings; the same
  kind of ephemeral evidence, with the same lifecycle.
- `tests/scenarios/` and `tests/conductor.md` — the regression
  fixtures; `.claude/workflows/skill-regression.js` — the harness.

**Where a decision lands.** Every decision about this repository goes
in `docs/decisions.md`, under the section that owns the territory: the
head is rewritten as if the design had always been so, and the entry
is appended beneath it, in the same change as the work. An entry is a
`**Decided <date>**` paragraph of two to five lines — what changed and
the discriminating fact — then one `*Rejected: <alternative>* — <why
it lost>` bullet per losing alternative. Nothing else: the head above
states the verdict and the mechanism in the present tense, and the
evidence narrative stays in the commit. Tripwires are not recorded
there; they are open state and go in `docs/open-items.md`, which an
entry leaves in the change that fires or voids it. This file states
the operational rules and points at a section when a rule needs its
justification — it does not retell the argument. Point at a head for
*what* and *how*, at a section's dated entry for *why*, never at a
field report or a convergence spec.

**Field reports and review findings are ephemeral.** A report is
committed under `docs/field-reports/`, a consolidated review under
`docs/reviews/`, and each is deleted from the tip once every one of
its findings is resolved or rejected — kept in history, recoverable,
never referenced from a durable document. The *Rejected* bullet that
resolves a finding must state what the finding said; a finding
identifier may be cited for traceability but never as the carrier of
the argument. This is the lifecycle the origin project
gives specs and plans.

**Target tier is a non-goal, not a limitation.** The skill is for
frontier-tier models and is not simplified for smaller ones; their
role is as implementation workers conducted by a frontier model. "A
smaller model would not follow this" argues neither for nor against
any wording (`docs/decisions.md`, *Model tier: frontier-only is a
non-goal*, 2026-08-02).

## Editing discipline: no behavioral change without evidence

Skill text is process documentation. Three questions about an edit get
three different answers, and the harness answers only the middle one
(`docs/decisions.md`, *The regression harness*, 2026-08-03).

0. **Scope — is the problem ours?** The README's *What it expects of
   you* states the assumptions about user behavior and project shape
   the skill is built on. A finding describing a behavior outside that
   set is not a gap and no rule is written for it. The set scopes user
   behavior ONLY: a finding that two of the skill's own rules leave no
   move satisfying both is always in scope (`docs/decisions.md`, *The
   expectation set bounds the skill’s scope*, 2026-08-03). Check this
   before necessity; a provable gap that is not
   ours is still not written.
1. **Necessity — is there a problem worth text?** Real use of the
   skill, or a review finding whose defect is PROVABLE BY READING: a
   contradiction, a rule with no compliant move, a factual error, a
   trigger that cannot fire or cannot fail. A review finding that
   predicts a behavior — this rule will over-fire, this wording will
   be misread — is not a demonstrated problem: park it with a tripwire
   naming what a real session would show, which the admission test
   below defines. No synthetic fixture ever originates an edit.

   For an ADDITION — a new instruction, as opposed to repairing a
   contradiction, a broken trigger or a factual error — real use is the
   only originating route, and it admits on two conditions. (1) An
   observation in one of two forms: a session produced the behavior
   unprompted, which admits the GAP and never the specific behavior; or
   the user asked for it mid-session, which is evidence about that
   behavior directly. (2) The user endorses the result AND names what
   the session would have lacked without it — the endorsement is their
   weighing, the named lack is what the dated entry can still be read
   for once the field report is deleted. A "should have" nobody
   exhibited meets neither form: it is a prediction, so it parks rather
   than lands, and the cheap route is to ask for it next session
   (`docs/decisions.md`, *Evidence standard for skill edits*,
   2026-08-03).

   Then state in ONE SENTENCE the mechanism that produced the need. If
   it names a structural defect, the edit is the structural fix and not
   the behavior observed. Admission settles necessity only: the
   weighing below and step 3's control arm still run, and a bare
   transcription backed by a single session is parked with recurrence
   as its tripwire.

   Then weigh which KIND of gap it is. A capability gap — a move the
   assistant does not have — is worth text. A conformance gap — a move
   it has and might not make — is worth text only where the default is
   systematically wrong, which is what step 3's control arm measures.
   Prefer the capability form when both are available: a tool and the
   judgement to use it, not a script for one exchange
   (`docs/decisions.md`, *Gaplessness is not the goal*, 2026-08-03).
2. **Verification — does the wording work, and did it break a
   neighbour?** Run the harness `only`-filtered on the fixtures that
   bear on the edit, and once in `full` before a release. Check three
   things: the target behavior appears, prior good behavior did not
   regress, and the rule does not over-fire (the qualitative-claims
   rule must not reject qualitative *goals*, for instance). Treat the
   result as a canary: a red is a reason to look, a green is not a
   licence.
3. **Veto — should this edit exist?** Read the control arm's
   TRANSCRIPTS, not its pass rate. A control that avoids the failure
   unreliably is the case the rule exists for; one unprompted success
   is not reproduction, and the pass rate is recorded beside the rule.
   A control that never exhibits the failure is a reason to re-ask
   whether usage ever showed the problem — it does not remove the rule
   by itself.

**A fixture change lands in the same commit as the skill change it
tests.** Same discipline as the record's entry-with-the-work rule, for
the same reason: a rubric that still encodes the previous rule greens
a transcript the skill now calls broken, and nothing detects it until
a review reads both. Observed 2026-08-03 — the parked-thread re-entry
requirement landed while `override` and `notification-multiturn` kept
scoring the old rule, and a full run passed them 3/3 meanwhile
(`docs/decisions.md`, *Criteria are not threads*, 2026-08-03).

**Honest reporting.** Probe counts are small (often 1–3 per arm);
results are reported as what they are — weak evidence that wording
binds, not statistics. Divergent interpretations across reps mean the
form needs tightening before more words are added.

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
useless here: under the editing discipline above, a finding establishes
necessity only when its defect is provable by reading, and a finding
that predicts a behavior gets parked with a tripwire rather than
patched.

Axes 1 to 4 are COLD: the agent is given the skill file alone and told
not to read the README, the tests, or anything else. Their value is
arriving without context. Axes 5 to 9 need the surrounding material
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
   and this file checked against each other. Rules with no dated
   entry, entries the skill does not implement, stale paths and
   section names, README claims the skill no longer satisfies, and
   whether any document is doing another's job under the
   audience-separation rule.
7. **Literature mapping** — each mechanism mapped to published work
   with a verdict of supported, contradicted, refinable, or no
   evidence found, citing checkable sources and flagging unverified
   ones. Run it for mechanisms added since the last mapping, not the
   whole set. The README's literature section is the durable output.
   This axis is NON-BINDING and gates nothing: the skill is designed
   from practice and mapped afterwards, so a contradicted verdict goes
   on a watch list rather than opening an edit (`docs/decisions.md`,
   *The regression harness*, 2026-08-03).
8. **Scope and conciseness** — given the skill and the README's *What
   it expects of you*, find text that does NO WORK: a rule another
   rule already covers, a sentence restating the one before it, an
   example adding nothing its rule does not, a clause handling a user
   behavior the expectation set excludes. **This axis hunts for
   inert text, never for length.** Length is explicitly not a
   criterion here (`docs/decisions.md`, *Evidence standard for skill
   edits*, 2026-08-02), and a size budget arriving through this axis
   is the failure to guard against. Every finding must name what would
   change behaviorally if the text were deleted; "nothing" is the
   finding, and anything else is not one. Findings that propose
   cutting the rules implementing *Structure the flow, not the
   content* are rejected on sight — that head section is what the axis
   is measured against, not material for it.
9. **Revision interaction** — given the diff of the revision under
   review, not the whole file: do any two edits in it interact badly?
   Rules landed one at a time are argued one at a time, and their
   combined effect is nobody's job. Report pairs where one edit makes
   another unreachable, redundant, contradictory, or newly urgent.
   This axis has demonstrated value: in the 2026-08-03 revision the
   grant-boundary edit routed more findings into a default that a
   later edit had to repair, and the two were connected by hand rather
   than by process.

Behavioral questions that reading cannot answer are NOT a review axis:
they belong to the regression harness below, which supersedes the
ad-hoc pressure probes used before 0.3.0.

## The standing risk to edit against

The generic skill must stay self-sufficient. When editing, ask: does
this rule still bind in a repository with no docs, no decision record,
and no
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
  (`quick`: 7 single-turn probes + judges, carrying the
  OVER-FIRING arms — a pre-landing probe already showed a rule fires,
  so what a post-edit run must catch is a rule firing where it should
  not. Quick carries NO fires arm for material findings, withdrawal,
  consolidation or the state enum: an edit breaking one of those passes
  quick green, so a quick green says nothing about collateral damage to
  them. `full` adds the remaining probes, two conducted multi-turn
  scenarios, and the grounded real-project scenario (`real-project-sds`:
  the tested agent explores a vendored real codebase read-only, and the
  judge verifies its grounding claims against the tree); `survey` runs
  `full` across `args.tiers` — a CAPABILITY PROBE for tiers that are
  not supported, whose failures are not regressions and gate nothing;
  frontier version drift is covered by running `quick` or `full`
  against the new version), `judge`
  (fixed strong model for scoring, default `opus` — never let it
  follow the tested tier), `reps` (repetitions per scenario, default 3
  — the run reports a per-scenario pass rate and flags split rates,
  which is the variance signal that a wording binds; pass 1 explicitly
  for a cheap smoke run, knowing a single rep is known to flap),
  `only` (run just these scenarios), and `skill` (path to the SKILL.md
  under test — how a CONTROL ARM is run: point it at a copy with the
  edit under test removed).
**Cost, and not stacking it.** Measured 2026-08-03: a `full` run at
`reps: 3` is 114 agents, roughly 3.9M subagent tokens, and about 23
minutes of wall clock. The harness caps its own in-flight agents at
`min(16, cores - 2)`, but that cap is PER FAN-OUT — a review's
subagents launched alongside a run do not share it, and the machine
sees the sum. Run the harness alone: never concurrently with the
pre-release review axes, and never two runs at once. During editing
this is cheap anyway, because the discipline already calls for
`only`-filtered runs of a few scenarios; the unfiltered `full` run
belongs at the end, by itself.

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

- **`Workflow({name: 'skill-regression'})` may run the INSTALLED
  PLUGIN's copy instead of this repo's, and which one it picked is not
  visible from the launch.** The plugin ships `.claude/workflows/`, so
  the name is ambiguous between this repo and
  `plugins/cache/designing-together/<version>/`, which is pinned and
  blind to every edit made here since that release. Observed
  2026-08-02: a name-launched run executed the 0.3.0 script, silently
  ignoring `args.only` and `args.reps` and running the old scenario
  list. Observed 2026-08-04, with the two copies provably different: a
  name-launched run executed THIS repo's copy. The resolution rule is
  therefore unknown and must not be relied on. Fixtures are unaffected
  either way — the agents read `tests/scenarios/` live from disk —
  which is what makes the mismatch hard to see. **Always invoke with
  `scriptPath` pointing at `.claude/workflows/skill-regression.js` in
  this repo**; if a run was launched by name, `diff` the persisted
  script against the repo copy before believing its result.
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
- **A background run does not survive the session that launched it.**
  Observed 2026-08-03: a `full` run filtered to five scenarios was
  still executing when the session ended, and the next session found
  no completion record — a stop through the UI or `TaskStop` leaves
  the same trace, so the two are indistinguishable after the fact.
  Relaunch with `Workflow({scriptPath, resumeFromRunId})` and pass
  `args` again; completed agents replay from cache. Before resuming,
  check whether `SKILL.md` or any rubric moved since the launch: if it
  did, cached reps were judged against different text than the fresh
  ones, which is the split-text trap above arriving by a different
  route.
- **On resume, `args` can arrive JSON-encoded as a string.** The first
  launch delivered args as an object; the `resumeFromRunId` relaunch
  delivered the same args as a quoted JSON string, silently breaking
  `args.repo` (paths fell back to the session cwd). The script parses
  defensively (`typeof args === 'string' ? JSON.parse(args) : args`);
  keep that guard.

## Releases

**Commit as work completes, without being asked.** A change is
committed as soon as it stands on its own — the work together with its
decision entry and its fixtures — rather than batched, or held until
the user requests it. A commit here publishes nothing (see below), so
an unnecessary commit costs nothing and a missing one costs the argued
history of a change: the reasoning is in the conversation, and the
conversation does not survive. Separate commits by decision, not by
file. An assistant's general default is to commit only on request;
this rule overrides it for this repository (`docs/decisions.md`,
*Release mechanics*, 2026-08-03).

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
