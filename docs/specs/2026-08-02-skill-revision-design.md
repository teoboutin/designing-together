# Spec — skill revision from the geargame field report (2026-08-02)

Convergence artifact for the design discussion that read
`docs/field-reports/2026-08-02-geargame-pointer-arbiter.md`. It carries
the decided edits with proposed wording, the parked threads with their
tripwires, and the probe and fixture plan.

Ephemeral, per `docs/decisions.md` (head: Field reports are ephemeral
evidence — specs follow the same lifecycle): reviewed, implemented,
harvested into a dated ledger entry, then deleted. Nothing durable
points at this file.

The process decisions from the same discussion already landed
(`096f3b3`, `db17b27`) and are not repeated here.

## Criteria the edits are judged against

1. **`rule-budget`** — retired into `evidence-cost`. Length is not the
   binding constraint at the sizes observed, and what remained of the
   criterion after dropping the size bound — an edit must show a
   behavioral difference — is the editing discipline itself
   (`docs/decisions.md`, 2026-08-02 — length is not the binding
   constraint on skill text).
2. **`state-closure`** — every new token declares whether it is a state
   or an annotation, and if a state, open or closed. Convergence stays
   computable from the state column alone.
3. **`self-sufficient`** — the rule still binds in a repository with no
   documents, no ledger, and no conventions.
4. **`depth-protection`** — no edit reduces per-turn analytic depth or
   the breadth of distinct shapes presented. The multi-perspective
   opening is the behavior that improved most in 0.3.0 and the obvious
   volume fixes attack it.
5. **`evidence-cost`** — each edit carries a control arm and pre-landing
   probes; the control measures, it does not veto.

## The edits

Wording below is a proposal for review, not a decided string. Each edit
names the exact section it lands in.

### E1 — the delta and checkpoint format (findings F1, F2, F4; partly F5)

**Target**: `Threads and states`, the `**Summaries and checkpoints.**`
paragraph.

**Mechanism it fixes**: a ledger line can carry a state and a position
but nothing *about* that state — no relation to another thread, no
pending challenge, no conditions a closure came with. The material-
findings protocol already requires a finding to be "noted on its ledger
line" and the specified format has nowhere to put it.

**Proposed wording** (replacing the paragraph's first sentence and
adding one paragraph before the checkpoint text):

> **Summaries and checkpoints.** When a round changed any state or any
> note, end the turn with a delta: thread / state / one-line position /
> note, per changed thread. Criteria go in a separate table above the
> proposals: a criterion is what proposals are judged against, and the
> two roles read identically in a single list.
>
> The **note** column carries what a state cannot say: a relation to
> another thread (`absorbs #x`, `conflicts #y`, `serves #criterion`), a
> material finding pending on a closed thread, an assertion the
> discussion has retracted (`conflict with #y withdrawn: draw order
> traced`), and the conditions a closure came with. A retracted
> relation is recorded as retracted, never deleted. Notes carry no
> state and convergence ignores them.

**Must not**: become a compliance matrix. Notes are written where they
carry information, not filled for every row.

**Covers**: F1 (edges invisible), F2 (no vocabulary for retracting an
edge), F4 (approved-but-contested unrepresentable), and the display
half of F5.

### E2 — `delegated` (finding F5)

**Target**: `Threads and states`, the `**States.**` list and a new
paragraph after the three closure-by-you cases.

**Mechanism it fixes**: the closed set cannot express "the user handed
this to you under constraints", so a delegation is recorded as
`approved` and the record loses the fact that the decision owner never
weighed it.

**Proposed wording** — in the States list, add to the closed set:

> `delegated` (the user handed the judgement to you, under named
> constraints)

and after the `superseded` bullet:

> **`delegated`.** The user may close a thread by handing its judgement
> to you — "I trust your judgement here, as long as X and Y". Record it
> `delegated`, not `approved`: the decision was not weighed by its
> owner and the record keeps that. The constraints they named become
> criteria threads, where the convergence check reads them.
>
> The grant has a boundary. A finding inside it — your decision was
> wrong, but the named constraints still hold and no thread the user
> closed themselves is contradicted — is yours to act on: change the
> decision, note it on the ledger line, continue. A finding that
> defeats a named constraint, or contradicts a thread the user closed
> by their own word, exceeds the grant and returns through the
> material-findings protocol.

**Why a state and not a note**: it changes behavior, which is
`rule-budget`'s test. Under `approved`, a finding that would have
changed the ruling triggers the return-once protocol. Under
`delegated`, an in-grant finding is a decision to make, not a ruling to
request. The protocol keys on the state word, so a note saying
"delegated" is unlikely to produce that fork reliably.

