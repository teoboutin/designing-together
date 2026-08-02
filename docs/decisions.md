# designing-together — decisions

The argued record of this repository's decisions: why the skill is
shaped as it is, how it may be edited, how it is tested, and how it is
released. `CLAUDE.md` states the operational rules; when a rule needs
its justification, it points here instead of retelling the argument.
The README describes what the skill does for the people who install
it — a different audience, and outside this file's scope.

This repository keeps one ledger. Territory is separated by head
section, not by file.

## The ledger discipline

A write-once document describing a moving system decays; a head that
every decision rewrites cannot. This file has two parts: a
present-tense head that describes the current design as if it had
always been so, and a dated append-only ledger. When a decision lands,
the head is rewritten and the entry appended in the same change.
Losing arguments stay recorded with why they lost, and every
keep-or-change verdict carries named tripwires — the specific evidence
that would flip it.

An entry fills these slots: **Verdict**, **Mechanism** (the one
sentence naming what produces the problem), **Evidence at decision
time**, **Losing arguments and where the winner absorbs them**,
**Tripwires**, and **Also decided** where a session settled adjacent
points.

## The referencing rule

Point at a head for *what* and *how* — heads are current reality, so a
head reference stays true. Point at a dated ledger entry for *why* —
entries are append-only, so the reference cannot dangle. Never point
at a field report or a convergence spec: those files are deleted once
harvested.

## Model tier: frontier-only is a non-goal, not a limitation

The skill targets frontier-tier models and there is no plan to
simplify it for smaller ones. It is aimed at creative and innovative
work with thorough investigation of consequences, where weaker models
produce no useful output; their role in this workflow is as
implementation workers conducted by a frontier model, not as the
counterpart in the design discussion.

Two consequences bind edits. Rule budget is judged against frontier
attention only — "a smaller model would not follow this" is not an
argument for or against any wording. And `survey` mode in the
regression harness is a **capability probe** for tiers that are not
supported: it asks whether a non-target tier has become capable
enough to be worth reconsidering. Its failures are not regressions and
gate nothing.

## Evidence standard for skill edits

Skill text is process documentation and edits follow a test-first
rule: a demonstrated failure or reviewed finding first, probes of the
new wording before it lands, honest reporting of small probe counts.
The operational form of this is in `CLAUDE.md`.

The control arm — the skill *without* the proposed wording, on a
scenario built to tempt the failure — **measures whether the wording
binds; it does not veto the wording.** A control that never exhibits
the failure means the guidance answers a problem nobody has, and it is
not written. A control that avoids the failure unreliably is the case
the rule exists for: the purpose of a skill is behavior that
reproduces without the user asking for it each session, and one
unprompted success is not reproduction. There the rule is written and
the control's pass rate is recorded beside it.

## Field reports are ephemeral evidence

A field report records observations from a real session using the
skill. It lives in `docs/field-reports/`, is committed, and is deleted
from the tip of the repository once every one of its findings has been
resolved or rejected — kept in history, recoverable, and never
referenced from a durable document. The ledger entry that resolves a
finding carries enough of the evidence to stand without the report.

This is the same lifecycle the origin project gives specs and plans:
created as working artifacts, harvested into ledgers, deleted at
merge.

## Release mechanics

Committing is not releasing. A release is: bump `version` in
`.claude-plugin/plugin.json`, commit, push, then refresh local
installs. Local commits without a push stay unpublished, which is the
intended state for work between releases.

Two harness facts make that discipline mechanical rather than
conventional, and both were established before this ledger existed
(commits `9168df8`, `b1d8e5e`). Third-party marketplaces have
auto-update off by default, so installs move only on an explicit
`claude plugin update` unless the user enables auto-update for the
marketplace. And updates key on the version string, not on commits:
resolution runs `version` in `plugin.json` → `version` in the
marketplace entry → git commit SHA. Because this plugin pins a
version, pushed commits without a bump never reach installs even with
auto-update enabled — documentation and harness changes can be pushed
freely between releases. Omitting `version` would make every commit a
version; it stays pinned.

One question is open against this. The `/plugin` detail view
classifies this plugin as local because its marketplace entry uses the
relative source `"./"`, and states that local plugins cannot be
updated remotely. That classification is undocumented and misleading
for this repository's shape — the marketplace itself is git-hosted and
`claude plugin update` works through its clone. Whether background
auto-update propagates a version bump to a `"./"`-source plugin is
unverified; it is checked at the next release. If it does not
propagate, the fallback is changing the marketplace entry's source to
`{"source": "github", "repo": "teoboutin/designing-together"}`, at the
cost of a second clone per install.

## Origin, and the standing risk

The skill was extracted from a project-specific version that lived
inside a repository with strong surrounding rules — decision ledgers,
explicit merge-approval conventions. Those rules acted as invisible
scaffolding: behaviors the skill appeared to produce were partly
produced by its environment. The generic skill must stay
self-sufficient, which is why the Decision authority and
Threads-and-states sections exist in the form they do — their
guarantees stopped being ambient when the skill left that repository.

The standing test for any edit: does this rule still bind in a
repository with no documents, no ledger, and no conventions?

## Decisions ledger

### 2026-08-02 — the repository gets a decisions ledger

**Verdict: change.** A single `docs/decisions.md` in the two-part
shape becomes this repository's decision home; `CLAUDE.md` keeps the
operational rules and points here for justification.

**Mechanism**: `CLAUDE.md` was carrying two jobs — the operational
rules and the arguments behind them — and only the first job has a
size bound.

