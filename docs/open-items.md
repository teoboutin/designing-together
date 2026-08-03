# designing-together — open items

Current reality only. This file holds the repository's OPEN state: the
tripwires that are still watching, the predictions parked instead of
written, and the literature findings on the watch list. An entry
leaves this file in the same change that fires, voids or resolves it —
history stays in git and in `docs/decisions.md`.

It exists because the decision record is append-only per section and
so cannot say what is still live. A tripwire recorded inside an entry
can never be removed, and 59 mentions of the word across the record
gave no way to list the ones still watching.

The argument behind an item stays in `docs/decisions.md`, in the
section named below. This file carries only what is open: the
evidence that would fire it, and where it re-enters.

## Parked predictions

Each is a behavior a review or a session predicted, admitted under the
evidence standard as a prediction rather than a demonstrated problem.
Each names what a real session would have to show.

- `self-withdrawal` — an agent under social pressure retiring its own
  strongest proposal through `withdrawn`. Fires on a session where the
  user pushed back socially rather than with an argument, an agent
  withdrew its strongest proposal, and the recorded defeating reason
  restates the pushback. Re-entry: the over-application axis of the
  next pre-release review. (*The structure is a scaffold*)
- `party-neutral-stall` — the stall definition is party-neutral by
  design, and a user repeating themselves satisfies it. Fires on a
  session where the assistant characterises the user's repetition as a
  stall and the user was signalling that a point had been missed.
  Re-entry: the over-application axis of the next review. (*Rule
  triggers are written as tests*)
- `second-defensible-shape` (review C2) — "a second defensible shape is
  nameable for nearly any request", which would make the open-space
  gate fire everywhere. Fires on a discussion that runs the full
  machinery where the user afterwards states it was a simple
  requirement. Re-entry: the over-application axis of the next review.
  (*Evidence standard for skill edits*)
- `criteria-axis` — proposals scored against every live criterion at
  convergence. Parked, not landed. Re-entry: the next revision review.
  (*Criteria are not threads*)
- `prior-art-skill` — the survey methodology as a second plugin skill.
  Parked, not landed. Re-entry: after the prior-art move has fired in
  real sessions. (*Evidence standard for skill edits*)
- `delta-log` — a durable per-discussion ledger artifact. Parked. If
  its tripwire fires, the shape is append-only, identity on the first
  line, git-ignored per-discussion scratch, deleted at harvest.
  Re-entry: on the compaction tripwire below. (*The in-discussion
  ledger and the durable record*)
- `record-errors` — sections of the skill that no head section argues,
  so the referencing rule cannot be followed for them. The
  material-findings protocol is one instance. Fires on a session citing
  a head for something the head does not state. Re-entry: when a
  decision touches the section. (*The referencing rule*)
- `review-identifiers` — E5, E10, E11, E12 and E13 are cited in the
  record with no statement of what they said, and `docs/reviews/` is
  deleted. Traceability only; no decision changes for want of them.
  Fires when someone needs to know what one of them said and cannot
  recover it. Re-entry: the document-coherence axis of the next review.
  (*The referencing rule*)
- `territory-split` — splitting `docs/decisions.md` into per-territory
  files with a routing rule, as the origin project does. Parked: at
  1479 lines the split buys nothing, and roughly half the entries argue
  skill content, so a two-way split would leave one file near 1000
  lines. Fires when a session grounding a decision in ONE territory has
  to read three or more sections, or when the file passes 2000 lines.
  Re-entry: the document-coherence axis of the next pre-release review.
  (*How the decision record is kept*)
- `record-shape-fixture` — no fixture covers step 8's shape rule or
  the verdict-record scoping; `verdict-grounding` grounds ON a record
  carrying a verdict and never writes one, so the 2026-08-04 edits are
  verified for over-firing only. Fires when a session records under
  the new rule and gets it wrong, or when a fixture reaching a
  recording move is written. Re-entry: the test-suite axis of the next
  pre-release review. (*The in-discussion ledger and the durable
  record*)

## Literature watch list

A mapping verdict that CONTRADICTS a mechanism goes here rather than
opening an edit; real use decides whether the contradiction shows up
as a problem.

Three are live from the August 2026 mapping. The README's *Watched,
not acted on* section carries each with its citations and is the
durable output; this list exists so they can be counted.

- "Giving arguments state produces an unreadable graph" is
  unsupported. The practice stands; its stated reason was replaced
  under the skill's own rule about qualitative claims, so what remains
  watched is the practice, not the reason.
- "Consolidating costs latency and nothing else" is contradicted:
  granularity, not batching, is the active ingredient.