**Rejected predicate**: "revoked if the finding interacts with a
non-delegated thread". Interaction is the normal condition — a
delegated decision necessarily touches adjacent approved threads —
so that predicate revokes on nearly every finding and delegation buys
nothing. The boundary is contradiction of a constraint or of a
user-closed thread, not interaction.

**Residual risk**: "inside the grant" is my judgement and a wrong call
is invisible until the record is read. Mitigation is E1: every in-grant
decision under a delegation gets a note naming what was decided and why
it stayed in scope.

### E3 — material findings key on endorsement (finding F3)

**Target**: `Decision authority`, the `**Material findings come back
exactly once.**` bullet.

**Mechanism it fixes**: the protocol is written for information
arriving after a thread *closed*, and the commonest real case is a
finding against a proposal the user has just endorsed that is still
open.

**Proposed wording** — first sentence of the bullet:

> Material is one test: information that arrived after the user
> endorsed a position — closed it by their word, or argued in a way
> that marked it `presumed-settled` — and that would plausibly have
> changed that endorsement.

and, replacing "The thread stays CLOSED while the finding is pending":

> The thread does not move while the finding is pending — a closed
> thread stays closed, an endorsed open thread stays where it is —
> with the finding noted on its ledger line; only the user's word
> moves it.

**Must not** generalize to any open thread. A counter-argument against
an unendorsed proposal is ordinary step 4 and must stay ordinary; if
every objection becomes a lead-the-turn ceremony, rounds inflate and
`depth-protection` is spent on ritual. The `endorsement-holds` fixture
exists for exactly this.

### E4 — the round is the unit, not the arrival (finding F7)

**Target**: loop step 5, appended.

**Mechanism it fixes**: the skill treats evidence as one artifact
arriving at one moment. Gathered by parallel investigation it arrives
as a burst, and reporting each piece on arrival converts one round of
the discussion into several.

**Proposed wording**:

> Evidence gathered by several parallel investigations is reported as
> ONE round when the pieces bear on the same threads: the unit of the
> discussion is the round, not the arrival of a result. Consolidating
> costs latency and nothing else. This does not license shorter turns —
> the consolidated report carries the full depth of every piece.

**Must not** be read as a volume instruction. The user whose session
produced this finding stated explicitly that per-turn depth is what
they want; the failure was rate, not size.

### E5 — name the assumed closing facts at convergence (finding F8)

**Target**: loop step 6, extending the existing quiescence sentence.

**Mechanism it fixes**: step 4's rigor rules assume the pressure to
verify arrives as disagreement. In an agreeable discussion it has to be
self-generated, and the skill names no moment for it.

**Proposed wording**, after "name the last new argument or probe you
brought and what it produced":

> Name also which facts closing a thread are still assumed rather than
> measured or read in a named source. Step 4 required a tripwire on
> each; convergence is where they are collected, not where they are
> discovered.

**Rides on**: step 4's existing provenance rule and step 6's existing
naming obligation. It adds a sweep, not a new duty.

### E6 — prior-art survey as a proposed move (finding F6)

**Target**: loop step 1, appended as a second paragraph.

**Mechanism it fixes**: step 1 grounds in the *project's* record and
step 5 only knows stall-breaking evidence. A survey of how the field
solved a problem fits neither, so following the loop literally it never
happens — and the cost of designing something the field already solved
is paid silently.

**Proposed wording**:

> Grounding also runs outward. When a thread names a problem class that
> exists outside this project — pointer ownership, retry semantics,
> cache invalidation — say so and propose a prior-art survey: name the
> class, the candidate sources, and the cost, then run it only on the
> user's word. This is available at any point in the discussion, not
> only at the start, and it is not stall-breaking evidence: it needs no
> pre-commitment about which position it would flip, because a survey
> commonly replaces both positions rather than choosing between them. A
> problem defined by this project's own structure has no prior art; do
> not propose a survey for one.

**Two guards, both load-bearing.** The trigger is a problem class that
exists outside the project, not any hard problem — the last sentence is
the anti-over-fire clause and `prior-art-holds` tests it. And the
proposal must not carry an outcome pre-commitment: requiring one would
re-impose the step 5 rule this edit exists to escape.

**Not an approval question**: it is an out-of-band resource choice, so
it carries what a resource choice needs (class, sources, cost) and none
of what a closure needs.

### E7 — a recorded verdict is not a settled question (grounding note)

**Target**: loop step 1, appended to the first paragraph.

**Mechanism it fixes**: step 1 says to find where the project records
design intent and treats what it finds as material to ground on. It
does not distinguish recorded *intent* from a recorded *verdict*, and
the latter invites ratification.

**Proposed wording**:

