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

## Editing discipline: no behavioral change without evidence

Skill text is process documentation, and edits follow the same
test-first rule as code (the superpowers `writing-skills` skill is the
reference). Concretely, an edit that intends to change agent behavior
requires, in order:

1. **A demonstrated failure or reviewed finding.** Either a baseline
   probe showing the unwanted behavior without the new wording, or a
   finding from a structured review (below). If a no-guidance control
   does not exhibit the failure, the guidance is not written.
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

## Origin, and the standing risk to edit against

The skill was extracted from a project-specific version that lived
inside a repository with strong surrounding rules (decision ledgers,
explicit merge-approval conventions). Those rules acted as invisible
scaffolding: behaviors the skill appeared to produce were partly
produced by the environment. The generic skill must stay
self-sufficient — the Decision authority and Threads-and-states
sections exist precisely because their guarantees stopped being
ambient when the skill left that repository. When editing, ask: does
this rule still bind in a repository with no docs, no ledger, and no
conventions?

## Releases

Committing is not releasing. A release is: bump `version` in
`.claude-plugin/plugin.json`, commit, push, then refresh local installs
with `claude plugin update designing-together@designing-together`.
Local commits without a push stay unpublished, which is the intended
state for work between releases.
