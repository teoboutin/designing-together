# designing-together — decisions

The argued record of this repository's decisions: why the skill is
shaped as it is, how it may be edited, how it is tested, and how it is
released. `CLAUDE.md` states the operational rules; when a rule needs
its justification, it points here instead of retelling the argument.
The README describes what the skill does for the people who install
it — a different audience, and outside this file's scope.

This repository keeps one decision record. Territory is separated by head
section, not by file.

## How the decision record is kept

A write-once document describing a moving system decays; a head that
every decision rewrites cannot. This file has two parts: a
present-tense head that describes the current design as if it had
always been so, and a dated append-only series of entries. When a
decision lands,
the head is rewritten and the entry appended in the same change.
Losing arguments stay recorded with why they lost, and every
keep-or-change verdict carries named tripwires — the specific evidence
that would flip it.

An entry fills these slots where they apply: **Verdict**, **Mechanism**
(the one sentence naming what produces the problem), **Evidence at
decision time**, **Losing arguments and where the winner absorbs
them**, **Tripwires**, and **Also decided** where a session settled
adjacent points. Verdict, Mechanism and Evidence are always present.
An entry that defeated no alternative has no losing arguments to
record, and saying so is better than inventing one.

## The referencing rule

Point at a head for *what* and *how* — heads are current reality, so a
head reference stays true. Point at a dated entry for *why* —
entries are append-only, so the reference cannot dangle. Never point
at an ephemeral document: field reports, convergence specs and review
findings are all deleted once harvested, so a reference to one dangles
by design.

Most of the skill predates this record, and no entry argues it. The
referencing rule therefore cannot be followed for the loop's steps,
the state enum, the premortem, the record step, or *When NOT to use*.
This is stated so it is not rediscovered as a finding every review;
sections are back-filled when a decision touches them, not on a
schedule.

## Structure the flow, not the content

This is why the skill exists, and it constrains every edit made to it.

The skill structures HOW a discussion is conducted: proposals are
argued, threads carry states, closure waits for the user's word. It
does not structure WHAT may be proposed. The proposal space is the
participants' to fill.

The failure it was built against is the solution quota. A discussion
mode that asks for two or three options gets two or three options, and
where only one shape realistically applies, the second and third are
fabricated to fill the count. A fabricated alternative is worse than
none: it makes a real proposal appear to have won a contest that never
happened, and it spends the round that could have tested the real
proposal. This is the concrete difference between this skill and a
narrowing elicitation mode such as `superpowers:brainstorming`, and
the comparison is what led to the skill being written.

The rules that implement it: "never pad with alternatives to reach a
count"; the stop signal on padding one real approach with alternatives
added only to be rejected; and the nearest-rival test, which lets "no
rival worth naming" stand as a claim to be tested rather than a gap to
be filled.

An edit that specifies what must be proposed, rather than how a
proposal is argued and tracked, works against the reason the skill was
written. That is the test to apply.

## No delegation grant

The user cannot hand a decision to the assistant. "I trust your
judgement here" closes the thread `approved` like any other word, and
every finding that arrives afterwards returns through the
material-findings protocol — including the hold on work that cannot be
undone.

The skill carries no vocabulary for delegation, and the absence is
deliberate. A state that suspends the material-findings protocol
inside a grant suspends it inside a boundary neither party can be sure
of: a grant naming no constraints has no boundary at all, and an
assistant can read an ordinary message as a grant. What follows is
irreversible work performed without the owner's word, which is the one
outcome that protocol exists to prevent. Naming the practice at all
teaches it, so the vocabulary goes with the state.

Recording who weighed a decision is the acknowledged cost. A closure
the owner made on a quick read is recorded `approved` and reads the
same as one they argued through.

## Gaplessness is not the goal

No wording makes a methodology self-enforcing. A rule set edited toward
leaving no gap grows one rule per observed interaction, and each new
rule creates fresh surface against the rules already there — measured
2026-08-03 at ten interaction defects across thirty-four edits in one
revision. Enumerating interactions does not terminate.

So a gap is weighed by what filling it would add, and there are two
kinds.

A **capability gap** is a move the assistant does not have: a way to
investigate, to discriminate between positions, to record something
the next session needs. Filling one adds something that was not
available before. It is worth text.

A **conformance gap** is a move the assistant has and might not make.
Filling one constrains an interaction to raise the rate at which the
skill's effect reproduces. This is worth text only where the default
behavior is systematically wrong rather than occasionally absent —
which is exactly what the control arm measures, and why an unreliable
control writes the rule while a clean one does not. The
counter-sycophancy rules are conformance rules that earn their place
on that evidence. A rule enumerating what to say in one particular
exchange usually does not.

When both readings are available, prefer the capability form: give the
assistant a tool and the judgement to use it, rather than a script for
one interaction.

## Model tier: frontier-only is a non-goal, not a limitation

The skill targets frontier-tier models and there is no plan to
simplify it for smaller ones. It is aimed at creative and innovative
work with thorough investigation of consequences, where weaker models
produce no useful output; their role in this workflow is as
implementation workers conducted by a frontier model, not as the
counterpart in the design discussion.

Two consequences bind edits. "A smaller model would not follow this"
is not an argument for or against any wording, and skill text is not
kept short on its account — see the entry below on why length is not
the binding constraint. And `survey` mode in the
regression harness is a **capability probe** for tiers that are not
supported: it asks whether a non-target tier has become capable
enough to be worth reconsidering. Its failures are not regressions and
gate nothing.

## Evidence standard for skill edits

Skill text is process documentation. Three different questions about an
edit get three different answers, and conflating them is what made the
regression harness carry more weight than it can hold. The operational
form is in `CLAUDE.md`.

**Necessity — is there a problem worth writing text for?** Real use of
the skill decides this. No synthetic fixture originates an edit. A
review finding originates one only when the defect is provable by
reading the text: a contradiction, a rule with no compliant move, a
factual error, a trigger that cannot fire or cannot fail. A review
finding that PREDICTS a behavior — this rule will over-fire, this
wording will be misread — is not yet a demonstrated problem. It is
parked with a tripwire naming what a real session would show.

**What real use has to show, before an instruction is ADDED.** Real
use is the only route that originates new instructions, and it would
otherwise be the one evidence type the standard leaves undefined. It
admits an addition on two conditions. Repairs — a contradiction, a
broken trigger, a factual error — keep the provable-by-reading route
and are not governed by this test.

*An observation, in one of two forms.* Either a session using the
skill produced the behavior unprompted, under no rule requiring it; or
the user asked for it mid-session. The forms are not equal evidence.
An unprompted behavior shows the assistant already HAD the move and
the skill was silent where the move was needed: it admits the gap and
never the specific behavior, because another session under the same
silence invents a different answer. A behavior the user had to ask for
shows the default did not produce it, which is evidence about that
behavior directly.

*The user's endorsement, with a named lack.* The user judges the
session's result improved AND names what it would have lacked without
the behavior: a failure prevented, a confusion removed, an output that
would not otherwise exist. The judgement is the owner's weighing and
is not falsifiable. The named lack is what survives into the dated
entry after the field report carrying it is deleted.

A behavior nobody exhibited meets neither form. A "should have done X"
noticed while reading a session, where no session did X and nobody
asked for it, is a prediction about behavior — the same object a
review finding produces, admitted on the same terms, which is to say
parked. This test is also what a parked prediction's tripwire names: a
park fires when a session produces one of the two observation forms
with the endorsement and the named lack.

**An admitted observation does not determine the edit.** Before an
addition is written, one sentence states the mechanism that produced
the need for the observed behavior. Where that mechanism names a
structural defect, the edit is the structural fix and the observed
behavior is a consequence of it, not the text to write. This is the
keep-or-change compression move turned on the skill's own maintenance,
and it is obligatory rather than available: the criteria observation
supported both a display rule and a change to the state enum, the
display rule landed alone, and the structural defect left behind was
found by two independent review axes a revision later.

Admission settles necessity and nothing else. The
capability-versus-conformance weighing (Gaplessness is not the goal)
and the control arm below both still run. Where the mechanism
statement names no structural defect and the proposal is a bare
transcription of one session's behavior, one instance is weak: the
observation is parked with recurrence as its tripwire rather than
written.

**Verification — does the new wording produce the behavior, and does
it damage something adjacent?** The regression harness answers this,
as a canary and not as a gate: `only`-filtered during editing, once in
`full` before a release.

**Veto — should this edit exist at all?** Nothing mechanical answers
this. The control arm — the skill *without* the proposed wording, on a
scenario built to tempt the failure — produces transcripts to read,
not a pass rate that decides. Its useful output has always been prose:
the rejected endorsement trigger was defeated by what its transcripts
showed, not by its ratio. A control that avoids the failure
unreliably is the case a rule exists for, and one unprompted success
is not reproduction; but a control that never exhibits the failure no
longer vetoes on its own, because a fixture failing to reproduce a
problem is weak evidence that the problem is not real.

The harness's construct validity is low, and stating it plainly is
part of the standard: a single-turn synthetic scenario is a weak proxy
for a design discussion, three of the skill's rules cannot be tested
by it at all, and its own defects went unnoticed through an entire
revision that it scored.

**Published literature is not a fourth source, and answers none of the
three questions.** The skill is designed from practice and mapped
against published work afterwards; the mapping relates the skill to
existing work and does not govern it. A literature finding that
CONTRADICTS a mechanism does not warrant a change to the skill. At
most it goes on a watch list, where real use decides whether the
contradiction shows up as a problem. Key findings are reported in the
README's literature section, which is the mapping's durable output.
A mechanism whose stated justification the literature refutes is
therefore not automatically edited — but the justification may still
fail the skill's own Language rule on its own terms, which is a
defect provable by reading, and that route is unaffected.

## The expectation set bounds the skill's scope

The skill is scoped to a way of working, stated in the README's *What
it expects of you*: the assumptions about user behavior and project
shape that the machinery is built on, each naming what degrades when
it does not hold. That section is the scope test for every proposed
edit. A finding describing a user behavior outside the set is not a
gap, and no rule is written for it.

The set scopes user behavior only. A finding that two of the skill's
own rules leave no move satisfying both is always in scope, however
the discussion was being conducted — otherwise the set becomes a way
to dismiss the defects that matter most.