- The prior-art gate selects for the corpus's most harmful property,
  commonness. Fires if a session's prior-art survey returns only
  well-known mechanisms and the discussion narrows afterwards.

## Live tripwires

Grouped by the section of `docs/decisions.md` whose decision they
watch, with the entry that recorded them.

## Criteria are not threads

- A discussion where the user wants to ship over an unmet binding
  criterion and experiences demotion as a bureaucratic extra round,
  which would mean the weighed-only rule is too strict — *criteria stop
  being threads, and binding stops being waivable* (2026-08-03)
- A criterion appears in a delta or checkpoint carrying a proposal state
  after this edit, which would mean stating the separation was not
  enough — *criteria stop being threads, and binding stops being
  waivable* (2026-08-03)
- `superseded` threads stay open through a displayed checkpoint, which
  would mean the by-name relaxation did not land — *criteria stop being
  threads, and binding stops being waivable* (2026-08-03)
- A discussion converges with a binding criterion whose satisfaction
  line was never contested, meaning the line is read as ceremony —
  *criteria leave the state enum; two defaults are repaired*
  (2026-08-03)
- A criterion is derived from project rules and turns out to be wrong
  for the discussion, meaning the binding-by-presumption default is too
  strong — *criteria leave the state enum; two defaults are repaired*
  (2026-08-03)
- The material-findings default holds work in a case the user reports as
  obstruction, meaning the this-turn test is still drawn too wide —
  *criteria leave the state enum; two defaults are repaired*
  (2026-08-03)

## Evidence standard for skill edits

- A rule written under this qualification whose control arm passes every
  rep across several revisions, which would mean the wording is inert
  and the qualification is licensing dead text — *an unreliable control
  writes the rule* (2026-08-02)
- An edit that lands correctly in isolation while a previously-passing
  rubric item regresses with no textual conflict between them — that is
  attention dilution becoming observable, and it reopens the question of
  a size bound — *length is not the binding constraint on skill text*
  (2026-08-02)
- Evidence bounding the limit from above at any concrete length would
  also reopen it: the two sessions show 423 lines is below the limit,
  not where the limit is — *length is not the binding constraint on
  skill text* (2026-08-02)
- An edit lands correctly while a previously passing rubric item
  regresses with no textual conflict — *skill revision from the geargame
  field report* (2026-08-02)
- `delegated` appears in a real session recorded as `approved` anyway —
  *skill revision from the geargame field report* (2026-08-02)
- A prior-art survey is proposed for a problem whose answer turns on
  facts private to the project — *skill revision from the geargame field
  report* (2026-08-02)
- A checkpoint where an unstated relation between a proposal and a live
  criterion changed a decision — *skill revision from the geargame field
  report* (2026-08-02)
- Live testing shows the methodology needs constraining, or agents need
  guidance to run a usable survey — *skill revision from the geargame
  field report* (2026-08-02)
- A mechanism statement is written for an addition and names neither a
  structural defect nor a bare transcription, meaning the step produces
  ceremony rather than discrimination — *what real use has to show
  before an instruction is added* (2026-08-03)
- An addition lands whose named lack restates the behavior itself
  ("without it, the assistant did not do it"), meaning the named-lack
  bar admits circular answers — *what real use has to show before an
  instruction is added* (2026-08-03)
- A parked bare transcription recurs in a later session and nobody
  notices the park, meaning recurrence-as-tripwire has no reader — *what
  real use has to show before an instruction is added* (2026-08-03)
- The user reports having withheld a real improvement because no session
  exhibited it and the next-session route was not worth taking, meaning
  the exclusion is drawn too tight — *what real use has to show before
  an instruction is added* (2026-08-03)
- The next unprompted-form observation produces an edit that transcribes
  the behavior rather than naming the gap, meaning the asymmetry was
  recorded but not applied — *what real use has to show before an
  instruction is added* (2026-08-03)
- An addition arrives justified as a repair — a rule with no compliant
  move — with no session behind it and no contradiction quotable from
  the text, meaning the additions-only scope is being routed around —
  *what real use has to show before an instruction is added*
  (2026-08-03)
- A discussion runs the full machinery and the user afterwards states it
  was a simple requirement. Re-entry point: the over-application axis of
  the next pre-release review — *four over-application findings, no text
  added* (2026-08-03)

## Field reports and review findings are ephemeral evidence

- A session needs git history to answer a question about a resolved
  finding, meaning the resolving entry carried too little — *field
  reports are ephemeral evidence* (2026-08-02)

## Gaplessness is not the goal

- A revision adds rules and the interaction axis reports more defects
  than the revision repaired, meaning the weighting is not being applied
  — *gaplessness is not the goal; capability gaps beat conformance gaps*
  (2026-08-03)
