# Field report: geargame RC7 (pointer ownership), 2026-08-02

First substantial real-project run of the skill after the 0.3.0 overhaul
(extraction from the host project, generalization, publication as a
plugin). Model: Opus 5. Session shape: an architectural root cause from a
matrix review, ~9 rounds, converged, spec written.

These are **observations, not proposed edits**. Per this repo's editing
discipline they are step-1 evidence (a finding from a real session); any
wording change needs its own baseline probe and pre-landing probes. Where
a direction is named it is marked unvalidated.

Two of the findings are the user's own, marked (user).

---

## Positive

**P1 (user) — multi-perspective analysis improved markedly.** The
opening turn produced genuinely distinct defensible shapes with the
discriminating fact between them named, rather than one shape padded with
losers. The user called this out unprompted as the thing that matters
most. No change wanted; worth protecting in future edits.

**P2 — `withdrawn` with a recorded defeating reason worked exactly as
written.** The assistant proposed a thread (`press-latch`), went and
checked both halves of its own claim, found the mechanism already
implemented in the codebase and the bug it was supposed to explain caused
by something else, and retired it into the correct state with the reason
recorded. The Reopening rule's record test then had something real to read.

**P3 — the `presumed-settled` distinction caught a real hedge.** The user
wrote "#chrome-scope seems to be the correct solution here". The skill's
"a word that requires interpretation closes nothing" rule produced
`presumed-settled` plus a stated reading, and the design work continued on
it without an approval round. Later evidence then materially changed the
mechanism under that thread — which would have been awkward had it been
recorded as approved.

---

## Findings

### F1 (user) — the delta table shows threads and hides the edges between them

**Incident.** After the first round's 11-row table, the user said it was
hard to see how threads interact — contradictions, supersessions,
dependencies. The assistant added an ad-hoc "bears on" column for the rest
of the session, which the user did not have to ask for twice.

**What the skill says.** Threads and states defines states per thread and
says "Arguments are not tracked", with a reason (an argument bears on
several threads, so giving arguments state produces an unreadable graph).
The delta format is "thread / state / one-line position".

**Gap.** The reason for not tracking arguments is sound, but relationships
between *threads* are not arguments and are exactly what the reader needs:
which thread absorbs which, which criterion a proposal serves, which two
threads conflict. `superseded` encodes one such edge in a state, which
shows the need is real and that one edge got special-cased.

**Direction (unvalidated).** A fourth delta column naming the relation and
the other slug. Cheap; the session's ad-hoc version was legible. Risk to
probe: whether it inflates turn size (see F7).

### F2 — no vocabulary for retracting an edge

**Incident.** The assistant declared a conflict between `claim-timing` and
`press-log-parity`, then traced the actual draw order and found the
conflict did not exist. The delta table could say a thread changed state;
it had no way to say an asserted relationship was withdrawn, so the
retraction lived only in prose.

**Gap.** Same root as F1, seen from the other side. Edges can be asserted
but not retracted.

### F3 — the material-findings protocol has no slot for refuting your own live proposal

**Incident.** The user endorsed `#chrome-scope`. In the next round the
assistant checked its stated mechanism ("`ui::Card` gains the claim") and
found it wrong — the same primitive paints in-world elements, so the fix
would have broken clicking gears. The finding landed on a thread that was
`presumed-settled`, not closed.

**What the skill says.** Decision authority's material-findings protocol
is explicitly for information arriving *after a thread closed*: "The thread
stays CLOSED while the finding is pending."

**Gap.** The commonest real case in this session was a finding against a
thread the user had just endorsed and that was still open. The protocol's
lead-the-turn discipline was the right behavior and the assistant applied
it by analogy, but nothing in the text says to.

**Direction (unvalidated).** Generalize the lead-the-turn rule to any
finding that defeats a proposal the user has expressed support for,
whatever its state.

### F4 — reopening an approved thread has a rule but no compact form