The set lives in the README alone, because its audience is the person
installing the skill. `CLAUDE.md` points at it rather than restating
it: two documents holding the same list is how they come to disagree.

## Field reports and review findings are ephemeral evidence

A field report records observations from a real session using the
skill. It lives in `docs/field-reports/`, is committed, and is deleted
from the tip of the repository once every one of its findings has been
resolved or rejected — kept in history, recoverable, and never
referenced from a durable document. The entry that resolves a
finding carries enough of the evidence to stand without the report.

A consolidated pre-release review is the same kind of document, under
`docs/reviews/`, with the same lifecycle. It is evidence for decisions
and not a record of them, so it is deleted once every finding is
resolved or rejected. An entry may cite a review's finding identifier
for traceability, but never as the carrier of the argument: after the
deletion the identifier is a label in history, so the entry has to
state what the finding said.

This is the same lifecycle the origin project gives specs and plans:
created as working artifacts, harvested into the record, deleted at
merge.

## Release mechanics

Committing is not releasing. A release is: bump `version` in
`.claude-plugin/plugin.json`, commit, push, then refresh local
installs. Local commits without a push stay unpublished, which is the
intended state for work between releases.

Two harness facts make that discipline mechanical rather than
conventional, and both were established before this record existed
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
unverified; it is checked at the next release.

Two facts about the fallback are established (research pass,
2026-08-02, against the plugin-marketplace and plugins reference
documentation). A `github` source object takes `repo`, `ref` and `sha`
only, so it cannot name a subdirectory — but `git-subdir` can:
`{"source": "git-subdir", "url": "…", "path": "…"}` clones sparsely,
and its `url` accepts a GitHub shorthand. So escaping the `"./"`
classification and shipping only a subdirectory are compatible, not
alternatives. And there is no exclude mechanism anywhere — no
`.claudeignore`, no `files` or `exclude` field, and the manifest's
path keys govern what is LOADED, not what is copied into the install
cache — so moving files is the only way to trim what ships. A relative
source does not resolve when a marketplace is added by direct URL to
`marketplace.json`; git, GitHub and local adds are unaffected.

## Origin, and the standing risk

The skill was extracted from a project-specific version that lived
inside a repository with strong surrounding rules — decision records,
explicit merge-approval conventions. Those rules acted as invisible
scaffolding: behaviors the skill appeared to produce were partly
produced by its environment. The generic skill must stay
self-sufficient, which is why the Decision authority and
Threads-and-states sections exist in the form they do — their
guarantees stopped being ambient when the skill left that repository.

The standing test for any edit: does this rule still bind in a
repository with no documents, no decision record, and no conventions?

## Dated entries

### 2026-08-03 — `delegated` is deleted, with its grant and its vocabulary

**Verdict: change.** The `delegated` state, the grant mechanics, and
every mention of delegation leave the skill. This reverses the keep
verdict recorded earlier the same day; that entry stands unedited and
this one supersedes it.

**Mechanism**: a state that suspends the material-findings protocol
inside a grant suspends it inside a boundary neither party can be sure
of, and the suspension reaches work that cannot be undone.

**Evidence at decision time.** The defect is provable by reading, and
was found by two review axes independently. The irreversibility hold
lives only inside the material-findings bullet — "do the reversible
part and hold that part until the word comes" — and the grant routed
every in-grant finding away from that bullet, naming two escapes, a
defeated constraint and an infeasibility. Neither covers a correction
whose own action is irreversible. So: a grant over a storage layout,
a mid-implementation finding that the layout is wrong, a fix that
migrates written rows — constraints intact, nothing infeasible, and
the migration runs with no word from the owner.

Four further contradictions, each provable by reading: only an
`approved` thread renders a criterion `met`, so a delegated thread
could never satisfy the criteria its own grant created; the grant
quoted and banned the closing form ("absent a word from you, X ships")
that *Who moves what* prescribes; loop step 8 named no destination for
`delegated`, though the state's whole stated rationale was that the
record keeps it; and the state was defined as holding "under named
constraints" while the boundary rule contemplated grants naming none —
which is how the originating session actually went, three decisions
delegated with "follow your judgement".

