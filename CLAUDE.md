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

## The review process (repeatable)

The 0.3.0 revision came from three independent passes, worth repeating
for any major revision:

1. **Cold flaw review**: a subagent with no project context reviews the
   skill text alone, hunting self-compliance violations (the skill must
   obey its own Language section — by that section's own jurisdiction
   test, this repo's prose is working prose), loopholes, harmful
   over-application, internal contradictions, unfalsifiable rules, and
   missing pieces.
2. **Literature mapping**: a research subagent maps each mechanism to
   published work with a verdict per mechanism — supported,
   contradicted, refinable, or no evidence — citing checkable sources
   and flagging unverified ones. The README's literature section is the
   durable output.
3. **Pressure probes**: scenarios for behaviors reading cannot judge —
   what the skill makes an agent do when the user overrides the mode,
   when convergence is tempting but unearned, on an ordinary opening
   turn.

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

- Invocation from a session inside this repo:
  `Workflow({name: 'skill-regression', args: {model: 'opus', mode: 'quick'}})`.
  From a session elsewhere, pass `scriptPath` (absolute path to the
  .js) and `args.repo` (absolute path of this repo) — workflow agents
  resolve relative paths from the SESSION's working directory, not
  from the script's location.
- `args`: `model` (tier under test, day-to-day `opus`), `mode`
  (`quick` ≈ 8 agents / ~300k subagent tokens: 4 single-turn probes +
  judges; `full` adds the remaining probes, the conducted multi-turn
  scenario, and the grounded real-project scenario (`real-project-sds`:
  the tested agent explores a vendored real codebase read-only, and the
  judge verifies its grounding claims against the tree); `survey` runs
  `full` across `args.tiers` — a CAPABILITY PROBE for tiers that are
  not supported, whose failures are not regressions and gate nothing;
  frontier version drift is covered by running `quick` or `full`
  against the new version), `judge`
  (fixed strong model for scoring, default `opus` — never let it
  follow the tested tier).
- Fixtures live in `tests/scenarios/<name>/` (`scenario.md`,
  `rubric.md`, multi-turn adds `turns.md`); `tests/conductor.md` is
  the conductor protocol for multi-turn scenarios. Probe agents read
  the LIVE `skills/designing-together/SKILL.md`, so the harness always
  tests the current skill text.
- A red run's judge quotes name the failing rubric items; re-runs
  resume cheaply: `Workflow({scriptPath, resumeFromRunId})` replays
  unchanged agents from cache.

### Gotchas observed in practice (keep this list current)

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
