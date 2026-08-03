# designing-together — decisions

The argued record of this repository's decisions: why the skill is
shaped as it is, how it may be edited, how it is tested, and how it is
released. `CLAUDE.md` states the operational rules; when a rule needs
its justification, it points here instead of retelling the argument.
The README describes what the skill does for the people who install
it — a different audience, and outside this file's scope.

Territory is separated by head section, not by file. Each section
carries its own dated entries. Open items — live tripwires, parked
predictions, unresolved findings — are not here; they are current
state, and they live in `docs/open-items.md`.


## How the decision record is kept

A write-once document describing a moving system decays; a head that
every decision rewrites cannot. This file has two parts, and they are
interleaved rather than stacked: each section is a present-tense head
describing the current design as if it had always been so, followed by
the dated entries that argued it. When a decision lands, the head is
rewritten and its entry appended to that section, in the same change.

An entry is a `**Decided <date>**` paragraph of two to five lines —
what changed, and the discriminating fact that decided it — followed
by one `*Rejected: <alternative>* — <why it lost>` bullet per losing
alternative. Nothing else. The verdict and the mechanism are not
restated, because the head directly above states them in the present
tense. The evidence narrative is not kept: the commit and, where there
was one, the deleted field report hold it, and both stay in git.

Tripwires are not recorded here. A tripwire is open state, so it lives
in `docs/open-items.md` by presence: an entry leaves that file in the
change that fires or voids it.

A *Rejected* bullet is read later by the skill's Reopening rule, which
decides whether a re-proposed idea is new or already argued-and-lost.
That is the one thing an entry must carry precisely, and it is why the
form has room for the reason and not for the story.

**Decided 2026-08-02** — A single `docs/decisions.md` in the two-part
shape, a present-tense head plus dated append-only entries, becomes this
repository's decision home; `CLAUDE.md` keeps the operational rules and
points here for justification. One design session re-derived two
policies from scratch — the model-tier policy and the regression
harness's survey scope — because both had been decided in conversation
and recorded nowhere. The shape is ported from the origin project, not
designed here. `docs/field-reports/` moves under `docs/`; the README and
its literature section stay outside this file, on the audience test the
skill's own Language section uses.

- *Rejected: `CLAUDE.md` is already the decision home* — it is the
  operational home, and the two roles have different growth curves: only
  the rule set has a size bound. `CLAUDE.md` keeps every rule an agent
  must follow and gains pointers instead of paragraphs.
- *Rejected: multiple ledgers, as in the origin project* — rejected on
  size: that project runs three doc families over dozens of systems. One
  file with head sections carries this repository's territory; splitting
  is a later decision if a tripwire fires.
- *Rejected: set the ledger up after the skill fixes* — the session had
  roughly twenty decided threads and no home, so the fixes would have
  recorded their rationale into commit messages and then had to move it.
  Landing the ledger first also let the entry format be designed
  alongside the change to what the thread table serializes into.

**Decided 2026-08-04** — The six-slot entry format is replaced by the
origin project's form: a `**Decided <date>**` paragraph plus one
`*Rejected:*` bullet per losing alternative, filed under the head
section it argues rather than in one flat chronological tail. All 27
existing entries were rewritten to it in this change, and their
tripwires moved to `docs/open-items.md`. The discriminating
measurement: of 1918 ledger lines, Verdict, Mechanism and
Evidence-at-decision-time together were 1003 — 52 percent of the
record was form-filling, because the format was the skill's
keep-or-change verdict record applied unconditionally to decisions
that diagnosed no incumbent design. The file went from 2355 lines to
1422, with 364 more in `docs/open-items.md`. The rewrite ran as 16
compression agents each followed by an independent fidelity checker;
the checkers found 82 omissions and a repair pass reinstated 74, the
other 8 being severity `minor`.

- *Rejected: keeping reviews and field reports durable with per-finding
  status tokens, as the origin project does* — it relocates unbounded
  growth into a search-polluting basket rather than removing it, which
  is the argument that project's own ephemeral-plans entry makes
  against archiving; its owner is making its reviews ephemeral for the
  same reason.
- *Rejected: rewriting entries lazily, as each decision next touches
  its section* — rewrite-on-touch does not fire, because attention is
  elsewhere when the rule is touched; the origin project made that
  error twice. The eager pass costs one session and is verifiable in
  one diff.
- *Rejected: splitting the record into per-territory files* — parked
  rather than ruled out. At 1422 lines the split buys nothing, and
  roughly half the entries argue skill content, so a two-way split
  would leave one file near 1000 lines. Its tripwire and re-entry point
  are in `docs/open-items.md`.
- *Rejected: keeping tripwires inside entries* — an entry is
  append-only, so a tripwire recorded in one can never be removed when
  it fires, and 59 mentions of the word across the record gave no way
  to list the ones still watching.

## The referencing rule

Point at a head section for *what* and *how* — heads are current
reality, so a head reference stays true. Point at a section's dated
entry for *why*. Entries sit under the head they argue, so a citation
naming the section reaches both.

A decision that reverses an earlier one rewrites the head and appends
its entry under the same section, directly below the entry it defeats.
No list of superseded entries is maintained: the two are adjacent and
dated, and a reader arriving at either passes the other.

Never point at an ephemeral document: field reports and convergence
specs are deleted once harvested, so a reference to one dangles by
design.

Most of the skill predates this record and no entry argues it. The gap
is not enumerated: it changes with every revision, and a list reads as
a claim that everything unlisted IS argued, which is how the previous
enumeration came to be wrong in both directions at once. Sections are
back-filled when a decision touches them, not on a schedule.

**Decided 2026-08-03** — the referencing rule now states that a head is
the authority for what holds now and a dated entry only for the argument
as it stood on its date, and it carries a **Superseded entries** list; a
decision that reverses an earlier one adds the reversed entry there as
well as saying so in its own entry. Two live instances decided it: the
`delegated` KEEP verdict reversed the same day still read as current,
and the no-state-artifact entry's second tripwire was retired by the
ledger entry and marked only there. The same change back-filled two
heads — *Criteria are not threads* and *What comes back after a
decision* — both written while the arguments were fresh, neither adding
an argument, and the entries remain the authority for why; and it
restated the declared-gap sentence generally.

- *Rejected: editing a defeated entry in place instead of listing it* —
  Append-only is the property that makes a citation to an entry safe at
  all. The list costs two lines per reversal and leaves the original
  argument intact.
- *Rejected: keeping the enumerated list of sections the referencing
  rule cannot be followed for* — the five-section list was wrong in both
  directions — the state enum had since been argued, and the unargued
  set was much larger — and an enumeration reads as a claim that
  everything unlisted is argued.
- *Rejected: back-filling heads for the rules that predate this record*
  — Dropped, not parked. Ten or more sections of rationale for no
  behavioral change; the record back-fills a section when a decision
  touches it, not on a schedule. Applying the scaffold head, this is
  display and not outcome.
- *Rejected: recording what review identifiers E5, E10, E11, E12, E13
  said, now that `docs/reviews/` is deleted* — parked rather than done:
  they are cited for traceability only, and no decision changes for want
  of them.

**Decided 2026-08-03** — the document-coherence axis was re-run against
the current documents and returned eleven findings: six stale-text
fixes, four decisions, two needing no action. `docs/reviews/` is
declared ephemeral evidence, identical in kind to a field report, and
the 2026-08-03 review file is deleted in this change; the referencing
rule gains the consequence that an entry may cite a finding identifier
for traceability but never as the carrier of the argument, and now
states outright that most of the skill predates this record. Maintainer
prose says "decision record" where it said "ledger", and the frontmatter
contract is amended to permit one capability gate. Three review axes are
added — scope and conciseness, bounded to inert text with every finding
naming what changes behaviorally if the text is deleted; revision
interaction, diff-scoped, which exists because in this revision the
grant-boundary edit routed more findings into a default that a later
edit had to repair and the two were connected by hand rather than by
process; and expectation conformance folded into the first. The harness
now warns when `only` names a scenario the selected mode does not carry.

- *Rejected: letting a size budget arrive through the
  scope-and-conciseness axis* — A size budget arriving through that axis
  would reinstate the criterion the 2026-08-02 entry retired, so the
  axis is bounded to hunt inert text and never length, and every finding
  must name what changes behaviorally if the text is deleted.
- *Rejected: triaging the earlier review's coherence findings instead of
  re-running the axis* — all four documents had been rewritten
  continuously since that review was written, so its findings no longer
  described the text.
- *Rejected: back-filling entries for the parts of the skill that
  predate this record* — out of proportion to the gain. The referencing
  rule states the gap instead — the loop's steps, the state enum, the
  premortem, the record step, *When NOT to use* — which stops the gap
  being rediscovered as a finding at every review. Sections are
  back-filled when a decision touches them.