The owner's use evidence decided the direction. Regular use of 0.3.0,
which has no such state, never produced the need for one. The single
session that did produce it is re-read by the owner as an approval of
a shape they could not name, given under overload from parallel
prior-art reports arriving separately — and the consolidation rule
that landed in the same revision ("evidence gathered by several
parallel investigations is reported as ONE round") addresses that
overload directly. Two rules were written for one mechanism and
nothing connected them.

**Losing arguments and where the winner absorbs them:**

- *`grant-note`: drop the state but keep the distinction, recording a
  grant as `approved` with a note that judgement was handed over.*
  This preserved record fidelity at one sentence and had no
  behavioral surface, since notes carry no state and convergence
  ignores them. It lost to the owner's ruling that the skill should
  not name delegation as a supported move at all: a note still
  teaches the practice, and an assistant that reads such a note may
  infer a licence. That last step is a prediction rather than a
  provable defect, and is recorded as such. What the winner absorbs:
  record fidelity is conceded as the cost of removal, named here so
  the loss is not discovered later as a surprise.
- *Delegation to AI agents is unsound in the published work.* Fügener
  et al. 2022 found human-to-AI delegation produced no benefit.
  Recorded as a losing argument once already, on the standard that
  published work does not open an edit. Re-raised here and rejected
  again on the same standard.
- *A weaker model could invent a grant it was never given.* Rejected
  on the standard that "a smaller model would not follow this" argues
  neither for nor against any wording (2026-08-02, frontier-only is a
  non-goal).

The last two were raised by the owner and are recorded as
corroboration by the owner's own ruling: they stay rejected, and
neither carries the decision. The owner argued that several
individually-rejected arguments should re-weight in aggregate; this
was argued down and withdrawn. Inadmissibility is a filter rather
than a low weight, and filters do not sum — if they did, the
literature standard would be defeasible by volume, which is what it
exists to prevent. What did aggregate legitimately is different in
kind: five of the revision's eight blocking findings landed on this
one mechanism, and each is provable by reading.

**Tripwires**: a session where the owner wants to hand a decision
over, and its absence produces a worse outcome than the grant would
have; repeated "your judgement" closures where the material-findings
returns become the interruption the grant was meant to prevent, which
would mean the consolidation rule is not doing the work claimed for it
here; a reader of a decision record concludes the owner weighed a
decision they did not, which is the conceded cost surfacing as real
harm.

**Also decided:**

- **`grant-note` is `ruled-out`**, with the reason above, so the
  Reopening test can read it. Record fidelity is the one thing removal
  costs and is the thread to reopen if a tripwire fires.
- **The literature watch list loses two entries**, both of which
  existed only to watch this state. The README's preamble is corrected
  to match; its remaining count discrepancy is a separate finding and
  is not repaired here.
- **The fixtures move in this change**, not a later one:
  `delegation-in-grant` and `delegation-out-of-grant` are deleted,
  `delegated` is struck from six other rubrics' enum lists and from
  the harness `STATES` array and both mode lists. The rule that a
  fixture change lands with the skill change it tests was found
  violated five times in this revision; this is not the sixth.
- **Left open, not decided here** — `self-confirming-observation`: the
  evidence standard admits an addition on a behavior a session
  produced "unprompted, under no rule requiring it", but a rule that
  OFFERS a move does not require it, so a behavior produced because
  the rule was already there satisfies the letter of the test. The
  observation arm is contaminated once the text ships. The repair the
  owner named is to make the observation against text where the rule
  is absent, which the harness already supports through `args.skill`
  and which the standard currently spends only on the veto question.
  Provable by reading the standard, so admissible; it wants its own
  entry and its own argument.

### 2026-08-03 — what real use has to show before an instruction is added

**Verdict: change.** The necessity route gains an admission test that
governs ADDITIONS only. An addition requires an observation from a
real session — the behavior produced unprompted, or asked for by the
user mid-session — plus the user's endorsement carrying a named lack.
The two observation forms are not equal evidence. An admitted
observation obliges a one-sentence mechanism statement before any text
is written, and settles necessity alone.

**Mechanism**: "real use of the skill" was the standard's only
originating route for new instructions and its only undefined evidence
type. Every other route states what counts and what does not — a
synthetic fixture never originates, a review finding originates only
when its defect is provable by reading — so the one route that mints
new rules had neither an admission test nor an exclusion, and anything
the maintainer noticed while using the skill read as qualifying.

**Evidence at decision time.** One worked case, stated as one and not
as a series: the criteria threads.

- A session in which the user complained that criteria were not
  distinguishable from other threads in the ledger, and asked to see
  them in a separate table. This is the asked-for form.
- A second session, unrecorded until this entry, in which the
  assistant marked criteria threads `c-*` and other threads `t-*` on
  its own, under no rule requiring it. This is the unprompted form,
  and it is the only instance of that form the record holds. The
  marker it chose was unconstrained — nothing in the skill pointed at
  a prefix rather than a table or a column — which is what the
  admission rule generalizes from.
- The first edit that followed transcribed the asked-for behavior:
  show criteria in a separate table. It survived, but it was
  incomplete. The structural defect underneath — criteria had been
  declared threads without being given a fate in the state enum — was
  found a revision later by the cold flaw axis and the
  revision-interaction axis independently, and repaired in
  2026-08-03 — criteria leave the state enum.

The unprompted session is weak evidence for `c-*`/`t-*` specifically
and strong evidence that the skill was silent where a session needed
an answer. That asymmetry is the finding the two-forms rule records.

**Losing arguments and where the winner absorbs them:**

- *"Both observation forms are equal evidence for the behavior
  observed."* This was the shape proposed at the start of the
  discussion. It lost because an unprompted behavior demonstrates the
  move was already available, which under Gaplessness is not the goal
  is a conformance case at best, and because the shape the session
  chose was unconstrained by anything. Absorbed: the unprompted form
  remains a full admission route, but what it admits is the gap, not
  the wording.
- *"The user's endorsement is sufficient on its own."* Lost to the
  ephemeral-evidence rule: the field report carrying the endorsement
  is deleted once harvested, and an entry recording a feeling cannot
  be read afterwards. Absorbed: the endorsement stays the owner's
  unfalsifiable weighing, and only the named lack is required beside
  it — the Language section's cheapest checkable form, a named failure
  the behavior prevents.
- *"Reflecting more broadly is permitted where the observation
  warrants it."* Also the shape proposed at the start. Lost because
  permission is not a rule and produces no output. Absorbed as an
  obligation that does: the one-sentence mechanism statement, which
  the criteria case shows would have been answerable at the time.
- *"Require recurrence — two sessions before any addition."* Rejected
  as a hard gate: it delays every correct addition to catch the rare
  wrong one, and the mechanism statement already collapses most
  multi-observation cases into a single structural edit. Absorbed:
  recurrence survives as the tripwire on a parked bare transcription.

**Also decided:**

- **The test governs additions, not repairs.** A contradiction, a
  broken trigger or a factual error keeps the provable-by-reading
  route, which does not require a session at all.
- **A parked prediction's tripwire is defined by this test.** The
  standard already parks review findings that predict a behavior, with
  a tripwire naming "what a real session would show"; that phrase now
  has a definition, so a park either has fired or has not.
- **A noticed-but-unexhibited "should have" is a prediction.** It
  carries no more weight for arriving from the maintainer than from a
  review agent, and its route is to ask for the behavior in the next
  session, which costs a session and not the finding.

**Tripwires**: a mechanism statement is written for an addition and
names neither a structural defect nor a bare transcription, meaning
the step produces ceremony rather than discrimination; an addition
lands whose named lack restates the behavior itself ("without it, the
assistant did not do it"), meaning the named-lack bar admits circular
answers; a parked bare transcription recurs in a later session and
nobody notices the park, meaning recurrence-as-tripwire has no
reader; the user reports having withheld a real improvement because no
session exhibited it and the next-session route was not worth taking,
meaning the exclusion is drawn too tight; the next unprompted-form
observation produces an edit that transcribes the behavior rather than
naming the gap, meaning the asymmetry was recorded but not applied;
an addition arrives justified as a repair — a rule with no compliant
move — with no session behind it and no contradiction quotable from
the text, meaning the additions-only scope is being routed around.

### 2026-08-03 — why the skill has a Language section (recorded after the fact)

**Verdict: keep, recorded after the fact.** The Language section
stays: plain technical English, a jurisdiction decided by who consumes
the text, and the rule that a qualitative claim may open a thread but
never close one.

**Mechanism**: the most-cited section in the repository had no
recorded justification, so every argument leaning on it leaned on a
rule nobody had argued.

**Evidence at decision time.** The section is the authority for a
whole review axis, for the literature standard's carve-out (a
justification the literature refutes may still be edited, because it
independently fails this rule), and for an entire cluster of edits
landed today. Its only recorded support was a README literature
bullet, and this repository has since decided that literature does not
govern the skill — so the section's authority rested on nothing
inside the record.

Why each part:

- **No idioms, no aphorisms.** Two reasons, and the second is the load
  the rule actually carries. Readers include people whose first
  language is not English, for whom an idiom is a lookup rather than a
  meaning. And an idiom smuggles a qualitative judgement past argument
  without stating it — the same failure the rigor rule addresses,
  arriving through vocabulary instead of through claims.
- **Jurisdiction by consumer, not by location.** Working prose and
  product copy have different contracts: a product's text may pursue
  literary value deliberately. Deciding by where text is stored gives
  the wrong answer for a code comment in a file that also holds user
  strings, so the test is who reads it.
- **A qualitative claim may open a thread, never close one.** The
  skill exists so decisions rest on arguments that can be contested.
  An adjective offered as a justification cannot be contested, because
  there is nothing in it to be right or wrong about; it ends the
  exchange while looking like it advanced it. Opening a thread is the
  legitimate use — "the app should feel responsive" is a real goal —
  and the conversion to an observable is what makes it arguable.
- **The deletion test** gives the rule a mechanical form, so it can be
  applied without judging tone: remove the sentence, and see whether
  the argument still stands.

**Losing arguments and where the winner absorbs them:**

- *"This is a style preference, and style preferences do not belong in
  a skill."* Rejected: the failure named is specific and checkable — a
  thread closed on a claim neither party can test — not a matter of
  taste. The absorption is the deletion test, which fires only on
  claims doing closing work and leaves prose style alone.
- *"Applying the rule to this document is pedantry."* Rejected today
  on evidence. The jurisdiction clause names this document, and when
  the section was finally audited against itself the violations turned
  out to be concentrated in the Overview, the Language section and the
  stop-signal list — the parts an assistant reads first and imitates —
  while the parts it merely executes were the cleanest prose in the
  file. A rule the document visibly breaks is a weakened rule, and it
  was being weakened exactly where it mattered most.

**Tripwires**: a thread closes on a qualitative claim and nothing
catches it until a review, meaning the rule is not being applied
during discussions; the who-consumes-it test produces an answer a
contributor disputes, meaning the jurisdiction line is in the wrong
place.

### 2026-08-03 — the pre-release review is a gate, and why it has the shape it has

**Verdict: keep, recorded after the fact.** The multi-axis pre-release
review described in `CLAUDE.md` is the release gate. Each axis gets its
own fresh subagent, the cold axes are given the skill file alone, and
every reviewer returns findings rather than replacement wording.

**Mechanism**: sixty-five lines of process rules were carrying their
own justifications inside `CLAUDE.md`, which is the operational
document — so the arguments had no home, and the axis list could
change with no record of why.

**Evidence at decision time.** This is a tripwire firing, declared by
the 2026-08-02 entry that created this record: "`CLAUDE.md` grows a
justification paragraph that no entry covers." It fired on the section
that gates releases, and it was reported by two independent coherence
passes before being written down.

Why each element:

- **A fresh agent per axis.** Independence is the whole value. An
  agent that has already run one axis has been anchored by what it
  found, and an agent told what another found stops being a second
  observation.
- **Cold axes.** Axes 1 to 4 receive the skill file alone. A reviewer
  who has read the README knows what the skill is supposed to do and
  reads that intent into ambiguous text; a reviewer who has not can
  only see what the text says. The cost is that cold reviewers
  sometimes report things the surrounding documents already answer,
  which is cheap to triage and worth paying.
- **Findings, never wording.** A reviewer's proposed patch is worse
  than useless: under the editing discipline a finding establishes
  necessity only when its defect is provable by reading, and a
  finding that predicts a behavior gets parked rather than patched.
  Wording arriving with the finding invites landing it unargued.
- **Behavioral questions are excluded** and belong to the regression
  harness, because a reader cannot answer what an agent will do.

**Evidence that the axes earn their places**, in the form each axis
had already produced before this entry: over-application caught the
prior-art move over-firing 0/3 on two successive fixtures, which no
other axis would have looked for; the test-suite axis found two rubric
bugs and one miscalibrated scenario, each of which had already
produced a misleading result; language self-compliance found the
document breaking rules it enforces on everyone else, concentrated in
the sections an assistant imitates; and coherence found a correction
that had landed in one document of two.

**Losing arguments and where the winner absorbs them:**

- *"One reviewer covering several axes, for cost."* Rejected on the
  anchoring the axes exist to avoid. The absorption is that axes are
  not all run every time: the literature axis runs only for mechanisms
  added since the last mapping, and the revision-interaction axis is
  scoped to one diff.
- *"Reviewers should propose fixes, since they have the context."*
  Rejected: the context that produces a good finding is not the
  context that produces good wording, and the editing discipline
  requires the wording to be argued separately anyway.

**Tripwires**: an axis produces nothing actionable across two
consecutive reviews, which would mean it is asking a question the
documents have stopped being able to answer; two axes repeatedly
report the same findings, which would mean they have collapsed into
one and one of them should go.

### 2026-08-03 — gaplessness is not the goal; capability gaps beat conformance gaps

**Verdict: change.** A gap in the skill's rules is weighed by which
kind it is. A capability gap — a move the assistant does not have —
is worth text. A conformance gap — a move it has and might not make —
is worth text only where the default is systematically wrong, which is
what the control arm measures.

**Mechanism**: edits aimed at making the rule set gapless grow one
rule per observed interaction, and each added rule creates fresh
interaction surface against the rules already there, so the defect
count rises faster than the coverage does.

**Evidence at decision time.** The owner's observation is that earlier
iterations kept trying to make the rule set gapless, and that no
wording makes a methodology self-enforcing. This revision measured the
cost: the revision-interaction axis found ten interaction defects
across thirty-four edits, and nearly all of them were between
conformance-shaped rules — the checkpoint batch word, the no-rival
closing move, the material-findings default's exception branches, the
cheap-path gate. Each was an attempt to pin down what the assistant
does in one specific exchange. Meanwhile the rules that came through
all eight review axes clean are capability-shaped: the tripwire
definition, the deletion test, the discriminating-artifact step, the
prior-art move, the keep-or-change verdict slots.

**Losing arguments and where the winner absorbs them:**

- *"Conformance rules are the less useful kind, full stop."* The
  unqualified form would delete the skill's core. "Test the user's
  proposal rather than building on it" is pure conformance — the
  assistant is entirely capable of testing and will not by default —
  and countering that default is why this skill exists. Absorbed by
  the qualification: a conformance rule earns its place when the
  default is SYSTEMATICALLY wrong, not occasionally absent, and the
  control arm is what tells the two apart. The two filters compose
  rather than competing.

**Also decided:** this sharpens the scope-and-conciseness review axis.
Its question is no longer only whether a passage does work, but
whether it is a capability rule or a conformance rule, and if
conformance, whether the default it corrects is systematically wrong.

**Tripwires**: a revision adds rules and the interaction axis reports
more defects than the revision repaired, meaning the weighting is not
being applied; a capability the skill needs is missing and nobody
proposes it because the project has become reluctant to add text,
which would be this entry over-applied.

**Also decided: the fixture repairs this ruling permits.** Four
fixtures carried defects that made a red uninterpretable, and the
regression run produced two of them as actual failures.
`assumed-convergence` item 1 was still scoring the assumed-facts sweep
that this project landed and then reverted, in the fixed-set shape
already found wrong once; it now scores only the provenance rule the
skill actually has. The undefined `(E1)` marker is removed from the
three items still carrying it — it resolved to nothing while judges
were told to score every numbered item, so it gated as hard as
anything else. `interpretation-trap` item 6 required notes to record
relations in a scenario containing none, so it could only pass
vacuously or fail on a judge's invention; it now scores restraint,
with its own limitation stated in the item. `self-refuting-proposal`
item 4 encoded one reading of a genuine ambiguity in the skill —
whether a bare positive counts as the user having "adopted or built
on" a proposal — as a hard gate; it now accepts either reading and
fails only closure that needs the user's word. Its preamble also
briefed the judge on a control result from this record, which is
history a judge should not be weighing.

**Parked — `record-errors`.** The document-coherence axis found three
defects in this record made during the same session: two entries
appended without the head rewrite the discipline requires, a
declared-gap sentence that under-enumerates and so reads as a claim of
coverage it does not have, and a referencing rule forbidding citation
of ephemeral documents while the entries cite review identifiers
roughly twenty-five times. **Tripwire**: a session cites a head for
something the head does not state, or follows the referencing rule to
a reference that dangles. **Re-entry point**: the document-coherence
axis of the next pre-release review.

**Parked — `record-size`.** This file passed 1500 lines and no longer
fits a single read, which is the 2026-08-02 entry's own declared
tripwire on the one-file decision. **Tripwire**: as declared there —
discussions citing the head but never an entry, meaning a session's
grounding read has stopped covering the file. **Re-entry point**: the
next pre-release review, or the first session that reports the
grounding read failing, whichever comes first.

### 2026-08-03 — criteria leave the state enum; two defaults are repaired

**Verdict: change.** Criteria stop carrying the proposal state enum
and gain a kind and a satisfaction line. The material-findings
default's two exceptions are narrowed and given a termination. The
cheap path's calibration is replaced by four named escalators. And a
new expectation is added: the user engages toward convergence.

**Mechanism**: the state enum lists fates for a PROPOSAL — won, lost,
deferred, absorbed, retracted, handed over — and criteria were later
declared threads without being given a fate, so every closed state
read wrong for them and the closure machinery inherited a dead end it
kept patching around.

**Evidence at decision time.** An eight-axis pre-release review and a
full regression run at three repetitions. The criteria defect was
found independently by the cold flaw axis (no legal closed state for a
criterion, so convergence cannot hold or the criterion is marked
`approved` and the Reopening rule then reads it as a decision a rival
must defeat) and by the revision-interaction axis (the criteria-table
rationale says a criterion must not be "closed like" a proposal while
the grant-boundary clause says a criterion that cannot close blocks
convergence). It fires in every full-path discussion.

The two default defects were observed, not predicted. In
`delegation-out-of-grant` the assistant wrote "the choice is outside
the grant and the turn stops at it", named no default and stopped —
the infeasibility branch swallowing a case the grant rule routes
through the protocol with a default. In `delegation-in-grant`, which
had passed 2/2 when the state landed, two of three repetitions
produced "Absent a word from you, the length-prefixed format is what
ships" — the returning-once ceremony appearing inside a grant, where
the rule already says there is no material-findings round. The
regression run was otherwise 16 of 19 scenarios green at 3/3.

**What the owner's ruling settled, and what it removed from scope.**
The review's most severe-sounding findings — convergence can never
hold, the no-rival thread is permanently unclosable, parked dissent
traps the discussion — were all premised on a user who never speaks.
The owner stated that the user is playing under the rules and actively
seeking convergence; that becomes an expectation in the README, and
under the scope test those findings describe behavior outside the set.
Each is escapable by one word from a user who wants to converge. What
survived the filter is what a cooperative user cannot rescue, because
they would not know it was happening: an assistant holding work it
should have proceeded with, an infeasibility branch firing outside its
case, and a cheap path that escalates a help-string fix.

**Losing arguments and where the winner absorbs them:**

- *"Revert the whole eight-edit closure cluster and re-land it as one
  designed unit."* This was the standing proposal, argued on the
  grounds that repairing entangled edits one at a time is what
  produced the damage. It lost to the expectation above, which removes
  the closure dead ends from scope and shrinks the entangled set to
  two edits — and two edits can be reasoned about together, which was
  the whole basis of the objection. Absorbed: the two survivors are
  repaired in one change, not separately.
- *"Give criteria their own closed state, meaning the design satisfies
  this."* Rejected in favour of a satisfaction line, because a state
  is a fate and satisfaction is a RELATION between a criterion and the
  approved set. A state could not name which approved threads meet it,
  which is the thing the owner said matters at convergence.
- *"Give criteria numeric weights."* Rejected: the Language rule would
  require the numbers to be checkable, and they would be invented —
  the same defect the grant-conversion clause produces. Binding versus
  weighed carries the distinction with no fabricated precision.

**Also decided:**

- **Criteria may be DERIVED** from the project's own recorded rules,
  not only stated in the discussion. A derived criterion is binding as
  a stated presumption until the user says otherwise, which is the
  same machinery `presumed-settled` uses and for the same reason.
- **"Unmet-and-accepted" needs the user's word naming that criterion**,
  not a blanket confirmation, or it becomes the rubber stamp the
  closure discipline exists to prevent.
- **The parked `criteria-axis` thread is delivered.** Its recorded
  re-entry point was "the next revision review"; this is that review,
  so it reopened on its own terms with no new argument required.
- **The step-5 consolidation escape no longer routes through the
  material-findings protocol.** That protocol's trigger is information
  arriving after a thread CLOSED, and at step 5 nothing is closed, so
  its default ("I build the decided shape") named nothing and its stop
  branch would have suppressed the other investigations.
- **A fixture change lands in the same commit as the skill change it
  tests** (`CLAUDE.md`). The parked-thread re-entry requirement landed
  this morning while two fixtures kept scoring the old rule, and a
  full run passed them 3/3 meanwhile.

**Tripwires**: a discussion converges with a binding criterion whose
satisfaction line was never contested, meaning the line is read as
ceremony; a criterion is derived from project rules and turns out to
be wrong for the discussion, meaning the binding-by-presumption
default is too strong; the material-findings default holds work in a
case the user reports as obstruction, meaning the this-turn test is
still drawn too wide.

### 2026-08-03 — the coherence pass, and three things it found unrecorded

**Verdict: change.** The document-coherence axis was re-run against the
current documents rather than triaged from the earlier review, because
all four had been rewritten continuously since that review was
written. It returned eleven findings. Six are stale-text fixes, four
are recorded here as decisions, and two need no action.

**Mechanism**: a correction landing in one document of two leaves the
other stating the defeated position, and nothing detects that except a
pass that reads them against each other.

**Evidence at decision time, on the four that were decisions.**

- **`docs/reviews/` had no documented lifecycle**, while a dozen
  entries cited its finding identifiers. It is ephemeral evidence,
  identical in kind to a field report, and the head sections now say
  so. The consequence is written into the referencing rule: an entry
  may cite a finding identifier for traceability, never as the carrier
  of the argument, because after deletion the identifier is a label in
  history. The 2026-08-03 review file is deleted in this change.
- **"Ledger" named two opposite things.** The skill defines it as the
  in-discussion thread set, "carried in the discussion and never in a
  file"; this repository called a file the ledger. An assistant
  running the skill inside this repository — a routine event here —
  met both. The sharpest case was the standing risk, "a repository
  with no docs, no ledger, and no conventions", which under the
  skill's own vocabulary reads as a repository where no discussion is
  being tracked. Maintainer prose now says *decision record*; the
  skill's term is the one that ships, so the skill did not move.
- **Most of the skill predates this record and no entry argues it.**
  Back-filling all of it is out of proportion to the gain, so the
  referencing rule now states the gap instead: it cannot be followed
  for the loop's steps, the state enum, the premortem, the record
  step, or *When NOT to use*. Stating it stops the gap being
  rediscovered as a finding at every review. Sections are back-filled
  when a decision touches them.
- **The frontmatter broke the contract stated for it.** "Requires a
  frontier-tier model" is a capability gate and not a triggering
  condition, and the 2026-08-02 entry had removed the previous
  sentence on exactly that ground. The sentence is worth keeping — a
  model below the bar produces the format without the discipline, and
  the description is the only place an installer sees that before
  running it — so the contract is amended to allow one capability
  gate rather than the sentence being deleted.

**A correction to an entry made earlier the same day.** The
six-triggers entry prescribed the verification run as
`only: ['prior-art-fires','prior-art-holds']` at `reps: 3`. That is
wrong: `only` filters the MODE's lists, `prior-art-fires` is in the
full list alone, and the run as prescribed would have executed the
holds arm by itself — green from the arm that cannot detect the
regression that loosening the gate risks. The run needs `mode: 'full'`.
The harness now warns when `only` names a scenario the selected mode
does not carry, which is the same class of hole as the zero-selection
green repaired in Class A, and was left open by the same reasoning.

**Class F is resolved, not carried.** The earlier review ranked
seventeen missing fixtures. Under the evidence standard adopted today
a fixture originates no edit and the suite is a canary, so a missing
fixture is a gap in a canary rather than an untested rule. The bulk
are not written. Three rules are recorded as untestable by this
harness rather than left looking uncovered: the no-selection-dialogs
rule (a probe agent has no tools to emit one), After-convergence
recording (it needs a spec-to-implementation boundary the harness does
not span), and frontmatter triggering (the harness loads the skill by
path and never exercises the description).

**Also decided:** three review axes are added, described in
`CLAUDE.md`. Scope and conciseness answers "can anything be shortened
without losing intent or clarity", bounded so it hunts inert text and
never length — a size budget arriving through that axis would
reinstate the criterion the 2026-08-02 entry retired, so every finding
must name what changes behaviorally if the text is deleted. Revision
interaction is diff-scoped and asks whether any two edits in one
revision interact badly; it exists because in this revision the
grant-boundary edit routed more findings into a default that a later
edit had to repair, and the two were connected by hand rather than by
process. The expectation-conformance question is folded into axis 8
rather than given its own agent, since both ask whether a rule should
be removed.

**Tripwires**: a correction lands in one document and the coherence
axis finds its counterpart stale at the next review, meaning the
"same change" discipline is not being applied across documents; an
entry cites a review finding identifier and a reader cannot tell what
the finding said.

### 2026-08-03 — the skill is made to obey its own Language section

**Verdict: change.** Seven language defects fixed, plus a factual
error in the closure rules. The Language section's jurisdiction clause
covers this document, so every one of these was the skill visibly
breaking a rule it enforces on everyone else.

**Mechanism**: the Language section was written and then applied to
the project's other prose but never to the document containing it.

**Evidence at decision time.** A rule a document visibly breaks is a
weakened rule, and the review's language axis found the violations
concentrated in the Overview, the Language section itself and the
stop-signal list — the parts an assistant reads first and imitates —
while the parts it merely executes were the cleanest prose in the
file. The review's own dispositions split these between "fix" and
"probe"; that split is void under the standard adopted today, because
a document contradicting its own rule is provable by reading and
internal consistency is always in scope.

What changed:

- **"load-bearing"** was an undefined metaphor used inside the
  Language section, four lines after that section bans undefined
  metaphors, and again as a rule title in Keep-or-change. Both sites
  now say what they mean.
- **The sentence demanding short sentences** ran about fifty words
  with a colon, two semicolons, an em dash and a nested parenthetical.
  It is three sentences.
- **"Giving arguments state produces an unreadable graph"** was an
  adjective closing a thread, flagged independently by three axes and
  cited in the 0.4 harvest as the reason defeating `edges-as-threads`.
  Replaced by the structural reason rather than reworded: an argument
  bears on several threads at once, so a state per argument needs a
  many-to-many relation a delta row cannot show, and the note column
  already carries the relations that must be visible.
- **Nine idioms** in operative instructions: "turn on", "on the spot"
  twice, "the boundary runs both ways", "in the flow of", "with both
  in view", "built to lose", the unexplained "/" in an excuse row, and
  the section title "Red flags", now "Stop and reopen the exchange".
  Those nine are what the review actually listed; it reported "roughly
  sixteen" without naming the rest, and the balance is not invented
  here. "A blanket positive" is kept and given examples rather than
  removed: it functions as a term in the closure rule.
- **Five qualitative claims doing closing work**, each replaced by the
  named failure it prevents, which is the conversion the Language rule
  itself permits. The sharpest was "cost always favors the incumbent",
  an unfalsifiable absolute sitting four bullets above "Verdicts must
  be falsifiable".
- **The stale-presumption trigger** was an every-round evaluation with
  no count and no test for "unrelated", in a document that shows the
  precise form elsewhere. It is now two rounds without the user's
  arguments depending on it. Flagged twice independently: by the
  review's language axis, and by the expectation-set audit from a
  different direction.
- **"Exactly three declared cases" of closure by the assistant** was a
  factual error. `superseded` requires "a proposal the user approves
  by name", so it is closure by the user. There are two. The framing
  sentence read as a warrant for a third kind of unilateral closure
  that does not exist. (Review finding C6, which was missed when the
  clusters were drawn and is caught here.)

**Overstated and scoped down:** the review reported five one-sentence
compressions misplaced as body prose. Two are already in the form the
rule prescribes — a bolded summary line followed immediately by its
restatement — and one had been replaced earlier the same day. The
genuine violation was "a manufactured objection is the strawman
pattern in reverse", which additionally asked the reader to know a
named pattern and invert it.

**Preserved deliberately**, because the same axis named them as what a
revision would most easily damage: the tripwire definition, the parked
thread's completeness test, "each appears exactly once", "Material
findings come back exactly once", "The deciding test is who consumes
the text, not where it is stored", the keep-or-change verdict slots,
and the no-selection-dialogs rule, whose justification is three
concrete mechanisms rather than adjectives.

**Tripwires**: a later reader has to ask what a term in this document
means, which is the failure the vocabulary paragraph exists to
prevent; a rewrite reintroduces a qualitative claim as the sole
justification for a rule.

### 2026-08-03 — six rule triggers that could not fire, or fired on the wrong thing

**Verdict: change.** Six edits, one README clause, one parked
prediction. Each edit is a defect provable by reading rather than a
predicted behavior.

**Mechanism**: several rules were written as a description of the case
they were about and never as a test, so their stated trigger does not
select that case.

**Evidence at decision time, finding by finding.**

- *C1, the cheap path.* Broken in both directions at once. The
  inventory asked for five nouns and the escalation fired on three, so
  stored data and user-visible behavior were inventoried and never
  escalated — while "migration", which did escalate, was not in the
  inventory. From the other side, "decided threads that read this one"
  matches nearly everything inside a discussion, so the exemption was
  unreachable. Now: the cheap path requires an inventory naming source
  files and nothing else, and a decided thread escalates only if it
  would have to be REOPENED.
- *C8, the prior-art gate.* "If you cannot name a project that faced
  this same question and say what it built, do not propose the survey"
  requires knowing the answer in order to ask the question, and
  forbids the case that motivates surveying. The bound exists for a
  reason — the unbounded wording over-fired 0/3 on two successive
  fixtures — but the private-facts exclusion is what did the work
  there: the dbt and Cube over-firing failed because the question
  turned on the project's own two conflicting definitions, not because
  nobody had shipped metric tooling. That exclusion stays; the
  name-a-project test becomes naming the problem class and one place
  the answer is expected to exist.
- *C11, consolidation.* "Consolidating costs latency and nothing else"
  is false when the first of three parallel investigations returns an
  infeasibility that invalidates what the others are testing, which
  the material-findings protocol says to present at the top of the
  turn. Doubly wrong since the same day's Class B work made an
  infeasibility stop the turn. Consolidation now yields to the
  protocol, and the absolute claim is replaced by the operative rule
  rather than reworded.
- *C12, "comes back exactly once" had no scope.* Read per thread it
  suppresses a second genuinely different finding; read per finding it
  licenses four interventions on one closed thread. Both complied.
  Once is per finding; repeating the same finding is the stall.
- *C18, qualitative claims against the user's own rationale.* "As the
  justification for a decision, an unconverted qualitative claim is
  not an argument" could be read as covering the USER's ruling, which
  collides with Decision authority — their word closes a thread and
  needs no justification. The rule now says it governs arguments and
  never rulings. This also dissolves the reported taste-domain
  problem: a taste question closes on the user's word, not by
  argument, so the absence of an observable does not trap the thread.
- *C19, the tracking-failure rule could not fire.* "A round that
  exchanged proposals but changed no thread state" — minting a thread
  IS a state change, so a round containing a proposal always changed
  state. The test is now the delta, which is the artifact whose
  absence the rule was written to catch.

**Verification status, stated because the standard requires it.** None
of these six is verified. Under the evidence standard adopted today
that is permitted — the harness is a canary and not a gate — but one
of them deserves a run before it is trusted: the prior-art gate is the
only rule in this set whose over-firing is documented, at 0/3 on two
fixtures, so loosening it is the case where a canary is worth its
cost. The run to make is `only: ['prior-art-fires','prior-art-holds']`
at `reps: 3` against a frozen copy of the skill.

**Losing arguments and where the winner absorbs them:**

- *"C14, the user is never taught the vocabulary, needs a rule
  instructing the assistant to teach it."* Rejected as a skill edit
  and answered by documentation, which is what the expectation set was
  predicted to do for this finding. The README already teaches
  `presumed-settled` and states what the batch confirmation closes;
  what was missing was that reopening is a right the user holds, and
  that is now one clause in the same section. No rule added.

**Parked — `party-neutral-stall`.** The stall definition is
party-neutral, so a user repeating themselves satisfies it and could
be told so, when the repetition may mean they have not been heard.
Party-neutrality is deliberate — it is the symmetry claim — and the
harm is predicted rather than observed. **Tripwire**: a session where
the assistant characterises the user's repetition as a stall and the
user was signalling that a point had been missed. **Re-entry point**:
the over-application axis of the next pre-release review.

**Tripwires**: the cheap path is never taken across a revision's worth
of decisions, meaning the source-files-only test is too strict; a
prior-art survey is proposed for a question whose answer turns on
facts private to the project, which is the over-firing the loosened
gate risks.

### 2026-08-03 — four over-application findings, no text added

**Verdict: keep.** The review's quota-pressure findings — C17, C16,
C10 and C2 — produce no edit. Three are rejected and one is parked.
Recorded because a rejection with no reason on the record is a
finding that comes back, and because four rejections in a row is
itself a result about the review.

**Mechanism**: an over-application axis reports what a rule COULD do,
and three of these four were defeated by what the rule already says.

**Evidence at decision time, finding by finding.**

- *C17, three rules each demand a manufactured counter-position.* One
  of the three was real and was retired earlier the same day: the
  single-live-thread fork now applies only while a rival stands. The
  other two are misreadings. The nearest-rival rule states that "'no
  rival worth naming' is itself a claim, tested like any other",
  which asks for a rival OR the claim that there is none. The rule on
  testing the user's proposal is conditional — "when a shape exists
  that meets a named criterion theirs fails" — and is followed three
  lines later by "a manufactured objection is the strawman pattern in
  reverse".
- *C16, tripwire inflation.* The premise is false. The text names
  three provenances for a closing fact — "measured, read in a named
  source, or assumed" — and only the third becomes a tripwire. A
  textbook fact is read in a named source.
- *C10, an automated report with 40 findings becomes 40 threads.* The
  reading is genuinely ambiguous and one branch is unworkable. It is
  rejected on observed use rather than on the text: this session
  handed the assistant a 78-finding review, and it clustered them
  without prompting instead of minting 78 threads. That is the worst
  realistic case, handled correctly, with no rule telling it to.
- *C2, the bounded-problem off-ramp never fires.* Probably true, and
  parked rather than rejected. "A second defensible shape is nameable
  for nearly any request" is a claim about the world, not a reading of
  the text, so it is a prediction and the triage criterion parks
  predictions. **Tripwire**: a discussion runs the full machinery and
  the user afterwards states it was a simple requirement. **Re-entry
  point**: the over-application axis of the next pre-release review.
  The harm is bounded meanwhile by the owner's own standing
  instruction, which tells the assistant to state which reading it
  takes and allows an overrule.

**Also decided:**

- **The literature watch list has a home.** Today's ruling sends
  contradicted verdicts to a watch list, and none existed. The
  README's literature section gains a *Watched, not acted on*
  subsection carrying the mapping's five contradictions, each with the
  reason the practice stands anyway. That also discharges review
  finding E7, which reported the section's honesty paragraph naming
  one gap against at least seven unmapped mechanisms; it now states
  that most of the skill has never been mapped.
- **Class E is re-derived, not triaged.** The review's document
  coherence findings describe documents that have been rewritten
  continuously since it was written: E4 and E13 are discharged, E11
  was settled by the release ruling, E6 is partly back-filled by this
  day's entries, and E5, E7, E10 and E12 describe text that no longer
  reads as the reviewer read it. Triaging that list item by item would
  mean checking each finding against a document it no longer
  describes. Instead the coherence axis is re-run by a fresh subagent
  against the current documents once the skill work is finished, and
  its findings are triaged then.

### 2026-08-03 — the checkpoint word, and the default that built what it had just refuted

**Verdict: change.** Two edits close the review's Class B, the class
of defects where no move satisfies every rule at once. A positive word
given against a displayed checkpoint table is the batch confirmation.
And the material-findings default no longer says "proceed" in the two
cases where proceeding is incoherent or destructive.

**Mechanism**: both rules were written for the ordinary case and then
applied without exception to the cases that break them — a vague word
with no table in front of it, and a finding that removes the thing the
default would build.

**Evidence at decision time.**

The first is a direct collision, provable by reading: "a word that
requires interpretation — a blanket positive — closes nothing" against
"the batch word promotes that bucket". At a displayed checkpoint both
fire, so "yeah, looks right" either closes fifteen threads or none,
and both readings comply. The resolution was not invented here. The
README's expectation set, approved earlier the same day, already
states it: the batch confirmation closes everything in the table at
once, by design, and confirming without reading records decisions you
did not make. Writing it into the skill only makes the skill agree
with what the project already promised its users. This is the first
case of the expectation set deciding an open question rather than
excluding one.

The second is the one place the document's own reasoning about
reversal was absent. Decision authority reasons about migrations,
published interfaces and stored data three paragraphs below the
material-findings protocol, and the protocol tells the assistant to
proceed unilaterally on any of them while a finding is pending.
Worse, the protocol's own trigger list includes an infeasibility — so
the assistant states that something cannot be built and builds it in
the same turn. The finding became more urgent in the same session that
fixed it: the grant boundary decided hours earlier routes every
infeasibility inside a delegation into this protocol.

**Losing arguments and where the winner absorbs them:**

- *"`withdrawn` is agent-owned closure with an agent-authored
  justification and no external check, so an agent under social
  pressure can retire its own strongest proposal."* Not rejected —
  parked, below. It is a behavioral prediction with no observed
  instance, which under the triage criterion parks rather than
  becoming text. The closure is also not unchecked: the rule requires
  the defeating reason on the record, and the record is contestable.
- *"Nothing bounds the breadth of a recorded reason, so a broad
  `ruled-out` entry can be cited to decline findings forever."*
  Rejected on a misreading of the bound. The Reopening rule's test is
  not topical overlap but whether a recorded reason covers the
  DISCRIMINATING FACT: "if no recorded reason covers the
  discriminating fact, the finding is new." A broad reason that does
  not address the specific fact fails that test already.

**Parked — `self-withdrawal`.** An agent retiring its own strongest
proposal through `withdrawn` under social pressure, which would be
sycophancy executed through a state the skill provides. **Tripwire**:
a session where the user pushed back socially rather than with an
argument, an agent withdrew its strongest proposal, and the recorded
defeating reason does not survive reading. **Re-entry point**: the
over-application axis of the next pre-release review.

**Tripwires**: a checkpoint batch confirmation closes a thread the
user later says they had not read, which would mean the table is too
long to be confirmed as one word; a material finding is held for
irreversibility and the user reports the hold as obstruction, which
would mean the reversal inventory is drawn too wide.

### 2026-08-03 — `delegated` is kept; the grant states its boundary

**Verdict: keep, with a change to the grant's mechanics.** The
`delegated` state stays. When a grant is taken, its boundary is stated
back: what is being treated as inside it, each named constraint in a
checkable form, and what would return anyway. An infeasibility returns
whether or not a constraint was named.

**Mechanism**: a grant that names no boundary is indistinguishable
from one whose boundary the assistant invented, and neither party can
tell which one they have.

**Evidence at decision time.** The state's own wording binds: its
control arm ran 0/3 with the forbidden ceremony quoted verbatim in
every rep ("Unless you say otherwise, I proceed with the repair
below"). The under-specification is observed rather than predicted —
in the session that produced this entry the owner delegated three
decisions with "follow your judgement", naming no constraints. The
boundary had to be inferred from a sentence elsewhere in the same
message, and it was stated back with no rule requiring it: exactly the
"behavior attributed to judgement rather than to text" pattern the
2026-08-02 entry on unreliable controls exists for. Review finding C4
reported three under-specifications; they have one fix, because
stating the boundary at grant time is where a qualitative constraint
gets converted and where the returning cases get named.

**Losing arguments and where the winner absorbs them:**

- *"Remove `delegated`. Fügener et al. 2022 found human-to-AI
  delegation produced no benefit, because subjects could not assess
  their own capabilities and delegated the wrong instances, with
  algorithm aversion explicitly ruled out."* This lost on the
  literature standard recorded today — published work does not open an
  edit — and NOT on its merits, which is recorded so the argument is
  intact if that standard ever changes. A second reason to weigh it
  carefully rather than treat it as decisive: the study delegates task
  instances for performance, while `delegated` records who weighed a
  decision. The mapping is not tight. That reading is this session's,
  not the paper's.
- *"An unconstrained grant should return nothing at all."* Partly
  kept: judgement findings do stay inside the grant, which is what the
  user handed over. Infeasibility does not, because whether the
  decided thing can be built is not a judgement call.

**Tripwires**: `delegated` appears in a real session recorded as
`approved` anyway (inherited from the 0.4 revision entry); the
boundary statement becomes ceremony a user skips reading, observable
as grants where the stated boundary is never contested and never
consulted; a delegated decision is later reversed by the user, which
would mean the grant was mis-scoped rather than mis-executed.

**Also decided:** the README's expectation on delegation notes that a
grant naming its constraints is worth more than a bare one.

### 2026-08-03 — structure the flow, not the content (recorded after the fact)

**Verdict: keep, stated explicitly.** The skill structures how a
discussion is conducted and never what may be proposed. Recorded now
because it is the founding intent and had never been written down.

**Mechanism**: an unrecorded founding intent is invisible to the edits
that erode it — each looks locally reasonable, and there is no
standard to judge it against.

**Evidence at decision time.** The intent is the primary cause of the
skill's creation: the alternative on offer was a narrowing elicitation
mode, and its characteristic failure is the solution quota — asked for
two or three options, a discussion produces two or three, fabricating
the ones a real problem does not have. The skill already implements
the intent in three places (the no-padding-to-a-count clause, the
padding red flag, the nearest-rival test), so this entry back-fills
rationale rather than changing behavior. The review's E6 identified
the general problem: most of the skill's rules have no recorded why,
so the referencing rule cannot be followed for them.

The intent is also under live pressure, which is what makes recording
it worth a prime location rather than a footnote. Review finding C17
reports three rules that each demand a manufactured counter-position —
the nearest-rival test, the single-live-thread fork, and the
requirement to test the user's proposal — which is the solution quota
arriving from inside the skill instead of from a questionnaire. One of
the three has already been retired: the single-live-thread fork now
applies only while a rival stands. The other two are judged against
this entry rather than against taste.

**Losing arguments and where the winner absorbs them:**

- *"Structure the content too, so discussions are reproducible."*
  Rejected: reproducibility bought by a quota is reproducibility of
  fabrication. The absorption is that the FLOW is heavily structured —
  states, deltas, checkpoints, closure rules — so a discussion is
  auditable without its content being prescribed.

**Tripwires**: an edit lands that specifies what must be proposed
rather than how it is argued and tracked; a real session produces a
padded alternative traceable to a rule in this skill.

### 2026-08-03 — the in-discussion ledger is not the project's decision record

**Verdict: change.** The two are named and separated in the skill's
vocabulary; the in-discussion ledger is stated to die with the
discussion; cross-session resumption is removed from the skill and
handled in the README's expectations instead.

**Mechanism**: one word, "ledger", was carrying two things with
opposite lifetimes — a structure that dies with the conversation and a
record that outlives the project's contributors — so rules written for
one were read as promises about the other.

**Evidence at decision time.** Three review axes converged here
independently, which the review named its strongest signal:
self-sufficiency found four rules promising a ledger that outlives the
session, the cold flaw review found the resume checkpoint
undischargeable, and the language axis found "ledger" the file's
highest-traffic undefined metaphor. The checkpoint's third moment,
"when resuming a discussion across sessions", could not be complied
with at all: a checkpoint is assembled by sweeping prior deltas, which
a fresh session does not have. That defect had been parked as
`resumption-honesty` since 2026-08-02, awaiting a real resumption to
judge it by.

The owner's ruling made the question moot rather than answering it:
resuming a design discussion in a new session is not a supported use.
The clause is deleted, `resumption-honesty` is retired, and the
supported case — a harness session resume with the full transcript
restored and the project in the same state — is described in the
README, not in the skill, because it is transparent to the assistant.

**Also decided:**

- **A tripwire is retired.** The no-state-artifact keep verdict
  (2026-08-02) carried two: a discussion losing its ledger to
  compaction, and "a cross-session resumption produces a checkpoint a
  participant contests as wrong". The second is void — the mechanism
  whose failure it watched no longer exists and the use case is
  unsupported. The first stands and now carries that verdict alone;
  compaction inside one discussion is the live risk against an
  in-conversation ledger. Recorded here rather than by editing the
  earlier entry, which is append-only.
- **The unacknowledged material finding** no longer "stays on the
  thread's ledger line" as "a record for the next session" — the
  ledger has no next session. It is carried into the decision record
  when the discussion records.
- **The spec and the decision record** are given their relationship,
  which the skill named two artifacts for and never stated: the spec
  is the full account, the record is its durable harvest, and nothing
  may survive only in the spec.
- **A commit message that argues a behavior counts as a document that
  argues it.** Necessity here is observed use, not a review finding:
  agents running the skill were already reading commit messages this
  way, and the failure the example prevents — treating a behavior
  documented only in a commit message as an implementation
  coincidence — is expensive and common, since for most projects a
  commit message is the only home such an argument has.
- **Two expectations added to the README set**: a discussion runs in
  one session with memory not outliving it, and the skill is a
  methodology rather than a script for every exchange.

**Tripwires**: a discussion loses its ledger to compaction and the
assistant cannot reconstruct it (inherited from the state-artifact
verdict); a user asks to continue a previous design discussion in a
new session and the decision record proves too thin to ground it,
which would reopen whether the no-resumption expectation is affordable.

### 2026-08-03 — a documented expectation set bounds the skill's scope

**Verdict: change.** The README gains *What it expects of you*: the
assumptions about user behavior and project shape the skill is built
on, each naming what degrades when it does not hold. It is the scope
test for proposed edits, and it scopes user behavior only.

**Mechanism**: without a stated boundary, every finding that names a
user behavior reads as a gap in the skill, so the skill grows once per
observed behavior and never shrinks.

**Evidence at decision time.** A rule for the abandoned discussion
(review finding C13) was argued as a provable gap, approved, written,
and reverted in the same session. It was wrong twice over: Decision
authority already covers "stop, build X" — an explicit word ends the
argument at any time — so the paragraph was dead text, and its only
remaining content was a demand to record a discussion the user had
walked away from, which is not the skill's job. Neither ground was
visible to the triage criterion in use, which asked only whether a gap
was provable by reading, never whether the gap was ours. The same
pressure is queued behind it: findings C10, C14, C18 and C20 all turn
on user behavior, and each would have generated a rule on the same
reasoning.

**Losing arguments and where the winner absorbs them:**

- *"Put the expectations in the skill, as an expanded 'When NOT to
  use'."* Rejected on what it does to the assistant: an in-skill
  expectation set becomes behavior, and the behavior is checking the
  user against a list. That is a behavioral change with no evidence
  anyone wants it, and it grows the skill — the outcome the set exists
  to prevent. Absorbed by the boundary clause: the skill keeps routing
  bounded problems away, which is a judgement about the PROBLEM, while
  the expectation set describes the working relationship and stays
  documentation.
- *"Hold the set in `CLAUDE.md`, where the scope test is applied."*
  Rejected on audience: the expectations describe what the user does,
  so the user is who must read them. `CLAUDE.md` points at the README
  section instead, under this file's referencing rule.

**Tripwires**: a finding dismissed as out-of-expectation reappears as
a real problem in use, meaning the set is drawn too wide; the set is
cited to close a finding about the skill's own internal consistency,
which the boundary forbids and which would mean the guard failed; a
user other than the author reports a working practice the set excludes
without argument, meaning one person's habits were written as
universal.

**Also decided:** the expectation set may discharge findings without a
skill edit. C14 — the user is never taught the vocabulary, and no rule
instructs the assistant to teach it — is answered by a user-facing
document that teaches `presumed-settled` and the batch confirmation,
with no rule added. That route is checked before any of C10, C14, C18
or C20 is written as skill text.

### 2026-08-03 — the regression harness is a canary, not a gate

**Verdict: change.** The evidence standard splits into three questions
— necessity, verification, veto — with a different answer each.
Necessity comes from real use of the skill and from review findings
provable by reading; the harness verifies and does not gate; the
control arm produces transcripts to read and no longer vetoes on a
clean pass rate.

**Mechanism**: one instrument was answering three questions, so its
weakest answer — whether a synthetic single-turn fixture predicts what
happens in a real design discussion — was silently carrying the
authority of its strongest.

**Evidence at decision time.** The pre-release review's Class A found
five independent defects in the harness (a rubric that cannot fail, a
judge scoring blind to the user's message, a green from zero runs, a
state check whose regex excluded the backticks every state is written
in, an `overall` taken on the judge's word), all of which were live
through the whole 0.4 revision that the harness scored. The same
review found 17 missing fixtures and 3 rules the harness cannot test
at all, so the coverage gap is structural rather than a backlog.

Against that, three facts kept the harness from being retired
outright. The prior-art move over-fired 0/3 on two successive fixtures
— a defect that came out of a real session which had not surfaced it,
so on that occasion the fixture caught what practical use missed.
`delegation-in-grant` ran 0/3 on its control with the forbidden
ceremony quoted verbatim in every rep. And four candidate edits were
removed by their controls (`b211ddf`); under a usage-only standard all
four would be in the skill today.

The owner's position, which decided the shape: the harness is useful
as a canary but cannot be made reliable enough to carry meaning;
practical application of the skill is what should drive whether a
change is necessary; and the budget for real-case regression testing
is limited and not worth expanding. The discriminating fact for the
remaining risk — that usage-only evidence only ever exercises the
paths its one user walks — is that other users are expected, but few.
That bounds the exposure rather than removing it, which is why it is a
tripwire below instead of an objection here.

**Losing arguments and where the winner absorbs them:**

- *"Keep the harness as the gate; Class A's defects argue for
  repairing the instrument, not demoting it."* Class A was repaired in
  the same change. What it does not repair is construct validity: a
  fixture built to tempt one named failure says little about a real
  discussion. Absorbed as question 2 — the harness still answers
  whether wording produces its behavior and whether something adjacent
  broke, which is a smoke test it is adequate for.
- *"Retire the harness entirely; only real sessions count."* Rejected
  on the prior-art over-firing case, where a fixture caught what a real
  session had not. Absorbed as the demotion: it informs, it does not
  decide.
- *"A clean control still means the guidance answers a problem nobody
  has."* This was the standard until today and it is narrowed, not
  kept. It stands where usage never showed the problem either; it no
  longer stands on its own, because a low-validity fixture failing to
  reproduce a problem is weak evidence that the problem is not real.

**Supersedes**: the veto half of the 2026-08-02 entry *an unreliable
control writes the rule*. That entry's qualification survives intact —
an unreliable control writes the rule, and the pass rate is recorded
beside it. What changes is the other direction: a clean control no
longer removes a rule by itself. This also discharges the review's E4,
which reported the head and that entry contradicting each other over a
rule kept despite a 3/3 control. Under this standard no exception is
needed: that was the standard behaving correctly.

**Tripwires**: a user other than the owner reports a skill behavior no
session here ever produced, meaning usage-only necessity has started
missing paths; a `full` run whose failures are mostly fixture bugs
rather than skill regressions, meaning the canary rotted between runs;
skill text grows by several rules over a revision with no observed
behavior change attributable to any of them, meaning the demoted veto
has stopped filtering anything.

**Also decided: literature is non-binding.** Raised as a gap in this
entry's first draft, which had no slot for the review's 20 literature
findings, and settled the other way from the proposed extension: the
literature mapping is post-hoc relation to published work, not a
source of necessity. The initial grounding was an observation that a
body of published work had converged on a shape close to one that
emerged from practice — interesting, and never the driver. A
contradicted verdict goes on a watch list; it does not open an edit.
The blast radius of this ruling is small in practice, because the
review's two strongest literature findings each also have a
provable-by-reading leg: "giving arguments state produces an
unreadable graph" is an adjective closing a thread under the skill's
own Language rule, and "consolidating costs latency and nothing else"
fails the same rule's deletion test. Both survive the ruling on those
grounds alone. Where it does bite is `delegated`, whose keep-or-change
loses its literature leg and now rests on the under-specification
observed in use.

**Also decided:** the review's Class A is discharged, 12 of 12 —
including two findings whose prescriptions were wrong. `A8`'s
prescribed `isolation: 'worktree'` is inert for the grounded probe,
because the prompts carry absolute paths into the main working tree
and the agent reads and writes through those regardless; the violation
is made detectable instead, by a `git status` check over the vendored
trees, which are committed and touched by nothing else. `A4`'s fixture
was retargeted rather than deleted: the scenario setup was sound and
only its rubric encoded the rejected endorsement-keyed rule, so it
became `self-refuting-proposal`, covering the previously untested
reversal clause of loop step 4. `reps` defaults to 3, because a single
rep is known to flap and the harness's own split-rate reporting says
nothing at one rep.

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

The skill's frontmatter description drops its account of how smaller
models fail and states the requirement instead: "Requires a
frontier-tier model (Opus-class or stronger)." The removed sentence
stated no triggering condition, and the description's contract is
triggering conditions only. No probe covers this edit — the harness
loads the skill by path and never exercises triggering — so its
verification is the inspection that every trigger condition is
unchanged.

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

### 2026-08-02 — length is not the binding constraint on skill text

**Verdict: change.** Skill text carries no size budget. An edit is
judged on whether it changes behavior, which the editing discipline
already governs; the separate rule-budget criterion is retired.

**Mechanism**: a size bound was standing in for attention dilution,
and it measures the wrong thing — a short skill full of inert rules
dilutes attention exactly as much as a long one full of binding ones.

**Evidence at decision time**: two sessions with the 423-line 0.3.0
skill active held its machinery across many rounds without drift —
this repository's own revision discussion, and the geargame session
that also conducted a prior-art survey across roughly ten user
interface libraries and game engines in the same discussion. Both
sustained the thread ledger, the closure rules and the delta format
throughout. The skill-revision spec's seven pending edits take the
file to roughly 478 lines.

**Losing arguments and where the winner absorbs them:**

- *"Every added rule dilutes attention."* True, and unaddressed by a
  line count. The absorption is per-edit: the control arm measures
  whether a specific wording binds, which is the dilution question
  asked where it can be answered.
- *"Accessibility to smaller models argues for brevity."* Void under
  the frontier-only non-goal above.

**Tripwires**: an edit that lands correctly in isolation while a
previously-passing rubric item regresses with no textual conflict
between them — that is attention dilution becoming observable, and it
reopens the question of a size bound. Evidence bounding the limit from
above at any concrete length would also reopen it: the two sessions
show 423 lines is below the limit, not where the limit is.

### 2026-08-02 — no durable state artifact for the thread ledger

**Verdict: keep.** The thread ledger stays in the discussion. The
skill writes no state file, no per-thread schema, and ships no script
to validate one. A delta log is parked with a tripwire; the three
larger forms are rejected.

**Mechanism**: the failure a state artifact prevents — losing the
ledger to compaction or to a session boundary — does not occur in this
skill's usage, which starts a discussion rather than resuming one; and
the artifact's cost is paid every round, in the discussion the skill
exists to protect.

**Evidence at decision time.** A conducted-run failure (assumed
closing facts not swept at convergence) was first read as evidence for
an artifact. It was not: the thread STATES were correct in every run,
and correcting a mis-specified rubric item removed the failure
entirely. What remained was a bucketing gap, fixed in the skill text.

A prior-art survey then produced three findings that argue against
building. **The reliable tier is code-written**: across OpenHands,
LangGraph, aider, Letta and Manus, append-only logs are produced by
code, while every system that lets a MODEL overwrite state caps it
hard (Letta's memory blocks default to 2000 characters). A
model-written, uncapped ledger has no precedent. **Manus argues the
opposite of its reputation**: its leaked system prompt shows
code-generated plan events in an event stream, with the written rule
"Task planning takes precedence over todo.md" — the model-maintained
checklist is subordinate. **Vendors name their model-written tiers as
the unreliable ones**: Cascade's documentation tells users to prefer
rules files "for knowledge you want Cascade to reliably reuse rather
than relying on auto-generated Memories"; LangChain documents that a
maintained profile "can become error-prone as the profile gets
larger", and that maintaining it in the hot path forces the agent to
"multitask between memory creation and its other responsibilities,
potentially affecting the quantity and quality of memories created".

Failure evidence is not scarce once looked for. Superpowers' own
tracker carries a ledger read across plan boundaries that "makes a
second run skip the new plan's tasks — an execution bug, not just
stale files" (#1936); silent clobbering of artifacts that "carry no
identity marker, so a subagent dispatched against a clobbered brief
implements the wrong plan's task and has no way to notice" (#2012,
#2045); and a model that simply never updates the artifact (#1075).
Anthropic describes the same shape of failure: "a later agent instance
would look around, see that progress had been made, and declare the
job done." And the STALE benchmark puts a ceiling of 55.2% on a
model's ability to recognize that its own memory has become invalid —
which is the capability our version would depend on.

The strongest evidence FOR an artifact also undercuts our version of
it. The superpowers plan-scoped-workspace eval found 25 of 25
controllers refused to trust a stale ledger — the hypothesized failure
did not reproduce — and that agents reject even truthful ledgers that
fail to corroborate against ground truth. That ledger corroborates
against git; a thread ledger's only corroborant is the conversation,
which is exactly what compaction removes.

**Losing arguments and where the winner absorbs them:**

- *"A file makes the convergence sweep mechanical."* The sweep was not
  the problem: states were tracked correctly throughout. The bucketing
  gap it pointed at is absorbed by the checkpoint assembly rule, which
  now names the criteria table.
- *"Recitation keeps the ledger in attention."* Manus's stated reason
  for rewriting `todo.md`. Already delivered by the checkpoint
  display, in context, at three defined moments — at no storage cost.
- *"Cross-session resumption needs it."* Real in principle, absent in
  this skill's usage. Left as `resumption-honesty`: the skill's third
  checkpoint moment assumes deltas a fresh session does not have, so
  either that clause is unexercised or it cannot be complied with.
  Recorded as a candidate for the next revision, not fixed here.
- *"A script could validate the artifact."* Rejected because there is
  no artifact to validate — NOT because validation is unprecedented.
  An earlier draft of this entry claimed no precedent existed; that
  was wrong and is corrected here. `fockus/skill-memory-bank` ships 15
  deterministic drift checkers, a 30-day staleness threshold, and a
  hash chain over its `progress.md` that flags "append-only violation
  — historic entry edited, deleted, or ambiguous", hook-wired. The
  generalizable lesson, if the tripwire ever fires: what you can
  validate is whatever has an enumerable contract, and identity or
  integrity markers are what make corruption DETECTABLE — in
  superpowers' own bug history the only artifact carrying a
  self-identifying line was the only one whose collisions could be
  caught.

**Tripwires**: a real discussion loses its ledger to compaction and
the assistant cannot reconstruct it; or a cross-session resumption
produces a checkpoint a participant contests as wrong. Either fires
and the shape is already designed — append-only, identity first line,
git-ignored per-discussion scratch, deleted at harvest.

### 2026-08-02 — skill revision from the geargame field report

**Verdict: change.** Five edits land in `SKILL.md`; four candidate
edits were rejected or reverted on their own control arms. The file
goes from 423 to 486 lines. (An earlier draft of this entry said four
and then listed five; the count was wrong, not the list.)

**Mechanism**: a rule earns its place only where a control arm — the
skill without that wording, on a scenario built to tempt the failure —
shows the behavior does not reproduce on its own.

**What landed, with the numbers.**

- **Delta and checkpoint format** (field findings F1, F2, F4). The
  delta gains a fourth *note* column carrying relations between
  threads, material findings pending on a closed thread, retracted
  assertions, and closure conditions; criteria move to their own
  table. The checkpoint's assembly rule learns the criteria bucket.
  Control: `interpretation-trap` items 5-6 fail, `assumed-convergence`
  item 8 fails in all five conducted runs and 0/2 against clean 0.3.0
  text. With: 2/2 and 2/2.
- **`delegated`** (F5), a closed state for a thread whose judgement
  the user handed over under named constraints, with the grant
  boundary deciding whether a later finding is the assistant's to act
  on or returns through the material-findings protocol. Control:
  `delegation-in-grant` 0/3, the forbidden ceremony verbatim in every
  rep ("Unless you say otherwise, I proceed with the repair below";
  "your word is what reopens it"). With: 2/2. Note the halves differ:
  `delegation-out-of-grant` passed items 1-7 3/3 on the control, so
  the out-of-grant text is a boundary on the new rule, not a new
  behavior.
- **The round is the unit, not the arrival** (F7): parallel
  evidence bearing on the same threads reports as one round, with an
  explicit statement that this is not a licence for shorter turns.
  No control arm; the field report's evidence is unambiguous.
  Verified by `parallel-burst`.
- **Prior-art survey as a proposed move** (F6), bounded to problem
  classes where other projects shipped inspectable mechanisms. The
  bound was found in testing, not in the discussion: the first wording
  over-fired 0/3 on two successive fixtures, offering surveys of dbt,
  Cube, LookML, Kimball and the DAU/MAU literature for a question
  about one company's own two definitions. Bounded: 3/3 both arms,
  confirmed five times.
- **A verdict is not a decision** (the report's grounding note): a
  record carrying a verdict but no ruling grounds a discussion without
  settling it. Its control passed 3/3 and the user kept it anyway,
  which was their call to make. It is bounded against decision
  records — unbounded it would have told an agent to argue against
  this ledger at every grounding step. `verdict-grounding-decided`
  exists to hold that bound and passes 3/3.

**What did not land, and why.**

- **Material findings keyed on endorsement** (F3). Control 3/3, and
  the transcripts showed why the rule was wrong rather than merely
  redundant: the skill already routes an endorsed but OPEN thread
  through free movement between open states, which is cheaper than
  the closed-thread protocol this would have imposed.
- **Naming assumed closing facts at convergence** (F8). Landed, then
  reverted. Its supporting number came from a rubric item demanding
  two of four facts chosen in advance, which assumes a design shape
  the assistant may not build. Against the corrected item — the facts
  the built design actually depends on — clean 0.3.0 text passes 2/2.
- **A sweep clause for that rule.** Landed, then reverted with it.
- **`edges-as-threads`** and leaving relations in prose: both lost to
  the note column; the unreadable-graph reason is recorded in
  `3bec85b`.

**Two results nobody designed for.** Against clean 0.3.0 text, one rep
proposed convergence with "no checkpoint table at all" (item 4, 1/2)
and one invented `open` and the compound `approved, amended` as states
(item 7, 1/2). Both are clean under the edited text. The plausible
mechanism — a better-specified checkpoint format makes agents likelier
to produce the checkpoint, and pinned columns leave less room to
improvise a state cell — is a hypothesis from two reps, not a finding.

**Losing arguments and where the winner absorbs them:**

- *"The failures are the agent losing track of threads."* Half right,
  and the half that held pointed at bucketing, not tracking: states
  were correct in every run. Absorbed by the assembly rule's criteria
  bucket. The other half became the state-artifact question, decided
  separately above.
- *"Skill text should stay short."* Retired as a criterion (entry
  above): a line count stands in for attention dilution and measures
  the wrong thing.
- *"A failing fixture means the rule is wrong."* Twice it meant the
  fixture was wrong, and twice acting on that reading was tested: once
  refuted by a re-run, once confirmed. Fixture bugs and rule bugs are
  distinguishable only by re-running, which is why both were re-run.

**Tripwires**: an edit lands correctly while a previously passing
rubric item regresses with no textual conflict; `delegated` appears in
a real session recorded as `approved` anyway; a prior-art survey is
proposed for a problem whose answer turns on facts private to the
project.

**Also decided, and carried forward** (the spec that held these is
deleted in this change):

- **Parked — `criteria-axis`**: proposals scored against every live
  criterion at convergence. Tripwire: a checkpoint where an unstated
  relation between a proposal and a live criterion changed a decision.
  Re-entry: the next revision review.
- **Parked — `prior-art-skill`**: the survey methodology as a second
  plugin skill. Tripwire: live testing shows the methodology needs
  constraining, or agents need guidance to run a usable survey.
  Re-entry: after the prior-art move has fired in real sessions.
- **Open — `resumption-honesty`**: the skill's third checkpoint moment
  is "when resuming a discussion across sessions", but a checkpoint is
  assembled by sweeping prior deltas, which a fresh session does not
  have. Either that clause is unexercised or it cannot be complied
  with. Not fixed here; it wants a real resumption to have happened
  first.
- **Observations for a future report**, seen in testing and not acted
  on: states outside the enum appeared three times across roughly a
  dozen conducted rounds (`blocked`, `open`, `approved, amended`); and
  one otherwise well-grounded reply fabricated a citation, claiming a
  README taught an idiom that the file's own text contradicts.

**Coverage limit, stated plainly**: the last full-suite run (17 of 19,
both failures since traced to rubric bugs and fixed) was against text
that predates the criteria clause and this reversion. The criteria
clause was verified separately at 2/2. The reversion is unverified by
choice — the decision was to let real use answer whether the reverted
rules are missed.