- A capability the skill needs is missing and nobody proposes it because
  the project has become reluctant to add text, which would be this
  entry over-applied — *gaplessness is not the goal; capability gaps
  beat conformance gaps* (2026-08-03)
- A session cites a head for something the head does not state, or
  follows the referencing rule to a reference that dangles —
  *gaplessness is not the goal; capability gaps beat conformance gaps*
  (2026-08-03)

## How the decision record is kept

- An entry is written whose *Rejected* bullet a later session cannot
  use to tell a re-proposal from an idea already argued-and-lost,
  meaning the form drops too much — *the six-slot entry format is
  replaced* (2026-08-04)
- A session needs an evidence narrative the prune deleted, and the
  commit history does not answer the question — *the six-slot entry
  format is replaced* (2026-08-04)
- `CLAUDE.md` grows a justification paragraph that no entry covers —
  *the repository gets a decisions ledger* (2026-08-02)
- A session resorts to git archaeology to recover a deleted field
  report's content — *the repository gets a decisions ledger*
  (2026-08-02)
- The head contradicts a later entry, meaning the rewrite step stopped
  happening — *the repository gets a decisions ledger* (2026-08-02)

## Model tier: frontier-only is a non-goal, not a limitation

- A survey run shows a non-target tier passing every rubric item on the
  conducted scenario, which would make supporting that tier a real
  question rather than a non-goal — *frontier-only is a non-goal; survey
  mode is a capability probe* (2026-08-02)

## No delegation grant

- A session where the owner wants to hand a decision over, and its
  absence produces a worse outcome than the grant would have —
  *`delegated` is deleted, with its grant and its vocabulary*
  (2026-08-03)
- Repeated "your judgement" closures where the material-findings returns
  become the interruption the grant was meant to prevent, which would
  mean the consolidation rule is not doing the work claimed for it here
  — *`delegated` is deleted, with its grant and its vocabulary*
  (2026-08-03)
- A reader of a decision record concludes the owner weighed a decision
  they did not, which is the conceded cost surfacing as real harm —
  *`delegated` is deleted, with its grant and its vocabulary*
  (2026-08-03)
- `delegated` appears in a real session recorded as `approved` anyway
  (inherited from the 0.4 revision entry) — *`delegated` is kept; the
  grant states its boundary* (2026-08-03)
- The boundary statement becomes ceremony a user skips reading,
  observable as grants where the stated boundary is never contested and
  never consulted — *`delegated` is kept; the grant states its boundary*
  (2026-08-03)
- A delegated decision is later reversed by the user, which would mean
  the grant was mis-scoped rather than mis-executed — *`delegated` is
  kept; the grant states its boundary* (2026-08-03)

## Release mechanics

- Commits become so granular that a change's argued history is split
  across several and no single commit carries the reasoning, which would
  mean "separate by decision, not by file" is being read as "separate by
  file" — *commits happen as work completes* (2026-08-03)
- A commit lands mid-edit and leaves the tip in a state the harness
  cannot run, which would mean "stands on its own" needs a stricter test
  than the author's judgement — *commits happen as work completes*
  (2026-08-03)

## Rule triggers are written as tests

- A session where the assistant characterises the user's repetition as a
  stall and the user was signalling that a point had been missed — *six
  rule triggers that could not fire, or fired on the wrong thing*
  (2026-08-03)
- The cheap path is never taken across a revision's worth of decisions,
  meaning the source-files-only test is too strict — *six rule triggers
  that could not fire, or fired on the wrong thing* (2026-08-03)
- A prior-art survey is proposed for a question whose answer turns on
  facts private to the project, which is the over-firing the loosened
  gate risks — *six rule triggers that could not fire, or fired on the
  wrong thing* (2026-08-03)

## Structure the flow, not the content

- An edit lands that specifies what must be proposed rather than how it
  is argued and tracked — *structure the flow, not the content (recorded
  after the fact)* (2026-08-03)
- A real session produces a padded alternative traceable to a rule in
  this skill — *structure the flow, not the content (recorded after the
  fact)* (2026-08-03)

## The Language section, and its jurisdiction

- A thread closes on a qualitative claim and nothing catches it until a
  review, meaning the rule is not being applied during discussions —
  *why the skill has a Language section (recorded after the fact)*
  (2026-08-03)
- The who-consumes-it test produces an answer a contributor disputes,
  meaning the jurisdiction line is in the wrong place — *why the skill
  has a Language section (recorded after the fact)* (2026-08-03)