- *Rejected: changing the skill's use of the word "ledger"* — the
  skill's term is the one that ships. Maintainer prose moved instead, so
  the skill did not move.
- *Rejected: deleting the frontmatter's "Requires a frontier-tier model"
  sentence, as the 2026-08-02 contract required* — A model below the bar
  produces the format without the discipline, and the description is the
  only place an installer sees that before running it. The contract was
  amended to allow one capability gate rather than the sentence deleted.
- *Rejected: the six-triggers entry's prescribed verification run,
  `only: ['prior-art-fires','prior-art-holds']` at `reps: 3`* — `only`
  filters the MODE's lists and `prior-art-fires` is in the full list
  alone, so the run would have executed the holds arm by itself — green
  from the arm that cannot detect the regression that loosening the gate
  risks. It needs `mode: 'full'`.
- *Rejected: writing the seventeen missing fixtures the earlier review
  ranked (Class F)* — under the evidence standard adopted the same day a
  fixture originates no edit and the suite is a canary, so a missing
  fixture is a gap in a canary rather than an untested rule. The bulk
  are not written; three rules are recorded as untestable by this
  harness instead — the no-selection-dialogs rule (a probe agent has no
  tools to emit one), After-convergence recording (it needs a
  spec-to-implementation boundary the harness does not span), and
  frontmatter triggering (the harness loads the skill by path and never
  exercises the description).
- *Rejected: A separate review agent for expectation conformance* —
  Folded into the scope-and-conciseness axis, since both ask whether a
  rule should be removed.

**Decided 2026-08-04** — Citations from `CLAUDE.md` and the README
name the head section instead of an entry's date and title; nine were
retargeted in this change. Entries sit under the head they argue, so a
reference to the section reaches both, and the *Superseded entries*
list is deleted.

- *Rejected: keeping entry text append-only* — append-only was argued
  as the property that makes a citation to an entry safe, but a
  citation names a path and a title, so a retitle already broke one.
  The head section is the stable target the rule always claimed to
  have.
- *Rejected: keeping the Superseded entries list* — a reversal now sits
  directly below the entry it defeats, in the same section, so a reader
  arriving at either passes the other. The list was hand-annotation,
  which is the maintenance that silently stops happening.
- *Rejected: a thin dated index over the entries, to preserve
  chronology* — `git log` already provides it, and the
  commit-as-work-completes rule guarantees a commit per decision, so
  the index would restate what the history already answers.

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

**Decided 2026-08-03** — the skill structures how a discussion is
conducted and never what may be proposed. Recorded after the fact
because it is the founding intent and had never been written down, which
left the edits that erode it with no standard to be judged against.
Review finding C17 named three rules that each demand a manufactured
counter-position — the nearest-rival test, the single-live-thread fork,
and the requirement to test the user's proposal; the fork has since been
narrowed to apply only while a rival stands, and the other two are now
judged against this entry.

- *Rejected: Structure the content too, so discussions are reproducible*
  — Reproducibility bought by a solution quota is reproducibility of
  fabrication: asked for two or three options, a discussion produces two
  or three, fabricating the ones a real problem does not have, which is
  the failure of the narrowing elicitation mode this skill displaced.
  The flow is instead heavily structured — states, deltas, checkpoints,
  closure rules — so a discussion is auditable without its content being
  prescribed.

## The structure is a scaffold, and the outcome is what is guarded

The skill's purpose is to nudge reflection, investigation,
argumentation and innovation. The thread and state machinery is not
the purpose: it exists so the user can keep track when an assistant
produces a lot of content at once. A discussion that reaches a
well-argued outcome with an imperfect table has worked.

So a small deviation from the structure is acceptable, and a finding
that names one is not automatically a defect. The test for whether a
finding is worth text:

**Does it corrupt the OUTCOME — what gets recorded, what gets built,
or what the user believes was decided? Or does it only make an
intermediate display imperfect?**

The first is guarded. The second is not, up to a reasonable point:
agent behavior is not deterministic and no wording covers every case,
so an edit that buys display fidelity at the cost of more rules is a
bad trade. A misfire or a miscomprehension AT THE END — a design
recorded as agreed that was not, a criterion silently waived, a
closure the user never gave — is the failure worth spending rules on.

This is the head to reach for when a review produces more findings
than are worth acting on, which is the normal case
(the *Criteria are not threads* section below).

**Decided 2026-08-03** — two rules that left no compliant move were
repaired. A positive word given against a displayed checkpoint table is
the batch confirmation and closes every thread in the table at once;
away from a displayed table, a blanket positive still closes nothing.
The resolution was taken from the README's expectation set, approved
earlier the same day, which already promised users that behavior — the
first case of the expectation set deciding an open question rather than
excluding one. Second, the material-findings default no longer says
"proceed" where proceeding is incoherent or irreversible. Incoherent:
the protocol's own trigger list includes an infeasibility, so the
assistant would state that something cannot be built and build it in the
same turn, and the grant boundary decided hours earlier routes every
infeasibility inside a delegation into this protocol. Irreversible:
Decision authority reasons about migrations, published interfaces and
stored data three paragraphs below the protocol, and the protocol told
the assistant to proceed unilaterally on any of them while a finding was
pending — those three are the reversal inventory the hold now covers.

- *Rejected: "Nothing bounds the breadth of a recorded reason, so a
  broad `ruled-out` entry can be cited to decline findings forever."* —
  Rests on a misreading of the bound. The Reopening rule's test is not
  topical overlap but whether a recorded reason covers the
  discriminating fact — "if no recorded reason covers the discriminating
  fact, the finding is new" — which a broad reason that does not address
  the fact fails already.
- *Rejected: "`withdrawn` is agent-owned closure with an agent-authored
  justification and no external check, so an agent under social pressure
  can retire its own strongest proposal."* — parked rather than
  rejected: a behavioral prediction with no observed instance —
  sycophancy executed through a state the skill provides — which under
  the triage criterion parks. The closure is also not unchecked: the
  rule requires the defeating reason on the record, and the record is
  contestable.

## The Language section, and its jurisdiction

The skill carries a Language section, and by its own jurisdiction
clause it governs the skill's text as well. Two rules do the work. No
idioms and no aphorisms: readers include people whose first language
is not English, for whom an idiom is a lookup rather than a reading,
and an aphorism carries a qualitative judgement past argument
unexamined. And a qualitative claim may open a thread, never close
one: an adjective offered as a justification cannot be contested,
because there is nothing in it to be right or wrong about.

Jurisdiction is decided by who consumes the text, not by where it is
stored. Working prose — the discussion, decision records, specs,
commit messages, code comments, and the skill itself — is governed.
Text consumed by a product's end users follows that product's own
style contract.