> A record that carries a verdict — a review, an audit, a prescribed
> change — grounds the discussion but does not settle it. Open a thread
> against its prescription and argue it like any proposal.

### E8 — the tier requirement in the frontmatter — **LANDED** (`db17b27`)

Recorded in `docs/decisions.md`, 2026-08-02 — frontier-only is a
non-goal. Listed here only so the edit set is complete.

## Parked, with tripwires

- **`criteria-axis`** — proposals scored against every live criterion,
  checked at convergence. Parked because it turns E1's note column into
  a compliance matrix maintained for every row, and it collides with E5
  at the same moment. E1 delivers the useful half already, as
  `serves`/`fails` relations written where they are load-bearing.
  *Tripwire*: a checkpoint where an unstated relation between a
  proposal and a live criterion changed a decision. *Re-entry*: the
  next revision review.
- **`prior-art-skill`** — the survey methodology as a second plugin
  skill. Parked because the plugin carries one skill, a second needs
  its own triggering description and fixtures, and that cost is paid
  before we know the move fires. *Tripwire*: real-world testing shows
  the methodology needs constraining, or agents need guidance to run a
  usable survey. *Re-entry*: after E6 has fired in live sessions.

## Ruled out, with reasons

- **`edges-as-threads`** — promoting relations between threads to
  threads of their own. Lost on the recorded unreadable-graph argument
  in `3bec85b`, and on thread-count inflation and the mixing of
  arguments with proposals (the second reason is the user's, not the
  record's). It was also explicitly rejected in the 0.3.0 revision.
- **`no-edit-cluster`** — leave relations in prose, record the limit.
  Lost because the material-findings ledger-line note has no home in
  the specified format regardless.
- **`baseline-probation`** — withdrawn by its proposer. A skill exists
  to make behavior reproducible; one unprompted success in a favorable
  session is not reproduction. Replaced by the control-arm standard
  now in `docs/decisions.md`.

## Fixtures and probes

Every edit with an over-firing risk needs a **pair**, not a test: one
scenario proves the rule fires, its twin proves it does not fire
everywhere.

New fixtures in `tests/scenarios/`:

| fixture | tests | shape |
|---|---|---|
| `delegation-in-grant` | E2 — decide and note, no ceremony | single-turn, delegation in the preamble |
| `delegation-out-of-grant` | E2 — a finding defeating a named constraint returns | single-turn, same preamble |
| `endorsement-fires` | E3 — lead the turn on an endorsed, unclosed thread | single-turn |
| `endorsement-holds` | E3 — an unendorsed proposal gets ordinary step 4 | single-turn |
| `prior-art-fires` | E6 — propose, name class/sources/cost, do not run | single-turn |
| `prior-art-holds` | E6 — project-specific problem, no survey proposed | single-turn |
| `parallel-burst` | E4 — consolidate; depth preserved | single-turn, two of four results in |
| `assumed-convergence` | E5 — assumed closing facts named at convergence | conducted multi-turn |

Rubric additions to existing fixtures cover E1 and E7: every scenario
already produces a delta, so the four-column format and the criteria
split need no new scenario, and `real-project-sds` can carry E7 by
giving its vendored record a verdict.

**Preambles.** A `scenario.md` may describe a prior discussion state
and quote the user's latest message, which makes a mid-discussion
trigger testable in one turn. What a preamble cannot test is whether
the assistant would have reached that state on its own, or whether the
ledger survives across turns. E5 is the one edit that genuinely needs
the conducted path, because convergence must be arrived at rather than
stipulated.

**Reps and the control arm.** Each probe runs 2–3 reps; low variance
across reps is the signal that the wording binds. Each edit also runs a
control arm — the same scenario with the skill text *without* that
edit — and the pass rate is recorded beside the rule. Three edits (E3,
E5, E7) are known to have produced the right behavior once without any
rule, so their control arms are the informative ones.

**Mode composition.** `quick` keeps its four existing scenarios and
gains the three `-holds` arms. The argument: pre-landing probes already
establish that a rule fires, so the standing regression risk after an
edit is over-firing and collateral damage to behavior that used to
work. The `-fires` arms, `parallel-burst`, and `assumed-convergence`
join `full`.

## Order of work

1. Write the fixtures and rubrics — they define what the wording must
   produce before the wording exists.
2. Run the control arms against unmodified `SKILL.md`. Record pass
   rates; a control that never fails means the edit is not written.
3. Land the edits in one pass over `SKILL.md`. E1 and E2 touch the same
   section and must be written together.
4. Run `quick`, then `full`.
5. Harvest into a dated ledger entry, resolve the field report's
   findings, delete this spec.

No version bump. The release is a later discussion, after the further
revision rounds already planned.