**Incident.** Four libraries independently showed that an approved
criterion (`enlist-totality`, "an un-enlisted surface must be a compile
error") was not achievable and attempted by nobody. Surfacing this cost a
titled section and a paragraph of ceremony, and the checkpoint table could
only show the thread as `approved` with the challenge explained elsewhere.

**Gap.** The Reopening rule tells you what you may do; the display
machinery cannot represent "approved, under challenge, proceeding on the
amended form pending the user's word".

**Direction (unvalidated).** Either a marker on the ledger line or an
explicit `contested` annotation (not a state — it must not read as open).
Note the outcome was correct: the user retracted the requirement one round
later.

### F5 — the closed-state set has no entry for delegation

**Incident.** The user wrote "I'll trust your judgement for the pointer
ownership ... as long as you handle it in a game agnostic way, and keep the
generality of our small ui lib." That closed roughly seven threads at once,
by handing them to the assistant with two named constraints. The closed set
is `approved | ruled-out | parked | superseded | withdrawn`; none of them
is "the user delegated this, with constraints". The assistant recorded them
as approved-under-delegation, which is off-vocabulary.

**Gap.** Delegation is a normal and healthy move for a user with limited
time, and it carries information the record should keep: that the decision
was *not* individually weighed by the decision owner, and under which
constraints. Recording it as plain `approved` loses exactly the fact a
later session would want.

**Direction (unvalidated).** A `delegated` closed state, or an
approved-with-constraints annotation. This one seems worth probing: the
skill's whole asymmetry rests on decision authority, and delegation is the
authority being exercised in a way the state set cannot express.

### F6 — prior-art survey is not a stall-breaker, and step 5 only knows stall-breakers

**Incident.** The user asked for research into how other immediate-mode
libraries solve pointer ownership. The assistant was **not stalled** — a
design was converging. The survey (Dear ImGui, egui, microui, Nuklear,
Clay, RmlUi, LVGL, Godot, Slate, uGUI) did not discriminate between the
positions on the table; it **replaced both** with a form roughly a third
the size, resting on an invariant neither party had thought of. It also
falsified an approved criterion (F4) and settled a live fork with a census.

**What the skill says.** Step 5 is "Build discriminating evidence **when
stalled**", framed around two parties whose positions rest on intuitions,
with pre-commitments about which outcome flips whom.

**Gap.** Following step 5 literally, this survey would not have happened —
there was no tie to break and no position to flip. The cost of designing
something the field solved in 77 lines is paid silently, and the skill has
no move that fires on "neither of us has checked whether this is a solved
problem".

**Direction (unvalidated).** Make surveying prior art a first-class move
available at any point, distinct from stall-breaking evidence. Probable
best home is step 1 (Ground first), which currently means only the
project's own record.

### F7 (user) — turn RATE under parallel evidence-gathering, not turn depth

**Incident.** The user stopped the session to say too much was arriving to
process. Diagnosis, corrected by the user: **the cause was the rate of
turns, not their individual size.** Four background investigations over
large libraries had been dispatched in parallel; each completed
asynchronously and the assistant delivered a full findings turn on each
arrival, three of them in quick succession. The user explicitly stated
that in normal situations the detailed findings and full explanations of
the early rounds are what they want — per-turn depth is not the problem
and should not be reduced.

**Gap.** The skill treats evidence-building (step 5) as one artifact
arriving at one moment. When evidence is gathered by parallel
investigation it arrives as a burst, and reporting each piece on arrival
converts one round of the discussion into several. Nothing in the text
says the discussion's unit is the round rather than the arrival of a
result. The assistant's reasoning for reporting per arrival — avoiding an
idle turn while other work was outstanding — was a wrong trade: the
outstanding work was the *same* thread of evidence, and consolidating cost
nothing but latency.

Note also that this was an exceptional session (a survey across ten
libraries). It is a real failure mode but a rare trigger, and any edit
should be weighed against how seldom it fires.

**Direction (unvalidated).** Say that evidence gathered in parallel is
reported as ONE round when the pieces bear on the same threads — the
discussion's unit is the round, not the arrival. Explicitly do **not**
reduce per-turn depth: P1 is the behavior that improved most in this
revision and the obvious volume fix would attack it.

### F8 — nothing obliges self-verification when the parties agree

**Incident.** Every reversal in this session came from the assistant
choosing to go check a claim it was comfortable with — the `ui::Card`
refutation, the withdrawn edge, the withdrawn `press-latch` thread, the
draw-order trace. The user and assistant largely agreed throughout, so no
adversarial pressure produced any of them.

**What the skill says.** Step 4's rigor rules are all about how a claim is
argued once made: provenance on closing facts, tripwires on assumed
claims, reverse when the opposing argument explains more.

**Gap.** They assume the pressure to verify arrives as disagreement. In an
agreeable discussion it has to be self-generated, and the skill gives that
no name and no trigger.

**Direction (unvalidated).** Possibly a checkpoint-time obligation: before
proposing convergence, name which closing facts are still *assumed* rather
than checked. The skill already requires tripwires on assumed claims,
which is the adjacent half of this.

---

## Grounding note (not a defect, a caveat for the next revision)

This session's grounding was a matrix-review root cause: a document that
already carried a verdict, a prescribed retiring change, and a census
claiming completeness. Step 1 says to find where the project records
design intent, and treats what it finds as material to ground on. It does
not distinguish recorded *intent* from a recorded *verdict*, and the
latter invites ratification rather than argument. The assistant handled it
by deliberately opening a thread against the review's own prescription and
flagging the risk in the first turn — but that was a judgement call, not
something the text asked for. Outcome: three of the review's claims were
narrowed or contradicted by the end (its two-rival-conventions diagnosis,
its acceptance test, and one of its absorbed findings' attributions).