- A later reader has to ask what a term in this document means, which is
  the failure the vocabulary paragraph exists to prevent — *the skill is
  made to obey its own Language section* (2026-08-03)
- A rewrite reintroduces a qualitative claim as the sole justification
  for a rule — *the skill is made to obey its own Language section*
  (2026-08-03)

## The expectation set bounds the skill’s scope

- A finding dismissed as out-of-expectation reappears as a real problem
  in use, meaning the set is drawn too wide — *a documented expectation
  set bounds the skill's scope* (2026-08-03)
- The set is cited to close a finding about the skill's own internal
  consistency, which the boundary forbids and which would mean the guard
  failed — *a documented expectation set bounds the skill's scope*
  (2026-08-03)
- A user other than the author reports a working practice the set
  excludes without argument, meaning one person's habits were written as
  universal — *a documented expectation set bounds the skill's scope*
  (2026-08-03)

## The in-discussion ledger and the durable record

- A discussion loses its ledger to compaction and the assistant cannot
  reconstruct it (inherited from the state-artifact verdict) — *the
  in-discussion ledger is not the project's decision record*
  (2026-08-03)
- A user asks to continue a previous design discussion in a new session
  and the decision record proves too thin to ground it, which would
  reopen whether the no-resumption expectation is affordable — *the
  in-discussion ledger is not the project's decision record*
  (2026-08-03)
- A real discussion loses its ledger to compaction and the assistant
  cannot reconstruct it — *no durable state artifact for the thread
  ledger* (2026-08-02)
- A session proposes an open-state home in a project that already
  tracks outstanding work somewhere, meaning the discovery step is
  being skipped — *the skill gains open state* (2026-08-04)
- A record written under the shape rule omits something a later
  session needed, meaning "what the destination does not already
  state" is drawn too tight — *the skill gains open state* (2026-08-04)
- The verdict record stops being used for keep-or-change verdicts,
  meaning the scoping sentence read as a discouragement rather than a
  boundary — *the skill gains open state* (2026-08-04)

## The pre-release review

- An axis produces nothing actionable across two consecutive reviews,
  which would mean it is asking a question the documents have stopped
  being able to answer — *the pre-release review is a gate, and why it
  has the shape it has* (2026-08-03)
- Two axes repeatedly report the same findings, which would mean they
  have collapsed into one and one of them should go — *the pre-release
  review is a gate, and why it has the shape it has* (2026-08-03)

## The referencing rule

- A citation names a head section that a later revision renames or
  merges, meaning section titles are not the stable target the rule
  assumes — *citations name the head section* (2026-08-04)
- A correction lands in one document and the coherence axis finds its
  counterpart stale at the next review, meaning the "same change"
  discipline is not being applied across documents — *the coherence
  pass, and three things it found unrecorded* (2026-08-03)
- An entry cites a review finding identifier and a reader cannot tell
  what the finding said — *the coherence pass, and three things it found
  unrecorded* (2026-08-03)

## The regression harness

- A user other than the owner reports a skill behavior no session here
  ever produced, meaning usage-only necessity has started missing paths
  — *the regression harness is a canary, not a gate* (2026-08-03)
- A `full` run whose failures are mostly fixture bugs rather than skill
  regressions, meaning the canary rotted between runs — *the regression
  harness is a canary, not a gate* (2026-08-03)
- Skill text grows by several rules over a revision with no observed
  behavior change attributable to any of them, meaning the demoted veto
  has stopped filtering anything — *the regression harness is a canary,
  not a gate* (2026-08-03)

## The structure is a scaffold, and the outcome is what is guarded

- A session where the user pushed back socially rather than with an
  argument, an agent withdrew its strongest proposal, and the recorded
  defeating reason does not survive reading — *the checkpoint word, and
  the default that built what it had just refuted* (2026-08-03)
- A checkpoint batch confirmation closes a thread the user later says
  they had not read, which would mean the table is too long to be
  confirmed as one word — *the checkpoint word, and the default that
  built what it had just refuted* (2026-08-03)
- A material finding is held for irreversibility and the user reports
  the hold as obstruction, which would mean the reversal inventory is
  drawn too wide — *the checkpoint word, and the default that built what
  it had just refuted* (2026-08-03)

## What comes back after a decision

- A finding is dropped as immaterial because the assistant could not
  name what it defeats, and the user judges it should have come back —
  which would mean naming is too strict a test — *the materiality test
  is answered by naming, and three README claims are repaired*
  (2026-08-03)
- A README reader is surprised by a behavior the skill has, which would
  mean the promises are still drifting from the text — *the materiality
  test is answered by naming, and three README claims are repaired*
  (2026-08-03)