**Evidence at decision time**: a design session on the skill produced
two findings whose direct cause was the absence of a decision home —
the model-tier policy and the regression harness's survey scope had
both been decided in conversation and recorded nowhere, and were
re-derived from scratch. The skill's own loop step 1 instructs an
agent to find where the project records design intent; in this
repository the answer was "nowhere, read `CLAUDE.md` and the git log",
so the plugin failed its own first instruction. The shape is ported
from the origin project rather than designed here: head plus dated
ledger, the entry slots above, and the referencing rule, all in daily
use there.

**Losing arguments and where the winner absorbs them:**

- *"`CLAUDE.md` is already the decision home."* It is the operational
  home, and the two roles have different growth curves. The split
  absorbs the intent: `CLAUDE.md` keeps every rule an agent must
  follow and gains pointers instead of paragraphs.
- *"Multiple ledgers, as in the origin project."* Rejected on size:
  that project runs three doc families over dozens of systems. One
  file with head sections carries this repository's territory, and
  splitting is a later decision if the tripwire below fires.
- *"Set the ledger up after the skill fixes."* Rejected: the session
  had roughly twenty decided threads and no home, so the fixes would
  have recorded their rationale into commit messages and then had to
  move it. Landing the ledger first also lets the entry format be
  designed alongside the change to what the thread table serializes
  into.

**Tripwires** (any firing reopens this verdict): the file grows past
the point where a session's grounding read covers it, observable as
discussions citing the head but never an entry; `CLAUDE.md` grows a
justification paragraph that no entry covers; a session resorts to git
archaeology to recover a deleted field report's content; the head
contradicts a later entry, meaning the rewrite step stopped happening.

**Also decided:** `docs/field-reports/` moves under `docs/`; the
README and its literature section stay outside this file, on the
audience test the skill's own Language section uses.

### 2026-08-02 — frontier-only is a non-goal; survey mode is a capability probe

**Verdict: keep, stated explicitly.** The skill is not made accessible
to smaller models, and `survey` mode is documented as a capability
probe rather than a regression test.

**Mechanism**: an unstated non-goal gets re-argued every time it is
touched, and it had already leaked into an edit argument and into the
harness's default tier list.

**Evidence at decision time**: the tier assumption was used as a
supporting argument for the rule-budget criterion in a live design
session and had to be retracted. `.claude/workflows/skill-regression.js`
defaulted survey to `['opus', 'sonnet', 'haiku']`, and `CLAUDE.md`
described survey as the mode to run "on model version bumps", which
reads as a regression gate. The measured basis for the tier position
is the four-turn scripted comparison recorded in the README's Model
requirements section (August 2026): Haiku 4.5 reproduced the format
without the discipline — endorsed a weak proposal, invented states
outside the enum, dropped open threads between rounds.

**Losing arguments and where the winner absorbs them:**

- *"Rules should be written so weaker models can follow them."*
  Rejected as a design goal. The absorption is that the skill's
  workflow still uses weaker models — as implementation workers
  conducted by a frontier model, where the ledger and the spec carry
  the state they cannot.
- *"Survey mode tests frontier version drift."* Wrong reading,
  corrected: drift on the frontier is covered by running `quick` or
  `full` against the new version. Survey asks a different question
  about non-target tiers.

**Tripwires**: a survey run shows a non-target tier passing every
rubric item on the conducted scenario, which would make supporting
that tier a real question rather than a non-goal.

**Also decided:** the haiku arm is removed from the survey default —
the model has not been receiving updates, and the general movement of
providers toward frontier models makes the probe uninformative. The
opus arm stays beside sonnet, not as a gate but as the reference
transcript the sonnet arm is read against.

### 2026-08-02 — an unreliable control writes the rule

**Verdict: change.** The editing discipline's control test is
qualified: it vetoes guidance only for failures never observed, and
otherwise measures whether new wording binds.

**Mechanism**: the original phrasing tested whether a failure *can* be
avoided, when the property a skill must deliver is whether the correct
behavior *reproduces* without being asked for.

**Evidence at decision time**: a field session recorded three
behaviors the assistant produced with no rule requiring them —
applying the material-findings protocol by analogy to an endorsed but
unclosed thread, self-verifying claims it was comfortable with, and
opening a thread against a recorded verdict's prescription. All three
were attributed in the report to judgement rather than to text, and
the session that surfaced them was not adversarial. Under the
unqualified rule those three edits would not have been written.

**Losing arguments and where the winner absorbs them:**

- *"The control passed, so the rule is unevidenced."* Absorbed rather
  than discarded: the control still runs, and its pass rate is
  recorded beside the rule. What it no longer does is veto.
- *"A frontier model getting it right once is enough."* Rejected: the
  behaviors appeared in a single favorable session, and for two of the
  eight findings the report records that the behavior appeared only
  after the user asked for it — the exact failure a skill exists to
  remove.

**Tripwires**: a rule written under this qualification whose control
arm passes every rep across several revisions, which would mean the
wording is inert and the qualification is licensing dead text.

### 2026-08-02 — field reports are ephemeral evidence

**Verdict: change.** Field reports live in `docs/field-reports/`, are
committed, and are deleted from the tip once all their findings are
resolved or rejected.

**Mechanism**: a report is evidence for decisions, not a decision
record; kept at the tip after resolution it becomes a second,
unmaintained account of what the project decided.

**Evidence at decision time**: the same lifecycle is in daily use for
specs and plans in the origin project, where the argued alternative —
keeping a growing corpus of dated write-once documents — produced 95
files and roughly 20,000 lines, half without a status line, before it
was retired.

**Losing arguments and where the winner absorbs them:**

- *"Deleting the report loses the observations."* History keeps every
  deleted file recoverable, and the resolving entry is required to
  carry enough evidence to stand alone. The tripwire below watches
  exactly this.

**Tripwires**: a session needs git history to answer a question about
a resolved finding, meaning the resolving entry carried too little.