**Decided 2026-08-03** — the skill text is edited to satisfy its own
Language section: nine named idioms removed from operative instructions
("turn on", "on the spot" twice, "the boundary runs both ways", "in the
flow of", "with both in view", "built to lose", the unexplained "/" in
an excuse row, and the section title "Red flags", now "Stop and reopen
the exchange"); five qualitative claims doing closing work replaced by
the named failure each prevents, the sharpest being "cost always favors
the incumbent", an unfalsifiable absolute sitting four bullets above
"Verdicts must be falsifiable"; "load-bearing" defined at both sites,
one of them four lines after the Language section bans undefined
metaphors; the fifty-word sentence demanding short sentences split into
three; and the stale-presumption trigger given a count — two rounds
without the user's arguments depending on it. One factual error fixed
alongside them: the skill claimed "exactly three declared cases" of
closure by the assistant, but `superseded` requires a proposal the user
approves by name, so there are two. Seven passages are preserved
deliberately, the same axis having named them as what a revision would
most easily damage: the tripwire definition, the parked thread's
completeness test, "each appears exactly once", "Material findings come
back exactly once", "The deciding test is who consumes the text, not
where it is stored", the keep-or-change verdict slots, and the
no-selection-dialogs rule.

- *Rejected: keeping "giving arguments state produces an unreadable
  graph" as the reason defeating `edges-as-threads`* — an adjective
  closing a thread, flagged independently by three review axes; replaced
  by the structural reason rather than reworded — an argument bears on
  several threads at once, so a state per argument needs a many-to-many
  relation a delta row cannot show, and the note column already carries
  the relations that must be visible.
- *Rejected: the review's split of these findings between "fix" and
  "probe"* — void under the evidence standard adopted the same day: a
  document contradicting its own rule is provable by reading, and
  internal consistency is always in scope.
- *Rejected: removing "a blanket positive" as a qualitative phrase* — it
  functions as a defined term in the closure rule; kept and given
  examples instead.
- *Rejected: the review's count of roughly sixteen idioms* — only the
  nine named above were actually listed by the review; the remaining
  seven are not invented to match the count.
- *Rejected: the review's five one-sentence compressions misplaced as
  body prose* — two are already in the prescribed form — a bolded
  summary line followed immediately by its restatement — and one had
  been replaced earlier the same day; the one genuine violation was "a
  manufactured objection is the strawman pattern in reverse", which also
  required the reader to know a named pattern and invert it.

**Decided 2026-08-03** — the Language section is kept and its
justification recorded after the fact: plain technical English, no
idioms or aphorisms, jurisdiction decided by who consumes the text, and
a qualitative claim may open a thread but never close one, checked by
the deletion test — remove the sentence and see whether the argument
still stands. No idioms or aphorisms for two reasons, the second
carrying the load the rule actually bears: readers include people whose
first language is not English, for whom an idiom is a lookup rather than
a meaning; and an idiom smuggles a qualitative judgement past argument
without stating it — the same failure the rigor rule addresses, arriving
through vocabulary instead of through claims. A qualitative claim cannot
close a thread because an adjective offered as a justification cannot be
contested — there is nothing in it to be right or wrong about, so it
ends the exchange while looking like it advanced it; opening a thread is
the legitimate use — "the app should feel responsive" is a real goal —
and the conversion to an observable is what makes it arguable. The
section was the authority for a review axis, for the literature
standard's carve-out, and for a cluster of edits landed the same day,
while its only recorded support was a README literature bullet — and
this repository had already decided literature does not govern the
skill, so its authority rested on nothing inside the record.

- *Rejected: the Language section is a style preference, and style
  preferences do not belong in a skill* — the failure it names is
  specific and checkable — a thread closed on a claim neither party can
  test — not a matter of taste, and the deletion test fires only on
  claims doing closing work, leaving prose style alone.
- *Rejected: applying the Language rule to the skill document itself is
  pedantry* — the jurisdiction clause names the document, and the audit
  found the violations concentrated in the Overview, the Language
  section and the stop-signal list — the parts an assistant reads first
  and imitates — while the parts it merely executes were the cleanest
  prose in the file. A rule the document visibly breaks is a weakened
  rule, and it was being weakened exactly where it mattered most.
- *Rejected: deciding jurisdiction by where the text is stored rather
  than by who reads it* — it gives the wrong answer for a code comment
  in a file that also holds user strings; working prose and product copy
  have different contracts, and product copy may pursue literary value
  deliberately.

## Rule triggers are written as tests

A rule states a trigger a reader can evaluate against a specific
situation and get a yes or a no from. A trigger that cannot fire, or
that fires on the wrong object, is a defect provable by reading, and
it is repaired without waiting for a session to exhibit it. This is
the class of finding a review alone can originate.

**Decided 2026-08-03** — six rule triggers were rewritten to state a
test rather than describe the case they were about. The cheap path now
requires an inventory naming source files and nothing else, and
escalates a decided thread only if it would have to be reopened; the
prior-art gate asks for a problem class and one place the answer is
expected to exist; consolidation yields to the material-findings
protocol; "comes back exactly once" is scoped per finding; the
qualitative-claims rule governs arguments and never rulings; and the
tracking-failure test is the missing delta. Only the prior-art gate has
measured over-firing behind it — 0/3 on two successive fixtures — so
loosening it is the one change flagged for a harness run (`only:
['prior-art-fires','prior-art-holds']`, `reps: 3`, frozen skill copy).
None of the six was verified before landing, which the canary-not-gate
standard permits. One prediction, `party-neutral-stall`, was parked
rather than written: the stall definition is party-neutral by design,
that party-neutrality being the symmetry claim itself, and a user
repeating themselves satisfying it is predicted harm, not observed.

- *Rejected: the cheap path's original wording: a five-noun inventory,
  escalation on three nouns, exempting "decided threads that read this
  one"* — broken in both directions at once — stored data and
  user-visible behavior were inventoried and never escalated, while
  "migration" escalated without being in the inventory; and the
  exemption matched nearly everything inside a discussion, so it was
  unreachable.
- *Rejected: the prior-art gate as "if you cannot name a project that
  faced this same question and say what it built, do not propose the
  survey"* — requires knowing the answer in order to ask the question,
  and forbids the case that motivates surveying. The bound's real work
  was done by the private-facts exclusion, which is kept: the dbt and
  Cube over-firings turned on the project's own two conflicting
  definitions, not on nobody having shipped metric tooling.
- *Rejected: rewording "consolidating costs latency and nothing else"
  instead of replacing it* — the claim is false when the first of three
  parallel investigations returns an infeasibility that invalidates what
  the others test, which the material-findings protocol says to present
  at the top of the turn — so consolidating costs the finding its
  position, not only latency. The same day's work made an infeasibility
  stop the turn; an absolute claim that is wrong is replaced by the
  operative rule, not softened.
- *Rejected: reading "comes back exactly once" per thread* — per thread
  it suppresses a second genuinely different finding; unscoped per
  finding it licenses four interventions on one closed thread. Both
  readings complied, so once is stated as per finding, and repeating the
  same finding is the stall.
- *Rejected: reading the qualitative-claims rule as covering the user's
  own rulings* — collides with Decision authority — the user's word
  closes a thread and needs no justification. Restricting the rule to
  arguments also dissolves the reported taste-domain problem: a taste
  question closes on the user's word, so the absence of an observable
  does not trap the thread.
- *Rejected: the tracking-failure trigger "a round that exchanged
  proposals but changed no thread state"* — minting a thread is itself a
  state change, so a round containing a proposal always changed state
  and the rule could never fire; the delta is the artifact whose absence
  the rule was written to catch.
- *Rejected: c14: add a skill rule instructing the assistant to teach
  the user the vocabulary* — rejected as a skill edit and answered by
  documentation, as the expectation set predicted for this finding. The
  README already teaches `presumed-settled` and what the batch
  confirmation closes; the missing piece — that reopening is a right the
  user holds — is one added README clause, and no rule.

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

**Decided 2026-08-03** — the `delegated` state, the grant mechanics, and
every mention of delegation leave the skill, reversing the keep verdict
recorded earlier the same day. Five of the revision's eight blocking
findings landed on this one mechanism, each provable by reading: the
grant routed every in-grant finding away from the irreversibility hold,
so a correction whose own action is irreversible could run with no word
from the owner. The fixtures move in the same change —
`delegation-in-grant` and `delegation-out-of-grant` deleted, `delegated`
struck from six other rubrics, from the harness `STATES` array and from
both mode lists — and the literature watch list loses the two entries
that existed only to watch this state, with the README's preamble
corrected to match; its remaining count discrepancy is a separate
finding and is not repaired here. Left open for its own entry —
`self-confirming-observation`: a behavior produced because the rule was
already there satisfies the letter of the evidence standard's
"unprompted" test, so the observation arm is contaminated once text
ships. The repair the owner named is to make the observation against
text where the rule is absent, which the harness already supports
through `args.skill` and which the standard currently spends only on the
veto question. Provable by reading the standard, so admissible; it wants
its own entry and its own argument.

- *Rejected: a real session did produce the need for a delegation
  state* — regular use of 0.3.0, which has no such state, never
  produced the need. The one session that did is re-read by the owner
  as an approval of a shape they could not name, given under overload
  from parallel prior-art reports arriving separately — and the
  consolidation rule that landed in the same revision, that evidence
  from several parallel investigations is reported as one round,
  addresses that overload directly. Two rules were written for one
  mechanism and nothing connected them.
- *Rejected: `grant-note`: drop the state but keep the distinction,
  recording a grant as `approved` with a note that judgement was handed
  over* — preserved record fidelity at one sentence and had no
  behavioral surface, since notes carry no state and convergence ignores
  them. It lost to the owner's ruling that the skill should not name
  delegation as a supported move at all: a note still teaches the
  practice, and an assistant that reads such a note may infer a licence
  — that last step is a prediction rather than a provable defect, and is
  recorded as such. Marked `ruled-out` so the Reopening test can read
  it; record fidelity is the one cost removal concedes and is the thread
  to reopen if a tripwire fires.
- *Rejected: delegation to AI agents is unsound in the published work
  (Fügener et al. 2022 found human-to-AI delegation produced no
  benefit)* — rejected on the standard that published work does not open
  an edit. Already recorded as a losing argument once, re-raised here
  and rejected again on the same standard.
- *Rejected: A weaker model could invent a grant it was never given* —
  Rejected on the standard that "a smaller model would not follow this"
  argues neither for nor against any wording (2026-08-02, frontier-only
  is a non-goal).
- *Rejected: several individually-rejected arguments should re-weight in
  aggregate* — argued down and withdrawn by the owner. Inadmissibility
  is a filter rather than a low weight, and filters do not sum; if they
  did, the literature standard would be defeasible by volume, which is
  what it exists to prevent.

**Decided 2026-08-03** — superseded the same day by the entry deleting
`delegated`; read it for the argument as it stood. The `delegated` state
was kept, with a grant's boundary stated back when the grant is taken:
what is being treated as inside it, each named constraint in a checkable
form, and what would return anyway, with an infeasibility returning
whether or not a constraint was named. The state's own wording binds —
its control arm ran 0/3, quoting the forbidden ceremony verbatim in
every rep ("Unless you say otherwise, I proceed with the repair below").
The README's expectation on delegation notes that a grant naming its
constraints is worth more than a bare one.

- *Rejected: remove `delegated`, because Fügener et al. 2022 found
  human-to-AI delegation produced no benefit — subjects could not assess
  their own capabilities and delegated the wrong instances, with
  algorithm aversion explicitly ruled out* — lost on the literature
  standard recorded the same day — published work does not open an edit
  — and NOT on its merits, so the argument stays intact if that standard
  changes. A second reason not to treat it as decisive: the study
  delegates task instances for performance, while `delegated` records
  who weighed a decision. The mapping is not tight, and that reading is
  this session's, not the paper's.
- *Rejected: an unconstrained grant should return nothing at all* —
  Partly kept: judgement findings do stay inside the grant, which is
  what the user handed over. Infeasibility does not, because whether the
  decided thing can be built is not a judgement call.

## Criteria are not threads

A thread is a proposal or an open question, and it carries a state. A
criterion is what threads are judged against, and it carries none:
threads are judged against criteria, so a criterion that was itself a
thread would need criteria to judge it. Criteria are tracked in a
table of their own — criterion, kind, satisfaction line — and never
enter the ledger, so they have no bucket and no place in the
checkpoint's sweep over thread slugs. A criterion enters a delta when
its kind or its satisfaction line changed, having no state to change.

A criterion is binding or weighed. A binding criterion rules out any
proposal that fails it, and one left unmet blocks convergence: no word
waives it in place. The moves are to change the proposal, or for the
user to demote the criterion to weighed — a change to the criterion,
recorded as one. A weighed criterion makes failure a cost the user
rules on, and is the only kind whose satisfaction line may read
`unmet-and-accepted`. Were acceptance available to both, the two kinds
would differ only in the ceremony of accepting.

**Decided 2026-08-03** — Criteria stop carrying the proposal state enum
and instead carry a kind (binding or weighed) and a satisfaction line
naming which approved threads meet them; a criterion may also be derived
from the project's own recorded rules, binding as a stated presumption
until the user says otherwise, which is the machinery `presumed-settled`
uses and for the same reason. The material-findings default's two
exceptions are narrowed and given a termination, the cheap path's
calibration is replaced by four named escalators, and the README gains
the expectation that the user engages toward convergence. A fixture
change from here on lands in the same commit as the skill change it
tests: the parked-thread re-entry requirement landed this morning while
two fixtures kept scoring the old rule, and a full run passed them 3/3
meanwhile. The parked `criteria-axis` thread is delivered at its
recorded re-entry point, this revision review, with no new argument
required. The two default defects were observed rather than predicted:
`delegation-in-grant` had passed 2/2 when the state landed, then
produced the returning-once ceremony inside a grant in 2 of 3
repetitions, in a run otherwise 16 of 19 scenarios green at 3/3.

- *Rejected: revert the whole eight-edit closure cluster and re-land it
  as one designed unit* — the standing proposal, argued on the grounds
  that repairing entangled edits one at a time is what produced the
  damage. It lost to the new expectation that the user engages toward
  convergence, which removes the closure dead ends from scope and
  shrinks the entangled set to two edits, and two edits can be reasoned
  about together — the whole basis of the objection. The two survivors
  are repaired in one change.
- *Rejected: give criteria their own closed state meaning "the design
  satisfies this"* — A state is a fate, and satisfaction is a relation
  between a criterion and the approved set. A state could not name which
  approved threads meet the criterion, which is what matters at
  convergence. A satisfaction line was taken instead.
- *Rejected: give criteria numeric weights* — the Language rule would
  require the numbers to be checkable and they would be invented, the
  same defect the grant-conversion clause produces. Binding versus
  weighed carries the distinction with no fabricated precision.
- *Rejected: act on the review findings that convergence can never hold,
  that the no-rival thread is permanently unclosable, and that parked
  dissent traps the discussion* — all three are premised on a user who
  never speaks, and each is escapable by one word from a user who wants
  to converge. Under the scope test they describe behavior outside the
  expectation set. What survived is what a cooperative user cannot
  rescue because they would not know it was happening: an assistant
  holding work it should have proceeded with, an infeasibility branch
  firing outside its case, and a cheap path that escalates a help-string
  fix.
- *Rejected: let a blanket confirmation stand in for the user naming the
  criterion in `unmet-and-accepted`* — it becomes the rubber stamp the
  closure discipline exists to prevent; the user's word must name that
  criterion.
- *Rejected: keep routing the step-5 consolidation escape through the
  material-findings protocol* — that protocol's trigger is information
  arriving after a thread closed, and at step 5 nothing is closed, so
  its default ("I build the decided shape") named nothing and its stop
  branch would have suppressed the other investigations.

**Decided 2026-08-03** — A criterion is not a thread and never enters
the ledger; `unmet-and-accepted` is available to a weighed criterion
only, so a binding criterion must be demoted before it can be accepted
unmet, which repairs a conflict provable by reading: a binding criterion
rules out any proposal that fails it while `unmet-and-accepted` was
offered for any criterion, so acceptance and exclusion were both in
force with no stated precedence. A displayed checkpoint satisfies
`superseded`'s by-name requirement, and loop step 8 gains destinations
for `withdrawn` and `superseded`. Two review axes found the thread
defect independently by reading — a bucket is "the group of threads
sharing one state" while a criterion takes none of those states, so a
conformant criteria table made every criterion a checkpoint tracking
failure — and `assumed-convergence` rep 2 of the 2026-08-03 `full` run
rendered invented prose buckets, the second firing of out-of-enum states
after the 2026-08-02 observation. The scaffold head is written in the
same change, on the owner's observation that this project spends too
much time arguing details not strictly necessary for the skill to work,
in past sessions as well as this one; the outcome-versus-display test is
recorded so that class of finding is settled once rather than re-argued,
and about sixty review findings were dropped under it — most of the
over-application axis, the whole inert-text axis, the language axis
except one unconverted word in a test definition, and the per-site
record findings. The new fixture `binding-criterion-unmet` is the first
coverage of any criteria semantics — binding versus weighed, the
satisfaction line, the derived-criterion presumption — which convergence
is defined on and which had none; `withdrawal` is repaired, having typed
its subject as a criterion in state `in-discussion` and demanded
`withdrawn`, so it failed a transcript that correctly refused.

- *Rejected: the display-based mechanism first proposed for this entry:
  buckets are defined over states and criteria have none* — it names a
  symptom. The regress argument — threads are judged against criteria,
  so a criterion that is itself a thread would need criteria to judge it
  — explains the confusion around criteria and not only the rendering
  failure.
- *Rejected: `criteria-bucket-by-satisfaction`: keep criteria inside one
  display model by bucketing them on met / unmet-and-accepted / unmet* —
  It preserved a single checkpoint algorithm but required the bucket
  definition to become "grouped by whichever axis the object carries",
  and a criterion shown in a bucket beside proposals reads as a proposal
  again, which is the failure the split was made to remove. The owner
  added that fulfilment is naturally expressed on the thread side and
  that the reverse direction buys little; the note column keeps `serves
  #criterion`, and the criteria table keeps a satisfaction line only
  because a criterion no thread references is the dangerous case — a
  constraint everyone forgot, invisible under thread-side-only tracking
  and visibly `unmet` under this one.
- *Rejected: let `unmet-and-accepted` apply to a binding criterion and
  count it satisfied* — binding and weighed would then differ only in
  how much ceremony the acceptance takes, and the distinction would stop
  doing work at convergence. Demotion is also the more honest record: it
  says the user changed their mind about the constraint.
- *Rejected: repair the `withdrawal` fixture's instruction to address
  the thread under test, so it could detect a silent drop* — left
  standing and named so it is not rediscovered: it is a weak instrument
  rather than a wrong one, and repairing it changes the fixture's
  difficulty, which is its own decision.

## What comes back after a decision

The user's word ends the argument on a point. It does not end the duty
to verify what the choice entails, and information that arrives after
a thread closed returns exactly once — per finding rather than per
thread, at the top of the turn it appears in, with the decided shape
named as the standing default.

Material is answered by naming rather than by judging: the information
arrived after the closure, and the part of the closure it defeats can
be named — a reason the ruling gave, a premise it rested on, or a
criterion it claimed to meet. What cannot be named to defeat anything
is not material. A test whose discriminator is an adjective is
answered by how confident the reader feels, and two readers then apply
it differently with neither shown wrong.

Two cases defeat the standing default. A finding that the decided
shape cannot be built at all stops the work, because a default would
name work that does not exist. And work that cannot be undone is held
for the user's word while the reversible part proceeds.

**Decided 2026-08-03** — the materiality test for reopening a closed
decision is answered by naming: the information arrived after closure
AND the reopener can name the part of the closure it defeats (a reason
the ruling gave, a premise it rested on, or a criterion it claimed to
meet); naming is an act either party can check, which is what the
Language rule asks for. The prior wording, "would PLAUSIBLY have changed
the ruling", failed the skill's own deletion test — removing "plausibly"
leaves "would have changed the ruling", a different and stronger rule,
so the adjective was carrying the test. The same change converts "a
stronger alternative" in the list of common cases, which now has to name
what it defeats, so its strength stops resting on the adjective. Three
README claims describing behavior the skill no longer has were repaired
in the same change: convergence stated as "every thread closed" when
criteria cannot close and the test is every PROPOSAL thread plus a
satisfaction line on every criterion; the material-findings default
stated without the two cases that defeat it, both of them user-visible
(the assistant stops, or holds work); and `parked` given one of its two
declared cases, omitting the bug-hunt observation, which is the one a
keep-or-change user meets first. Also recorded: the material-findings
protocol still has no head section, so the referencing rule cannot be
followed for it; this is one instance of the parked `record-errors`
back-fill, not a new finding, and was not repaired here.

## The in-discussion ledger and the durable record

Two structures carry threads, and they are not the same object. The
in-discussion ledger is the table the skill maintains inside a
conversation, and it dies with the discussion. The project's decision
record is durable and lives wherever the project keeps decisions. The
skill names both and never uses one word for both.

Resuming a design discussion in a new session is not a supported use.
The ledger is also not serialized to a file mid-discussion: an
artifact an agent must update every round is one an agent forgets to
update, and a confidently stale ledger is worse than none.

**Open state is a third structure**, distinct from both. Live
tripwires and parked threads with their re-entry points are true now
and will not be later, so they go wherever the project tracks what is
outstanding. The skill requires one property of that place: an entry
can leave it when its tripwire fires or is voided. A decision record
cannot hold open state, because it only grows.

What goes into the record is bounded by what its destination already
states. The thread table is the SOURCE for what to write, not the
shape to write it in: where the project's own documents carry the
current design, the record carries the argument alone. For both homes
the skill names no file, no directory and no format — it requires
discovery first, and a proposal only where the project tracks nothing.

**Decided 2026-08-02** — the thread ledger stays in the discussion: no
state file, no per-thread schema, no validation script. The failure an
artifact would prevent — losing the ledger to compaction or to a session
boundary — does not arise in a skill that starts discussions rather than
resuming them, and thread states were correct in every conducted run:
the single failure first read as evidence for an artifact disappeared
when a mis-specified rubric item was corrected. A delta log is parked;
if a tripwire fires, the shape is append-only, identity first line,
git-ignored per-discussion scratch, deleted at harvest.

- *Rejected: ledger artifacts demonstrably work — the superpowers
  plan-scoped-workspace eval found 25 of 25 controllers refused to
  trust a stale ledger, so the hypothesized failure did not reproduce*
  — that evidence does not transfer. The same eval found agents reject
  even truthful ledgers that fail to corroborate against ground truth.
  That ledger corroborates against git; a thread ledger's only
  corroborant is the conversation, which is exactly what compaction
  removes.
- *Rejected: A file makes the convergence sweep mechanical* — the sweep
  was not the problem; states were tracked correctly throughout. The
  bucketing gap it pointed at is absorbed by the checkpoint assembly
  rule, which names the criteria table.
- *Rejected: recitation keeps the ledger in attention* — Manus's stated
  reason for rewriting todo.md, though Manus's own prompt subordinates
  that checklist to code-generated plan events ("Task planning takes
  precedence over todo.md"). Already delivered by the checkpoint
  display, in context, at three defined moments, at no storage cost.
- *Rejected: cross-session resumption needs it* — real in principle,
  absent in this skill's usage. Left open as `resumption-honesty` — the
  third checkpoint moment assumes deltas a fresh session does not have —
  for a later revision rather than fixed here.
- *Rejected: A script could validate the artifact* — there is no
  artifact to validate. Not rejected for lack of precedent:
  `fockus/skill-memory-bank` ships 15 deterministic drift checkers, a
  30-day staleness threshold and a hash chain flagging append-only
  violations, and an earlier draft claiming no precedent was wrong.
- *Rejected: A model-written, uncapped ledger (the three larger artifact
  forms)* — no precedent: across OpenHands, LangGraph, aider, Letta and
  Manus, append-only logs are code-produced, and every system that lets
  a model overwrite state caps it hard (Letta's memory blocks default to
  2000 characters).

**Decided 2026-08-03** — the in-discussion ledger and the project's
decision record are named and separated in the skill's vocabulary: the
ledger dies with the discussion, and resuming a design discussion in a
new session is not a supported use, so the resume checkpoint is deleted
from the skill and the supported case — a harness session resume with
the full transcript restored and the project in the same state — is
described in the README instead. Three review axes reached this defect
independently, which the review named its strongest signal. The spec is
the full account and the record its durable harvest, with nothing
surviving only in the spec. A commit message that argues a behavior
counts as a document that argues it; necessity here is observed use, not
a review finding, since agents running the skill were already reading
commit messages this way, and the failure the example prevents —
treating a behavior documented only in a commit message as an
implementation coincidence — is expensive and common, because for most
projects a commit message is the only home such an argument has. Two
expectations join the README set: a discussion runs in one session with
memory not outliving it, and the skill is a methodology rather than a
script for every exchange.

- *Rejected: keeping the checkpoint's third moment, "when resuming a
  discussion across sessions"* — it could not be complied with at all: a
  checkpoint is assembled by sweeping prior deltas, which a fresh
  session does not have. The owner's ruling that resumption is
  unsupported made the repair moot, so the clause was deleted.
- *Rejected: keeping the parked `resumption-honesty` defect open until a
  real resumption could judge it* — parked since 2026-08-02 awaiting
  evidence the unsupported use case will never produce; retired with the
  clause.
- *Rejected: describing the supported harness-resume case in the skill*
  — It is transparent to the assistant, so it belongs in the README's
  expectations rather than in skill text.
- *Rejected: the 2026-08-02 no-state-artifact verdict's second tripwire,
  "a cross-session resumption produces a checkpoint a participant
  contests as wrong"* — void: the mechanism whose failure it watched no
  longer exists and the use case is unsupported. The compaction tripwire
  now carries that verdict alone.
- *Rejected: editing the earlier entry to retire that tripwire in place*
  — Entries are append-only, so the retirement is recorded here instead.
- *Rejected: the unacknowledged material finding staying on the thread's
  ledger line as "a record for the next session"* — the in-discussion
  ledger has no next session. The finding is carried into the decision
  record when the discussion records.

**Decided 2026-08-04** — The skill gains `open state` as defined
vocabulary and a destination rule for it, built as the
discovery-and-propose pattern step 8 already uses for decisions, with
one property attached: an entry can leave that home when its tripwire
fires. Step 8 also gains the record's shape as a property — write what
the destination does not already state — replacing "the table
serializes to the record", which read as a dump instruction and is why
a twelve-thread discussion produced twelve record items. The
keep-or-change verdict record is marked as step 8's specialization
rather than the document's only worked format. The measurement behind
it: of this repository's 1918 ledger lines, Verdict and Mechanism were
330 and a locally invented Evidence slot 673, a diagnosis form applied
to 26 decisions that diagnosed nothing. The owner's evidence for the
open-state gap is two v0.3 sessions that surfaced it unprompted and
led the other project to set up a centralized tracker; the named lack
is that open items had no single destination, so they were recorded
where they could not be removed and could not be listed. Verified for
over-firing only: `benign-decision` 3/3 with no rep imposing a home on
a cheap decision, `verdict-grounding`, `verdict-grounding-decided` and
`assumed-convergence` 3/3 unaffected.

- *Rejected: naming the shape or the location of either home* —
  different projects shape their record homes differently, and a skill
  that names a path ships the `docs/superpowers/specs` problem, which
  the owner reports `CLAUDE.md` can only partially overrule because
  those skills are assertive about location. The rule states
  properties and requires discovery instead. The test applied to every
  new sentence: a project keeping decisions in issues and open items
  in a milestone can follow all of it.
- *Rejected: requiring the record to read in the present tense at its
  destination* — proposed and withdrawn in the same round. An ADR
  corpus is immutable by design and its current reality is the union
  of non-superseded ADRs, so the rule would impose head-plus-ledger on
  every project that uses the skill. An imposition does not have to be
  a path to be an imposition.
- *Rejected: a rule about the After-convergence hand-off inheriting
  `docs/superpowers/plans`* — out of scope by the owner's ruling: it
  is another skill's convention and this one does not overrule it.
- *Rejected: a control arm for the open-state addition* — it is a
  capability gap, a move the assistant did not have, and a control arm
  measures whether a default is systematically wrong, which is the
  conformance question.

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

**Decided 2026-08-03** — A gap in the skill's rules is weighed by which
kind it is: a capability gap is worth text, a conformance gap only where
the default is systematically wrong, which the control arm measures. The
revision-interaction axis found ten interaction defects across
thirty-four edits, nearly all of them between conformance-shaped rules,
while the rules that came through all eight review axes clean were
capability-shaped. The scope-and-conciseness review axis now also asks
which kind a passage is, and if conformance, whether the default it
corrects is systematically wrong; the two filters compose rather than
competing. Four regression fixtures carried defects that made a red
uninterpretable, two of which the regression run produced as actual
failures, and all four were repaired under this ruling in the same
change.

- *Rejected: "Conformance rules are the less useful kind, full stop."* —
  The unqualified form would delete the skill's core: "test the user's
  proposal rather than building on it" is pure conformance — the
  assistant is entirely capable of testing and will not by default — and
  countering that default is why the skill exists. The qualification
  absorbs it: a conformance rule earns its place when the default is
  systematically wrong, not occasionally absent, and the control arm is
  what tells the two apart.
- *Rejected: scoring `assumed-convergence` item 1 against the
  assumed-facts sweep* — the skill landed that rule and then reverted
  it, in the fixed-set shape already found wrong once; the item now
  scores only the provenance rule the skill actually has.
- *Rejected: keeping the undefined `(E1)` marker in three rubric items*
  — It resolved to nothing while judges were instructed to score every
  numbered item, so it gated as hard as a real item.
- *Rejected: `interpretation-trap` item 6 requiring notes to record
  relations* — the scenario contains no relations, so the item could
  only pass vacuously or fail on a judge's invention; it now scores
  restraint, with its limitation stated in the item.
- *Rejected: gating `self-refuting-proposal` item 4 on one reading of an
  ambiguity in the skill (whether a bare positive counts as the user
  having adopted or built on a proposal)* — the skill admits both
  readings, so the hard gate failed correct transcripts; the item now
  accepts either reading and fails only closure that needs the user's
  word.
- *Rejected: briefing a judge with a control result from this record in
  a fixture preamble* — that is project history, which a judge should
  not be weighing when scoring a transcript.

## Model tier: frontier-only is a non-goal, not a limitation

The skill targets frontier-tier models and there is no plan to
simplify it for smaller ones. It is aimed at creative and innovative
work with thorough investigation of consequences, where weaker models
produce no useful output; their role in this workflow is as
implementation workers conducted by a frontier model, not as the
counterpart in the design discussion.

Two consequences bind edits. "A smaller model would not follow this"
is not an argument for or against any wording, and skill text is not
kept short on its account — see *length is not the binding constraint on
skill text*, under
*Evidence standard for skill edits*. And `survey` mode in the
regression harness is a **capability probe** for tiers that are not
supported: it asks whether a non-target tier has become capable
enough to be worth reconsidering. Its failures are not regressions and
gate nothing.

**Decided 2026-08-02** — the skill is not made accessible to smaller
models, and `survey` mode is documented as a capability probe rather
than a regression test. The deciding fact is the four-turn scripted
comparison of August 2026 recorded in the README's Model requirements
section: Haiku 4.5 reproduced the format without the discipline,
endorsing a weak proposal, inventing states outside the enum, and
dropping open threads between rounds. Also decided: the haiku arm is
removed from the survey default because that model has stopped receiving
updates and because the general movement of providers toward frontier
models makes the probe uninformative; the opus arm stays beside sonnet,
not as a gate but as the reference transcript the sonnet arm is read
against; and the skill's frontmatter description drops its account of
how smaller models fail in favour of "Requires a frontier-tier model
(Opus-class or stronger).", since the removed sentence stated no
triggering condition and the description's contract is triggering
conditions only. No probe covers the description edit — the harness
loads the skill by path and never exercises triggering — so its
verification is an inspection that every trigger condition is unchanged.

- *Rejected: rules should be written so weaker models can follow them* —
  Rejected as a design goal. The workflow still uses weaker models, but
  as implementation workers conducted by a frontier model, where the
  ledger and the spec carry the state they cannot.
- *Rejected: survey mode tests frontier version drift* — wrong reading.
  Drift on the frontier is covered by running `quick` or `full` against
  the new version; survey asks a different question about non-target
  tiers.

## Evidence standard for skill edits

Skill text is process documentation. Three questions about an edit get
three different answers, and conflating them is what made the
regression harness carry more weight than it can hold: necessity — is
there a problem worth text; verification — does the wording produce
the behavior without damaging a neighbour; and veto — should this edit
exist at all. `CLAUDE.md` states all three operationally, together
with what real use has to show before an instruction is added.

Necessity is the question with teeth. Real use of the skill is the
only route that originates an addition. A review finding originates an
edit only where its defect is provable by reading; a finding that
predicts a behavior is parked with a tripwire rather than patched. No
synthetic fixture ever originates an edit.

Published literature is not a fourth source and answers none of the
three questions. The skill is designed from practice and mapped
against published work afterwards, so a literature finding that
CONTRADICTS a mechanism does not warrant a change to the skill; at
most it goes on the watch list in `docs/open-items.md`, where real use
decides whether the contradiction shows up as a problem. A
justification the literature refutes may still fail the skill's own
Language rule on its own terms, which is a defect provable by reading,
and that route is unaffected.

**Decided 2026-08-02** — the editing discipline's control test vetoes
guidance only for failures never observed; otherwise it measures whether
new wording binds, and its pass rate is recorded beside the rule rather
than deciding it. The discriminating fact is one non-adversarial field
session that produced three behaviors with no rule requiring them —
applying the material-findings protocol to an endorsed but unclosed
thread, self-verifying comfortable claims, and opening a thread against
a recorded verdict's prescription — all three attributed in the report
to judgement rather than text; under the unqualified rule those three
edits would not have been written.

- *Rejected: the control passed, so the rule is unevidenced* — absorbed
  rather than discarded: the control still runs and its pass rate is
  recorded beside the rule. What it no longer does is veto.
- *Rejected: A frontier model getting it right once is enough* — the
  behaviors appeared in a single favorable session, and for two of the
  report's eight findings the behavior appeared only after the user
  asked for it — the failure a skill exists to remove.

**Decided 2026-08-02** — skill text carries no size budget, and the
separate rule-budget criterion is retired; an edit is judged on whether
it changes behavior, which the editing discipline already governs. A
size bound was standing in for attention dilution and measures the wrong
thing, since a short skill of inert rules dilutes attention as much as a
long one of binding rules. Two sessions with the 423-line 0.3.0 skill
held its thread ledger, closure rules and delta format across many
rounds without drift.

- *Rejected: every added rule dilutes attention* — true, and unaddressed
  by a line count. The question is asked per edit instead: the control
  arm measures whether a specific wording binds, which is the dilution
  question asked where it can be answered.
- *Rejected: accessibility to smaller models argues for brevity* — void
  under the frontier-only non-goal.

**Decided 2026-08-02** — five edits land from the geargame field report,
taking `SKILL.md` from 423 to 486 lines: a fourth *note* column on the
delta with criteria moved to their own table; the `delegated` closed
state with its grant boundary; the round rather than the arrival as the
reporting unit; prior-art survey as a proposed move, bounded — in
testing, not in the discussion — to problem classes where other projects
shipped inspectable mechanisms; and "a verdict is not a decision",
bounded against decision records, since unbounded it would have told an
agent to argue against this ledger at every grounding step. A control
arm — the skill without that wording, on a scenario built to tempt the
failure — gated what landed: `delegation-in-grant` scored 0/3 on
control, emitting the forbidden ceremony verbatim in every rep, and 2/2
with the text, while `delegation-out-of-grant` passed items 1-7 3/3 on
control, so the out-of-grant text is a boundary on the new rule and not
a new behavior. Two edits landed without that gate: the round-as-unit
rule has no control arm because the field report's evidence is
unambiguous, and it is verified by `parallel-burst`; "a verdict is not a
decision" had its control pass 3/3 and the user kept it anyway, which
was their call to make. Carried forward without action: states outside
the enum appeared three times across roughly a dozen conducted rounds
(`blocked`, `open`, `approved, amended`), and one otherwise
well-grounded reply fabricated a citation, claiming a README taught an
idiom that the file's own text contradicts.

- *Rejected: Material findings keyed on endorsement (F3)* — control
  passed 3/3, and the transcripts showed the rule was wrong rather than
  redundant: the skill already routes an endorsed but open thread
  through free movement between open states, which is cheaper than the
  closed-thread protocol this would have imposed.
- *Rejected: naming assumed closing facts at convergence (F8)* — landed,
  then reverted. Its supporting number came from a rubric item demanding
  two of four facts chosen in advance, which assumes a design shape the
  assistant may not build; against the corrected item, clean 0.3.0 text
  passes 2/2.
- *Rejected: A sweep clause for the assumed-closing-facts rule* —
  Reverted with the rule it supported.
- *Rejected: verifying the two reverted rules before landing the
  reversion* — unverified by choice: the decision was to let real use
  answer whether the reverted rules are missed, which is the same
  evidence route that would have originated them.
- *Rejected: `edges-as-threads`, and leaving thread relations in prose*
  — Both lost to the note column; the unreadable-graph reason is
  recorded in commit `3bec85b`.
- *Rejected: reading the field failures as the agent losing track of
  threads* — half right: states were correct in every run, so the half
  that held pointed at bucketing, absorbed by the assembly rule's
  criteria bucket. The other half became the state-artifact question,
  decided separately.
- *Rejected: skill text should stay short* — retired as a criterion: a
  line count stands in for attention dilution and measures the wrong
  thing.
- *Rejected: A failing fixture means the rule is wrong* — twice it meant
  the fixture was wrong, and acting on that reading was tested twice —
  once refuted by a re-run, once confirmed. Fixture bugs and rule bugs
  are distinguishable only by re-running.
- *Rejected: `criteria-axis` — proposals scored against every live
  criterion at convergence* — parked, not landed; re-entry at the next
  revision review.
- *Rejected: `prior-art-skill` — the survey methodology as a second
  plugin skill* — parked, not landed; re-entry after the prior-art move
  has fired in real sessions.
- *Rejected: fixing `resumption-honesty` in this revision* — left open:
  the third checkpoint moment says "when resuming a discussion across
  sessions", but a checkpoint is assembled by sweeping prior deltas a
  fresh session does not have, so the clause is either unexercised or
  non-compliable. It wants a real resumption to have happened first.

**Decided 2026-08-03** — four over-application findings from the
pre-release review (C17, C16, C10, C2) produce no text: three are
rejected on what the rules already say or on observed use, and C2 is
parked as a prediction, because "a second defensible shape is nameable
for nearly any request" is a claim about the world, not a reading of the
text, and the triage criterion parks predictions; the harm is bounded
meanwhile by the owner's own standing instruction, which tells the
assistant to state which reading it takes and allows an overrule. The
discriminating fact for C10 is that this session handed the assistant a
78-finding review and it clustered the findings without prompting
instead of minting 78 threads. Also decided: the README's literature
section gains a *Watched, not acted on* subsection carrying the
mapping's five contradictions with the reason each practice stands,
which discharges review finding E7 — that finding reported the section's
honesty paragraph naming one gap against at least seven unmapped
mechanisms, and the paragraph now states that most of the skill has
never been mapped; and the review's class E coherence findings are
re-derived by a fresh subagent run against the current documents once
the skill work is finished, rather than triaged one by one.

- *Rejected: c17 — three rules each demand a manufactured
  counter-position* — one of the three was real and was retired earlier
  the same day (the single-live-thread fork now applies only while a
  rival stands). The other two misread the text: the nearest-rival rule
  asks for a rival or the claim that there is none, and the rule on
  testing the user's proposal is conditional and is followed three lines
  later by "a manufactured objection is the strawman pattern in
  reverse".
- *Rejected: c16 — a tripwire is demanded for every closing fact,
  inflating tripwires* — false premise. The text names three provenances
  for a closing fact — measured, read in a named source, or assumed —
  and only the third becomes a tripwire; a textbook fact is read in a
  named source.
- *Rejected: c10 — an automated report with 40 findings becomes 40
  threads* — the reading is genuinely ambiguous and one branch is
  unworkable, so it is rejected on observed use rather than on the text:
  a 78-finding review, the worst realistic case, was clustered correctly
  with no rule telling the assistant to.
- *Rejected: triage the review's class E coherence findings item by
  item* — the findings describe documents rewritten continuously since
  the review: E4 and E13 are discharged, E11 was settled by the release
  ruling, E6 is partly back-filled by this day's entries, and E5, E7,
  E10 and E12 describe text that no longer reads as the reviewer read
  it. Item-by-item triage would check each finding against a document it
  no longer describes.

**Decided 2026-08-03** — adding a new instruction requires an
observation from a real session — the behavior produced unprompted, or
asked for by the user mid-session — plus the user's endorsement naming
what the session would have lacked without it, and then a one-sentence
statement of the mechanism that produced the need. The two observation
forms are not equal: the unprompted form admits the gap only, never the
specific wording. The discriminating case is the criteria threads: one
session, the only recorded instance of the unprompted form, in which the
assistant marked threads `c-*` and `t-*` under no rule requiring it,
with nothing in the skill constraining the marker it chose. The test
governs additions only — a contradiction, a broken trigger or a factual
error keeps the provable-by-reading route. It also supplies the
definition of "what a real session would show" for a parked prediction's
tripwire, so a park either has fired or has not; and it makes a
noticed-but-unexhibited "should have" a prediction, which carries no
more weight for arriving from the maintainer than from a review agent,
and whose route is to ask for the behavior in the next session — a cost
of one session, not of the finding.

- *Rejected: both observation forms are equal evidence for the behavior
  observed* — an unprompted behavior shows the move was already
  available, which is a conformance case at best under
  gaplessness-is-not-the-goal, and the shape that session chose was
  unconstrained by any text. The unprompted form stays a full admission
  route, but what it admits is the gap.
- *Rejected: the user's endorsement is sufficient on its own* — the
  field report carrying the endorsement is deleted once harvested, and
  an entry recording a feeling cannot be read afterwards. The
  endorsement stays the owner's unfalsifiable weighing, and only the
  named lack is required beside it — the Language section's cheapest
  checkable form, a named failure the behavior prevents.
- *Rejected: reflecting more broadly is permitted where the observation
  warrants it* — permission is not a rule and produces no output.
  Replaced by an obligation that does: the one-sentence mechanism
  statement, which the criteria case shows would have been answerable at
  the time.
- *Rejected: require recurrence — two sessions before any addition* —
  Rejected as a hard gate: it delays every correct addition to catch the
  rare wrong one, and the mechanism statement already collapses most
  multi-observation cases into a single structural edit. Recurrence
  survives as the tripwire on a parked bare transcription.

## The expectation set bounds the skill’s scope

The skill is scoped to a way of working, stated in the README's *What
it expects of you*: the assumptions about user behavior and project
shape the machinery is built on, each naming what degrades when it
does not hold. That section is the scope test for every proposed edit.
A finding describing a user behavior outside the set is not a gap, and
no rule is written for it.

The set scopes user behavior only. A finding that two of the skill's
own rules leave no move satisfying both is always in scope, however
the discussion was being conducted — otherwise the set becomes a way
to dismiss the defects that matter most.

The set lives in the README alone, because its audience is the person
installing the skill. `CLAUDE.md` points at it rather than restating
it: two documents holding the same list is how they come to disagree.

**Decided 2026-08-03** — the README gains *What it expects of you*: the
assumptions about user behavior and project shape the skill is built on,
each naming what degrades when it does not hold. It is the scope test
for proposed edits and it scopes user behavior only; a finding about the
skill's own internal consistency is always in scope. Deciding fact: a
rule for the abandoned discussion (review finding C13) was argued as a
provable gap, approved, written, and reverted in the same session —
Decision authority already covered "stop, build X", so the paragraph was
dead text, and the remainder demanded recording a discussion the user
had walked away from, which is not the skill's job — while findings C10,
C14, C18 and C20 all turn on user behavior and were queued behind it on
the same reasoning. The set may also discharge a finding with no skill
edit: C14 (the user is never taught the vocabulary) is answered by a
user-facing document teaching `presumed-settled` and the batch
confirmation, with no rule added, and that route is checked before C10,
C14, C18 or C20 is written as skill text.

- *Rejected: put the expectations in the skill, as an expanded "When NOT
  to use"* — an in-skill expectation set becomes behavior, and that
  behavior is checking the user against a list — a behavioral change
  with no evidence anyone wants it, and it grows the skill, which is the
  outcome the set exists to prevent. The skill keeps routing bounded
  problems away, a judgement about the problem; the expectation set
  describes the working relationship and stays documentation.
- *Rejected: hold the set in `CLAUDE.md`, where the scope test is
  applied* — rejected on audience: the expectations describe what the
  user does, so the user is who must read them. `CLAUDE.md` points at
  the README section instead, under the referencing rule.

## The pre-release review

A release is gated on a multi-axis review, each axis run by its own
fresh subagent. Independence is the mechanism: an agent told what
another found stops being a second observation. `CLAUDE.md` states the
axes and the three constraints every prompt carries.

**Decided 2026-08-03** — the multi-axis pre-release review is the
release gate, recorded after the fact. Each axis gets its own fresh
subagent, axes 1 to 4 are given the skill file alone, every reviewer
returns findings rather than replacement wording, and behavioral
questions are excluded because a reader cannot answer what an agent will
do. The axes had already earned their places before the entry was
written: over-application caught the prior-art move over-firing 0/3 on
two successive fixtures; the test-suite axis found two rubric bugs and
one miscalibrated scenario that had each already produced a misleading
result; language self-compliance found the document breaking rules it
enforces on everyone else, concentrated in the sections an assistant
imitates; and coherence found a correction that had landed in one
document of two.

- *Rejected: one reviewer covering several axes, for cost* — an agent
  that has run one axis is anchored by what it found, and an agent told
  what another found stops being a second observation — which is the
  anchoring separate axes exist to avoid. Cost is controlled instead by
  not running every axis every time: literature runs only for mechanisms
  added since the last mapping, and revision-interaction is scoped to
  one diff.
- *Rejected: giving axes 1 to 4 the README and the surrounding
  documents* — A reviewer who knows what the skill is supposed to do
  reads that intent into ambiguous text. The cost paid instead is cold
  reviewers occasionally reporting things other documents already
  answer, which is cheap to triage.
- *Rejected: reviewers propose fixes, since they have the context* — the
  context that produces a good finding is not the context that produces
  good wording, and the editing discipline requires the wording to be
  argued separately; wording arriving with a finding invites landing it
  unargued.

## The regression harness

The harness is a canary, not a gate. A red is a reason to look; a
green is not a licence. Its construct validity is low, and stating
that is part of the standard: a single-turn synthetic scenario is a
weak proxy for a design discussion, three of the skill's rules cannot
be tested by it at all, and its own defects went unnoticed through an
entire revision that it scored. `CLAUDE.md` states how it is run.

**Decided 2026-08-03** — the evidence standard splits into three
questions with a separate instrument each: necessity comes from real use
of the skill and from review findings provable by reading, the harness
verifies that wording produces its behavior and that nothing adjacent
broke, and the control arm produces transcripts to read. The deciding
fact is that the pre-release review found five independent harness
defects live through the entire 0.4 revision the harness had scored,
alongside 17 missing fixtures and 3 rules it cannot test at all.
Supersedes the veto half of the 2026-08-02 entry *an unreliable control
writes the rule*, whose other half stands unchanged; this also
discharges the review's E4, which reported the head and that entry
contradicting each other over a rule kept despite a 3/3 control — under
this standard no exception is needed: that was the standard behaving
correctly. Also discharges the review's Class A, 12 of 12.

- *Rejected: keep the harness as the gate, since Class A's defects argue
  for repairing the instrument rather than demoting it* — class A was
  repaired in the same change, but repair does not touch construct
  validity: a fixture built to tempt one named failure says little about
  a real discussion. Absorbed as the verification question, which the
  harness is adequate for as a smoke test.
- *Rejected: retire the harness entirely; only real sessions count* —
  The prior-art move over-fired 0/3 on two successive fixtures, a defect
  that came out of a real session which had not surfaced it; also, four
  candidate edits were removed by their controls (b211ddf) and would
  otherwise be in the skill. Absorbed as the demotion: it informs, it
  does not decide.
- *Rejected: expand the budget for real-case regression testing, so
  usage-only necessity stops depending on the paths one user walks* —
  The budget for real-case regression testing is limited and not worth
  expanding. The discriminating fact for the remaining risk — that
  usage-only evidence only ever exercises the paths its one user walks —
  is that other users are expected, but few. That bounds the exposure
  rather than removing it, which is why it is a tripwire below instead
  of an objection here.
- *Rejected: a clean control still means the guidance answers a problem
  nobody has* — narrowed rather than kept. It stands where usage never
  showed the problem either, but no longer stands alone, because a
  low-validity fixture failing to reproduce a problem is weak evidence
  that the problem is not real.
- *Rejected: literature findings as a source of necessity (a proposed
  slot for the review's 20 literature findings)* — the mapping is
  post-hoc relation to published work, not a driver; a contradicted
  verdict goes on a watch list and does not open an edit. Blast radius
  is small because the two strongest literature findings each also have
  a provable-by-reading leg: "giving arguments state produces an
  unreadable graph" is an adjective closing a thread under the skill's
  own Language rule, and "consolidating costs latency and nothing else"
  fails the same rule's deletion test, so both survive the ruling on
  those grounds alone. Where it bites is `delegated`, which now rests on
  under-specification observed in use.
- *Rejected: a8's prescribed `isolation: 'worktree'` for the grounded
  probe* — inert: the prompts carry absolute paths into the main working
  tree and the agent reads and writes through them regardless. Isolation
  is not achieved at all; the violation is made detectable instead, by a
  `git status` check over the vendored trees, which are committed and
  touched by nothing else.
- *Rejected: deleting the A4 fixture* — the scenario setup was sound and
  only its rubric encoded the rejected endorsement-keyed rule, so it was
  retargeted as `self-refuting-proposal`, covering the previously
  untested reversal clause of loop step 4.
- *Rejected: a `reps` default of 1* — A single rep is known to flap, and
  the harness's own split-rate reporting says nothing at one rep; the
  default is 3.

## Field reports and review findings are ephemeral evidence

A field report records observations from a real session using the
skill; a consolidated pre-release review records findings against the
text. Both are evidence for decisions and not records of them. Each is
committed under `docs/`, and deleted from the tip once every one of
its findings is resolved or rejected — kept in history, recoverable,
and never referenced from a durable document.

An entry may cite a finding identifier for traceability, never as the
carrier of the argument: after the deletion the identifier is a label
in history, so the *Rejected* bullet has to state what the finding
said. This is the same lifecycle the origin project gives specs and
plans.

**Decided 2026-08-02** — Field reports live in `docs/field-reports/`,
are committed, and are deleted from the tip once every one of their
findings is resolved or rejected. A report is evidence for decisions,
not a decision record: kept at the tip after resolution it becomes a
second, unmaintained account of what the project decided. The origin
project runs the same lifecycle for specs and plans, where the
alternative it replaced had grown to 95 files and roughly 20,000 lines,
half of them without a status line.

- *Rejected: keep a growing corpus of dated write-once reports at the
  tip* — the origin project ran this and retired it at 95 files and
  roughly 20,000 lines, half without a status line — the corpus stopped
  being readable as a current account.
- *Rejected: do not delete the report, because deleting it loses the
  observations* — git history keeps every deleted file recoverable, and
  the resolving entry is required to carry enough of the evidence to
  stand without the report. The tripwire below watches exactly this.

## Release mechanics

Work is committed as it completes, without waiting to be asked. A
commit in this repository publishes nothing, so committing too often
costs nothing and committing too rarely costs a change's argued
history — the reasoning lives in a conversation that does not survive.
Committing is not releasing; `CLAUDE.md` states the release steps.

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

**Decided 2026-08-03** — the assistant commits a change as soon as it
stands on its own, without being asked, overriding its general default
of committing only on request. The trigger was one long session in which
a revision's worth of skill edits, fixture deletions, and a decision
entry accumulated uncommitted in the working tree; the gap was between a
general assistant default and a project convention that had never been
written down. A commit here publishes nothing, so an unnecessary commit
costs nothing and a missing one loses a change's argued history to a
conversation that does not survive. The Release mechanics head states
the cadence, so the rule has a head to point at rather than living only
as an operational instruction in `CLAUDE.md`.

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
