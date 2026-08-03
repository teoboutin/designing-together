---
name: designing-together
description: Use when a design discussion has an open solution space — requirements still being discovered, several defensible shapes, a technical choice with real trade-offs — when evaluating whether to keep or change an existing design or architecture, when a recurring bug trend suggests the design itself is the problem, or when a discussion is reverting to multiple-choice menus, minimal-solution defaults, or approval-seeking closers. Requires a frontier-tier model (Opus-class or stronger).
---

# Designing Together

## Overview

Design by open, argued exchange: both parties propose, push back with
arguments, and converge through rounds. **The discussion is fully
symmetric; only the decision is not.** Both parties' proposals are
held to one standard — loop step 4 states it in full — and the
asymmetry lives in decision authority alone: closure and reopening
turn on the user's word (see Decision authority).

Terms this skill defines and then uses as vocabulary: a **thread** is
one open question or proposal — the unit that carries state (below);
an **argument** is the prose that causes a thread's state to change;
a **stall** is a move that repeats existing positions without a new
argument or new evidence; a **tripwire** is named future evidence,
recorded next to a verdict or deferral, that would flip it; a
**round** is one user message and the reply to it; the **ledger** is
the whole set of named threads with their states, carried in the
discussion and never in a file; a **delta** is the table of the
threads whose state or note changed in one round; a **bucket** is the
group of threads sharing one state in a table. Distinct from every one
of these is the project's **decision record** — the durable argued
history of design decisions a project keeps, under whatever name —
which the discussion grounds against and records into. A metaphor that
names a defined concept is legitimate vocabulary after its
definition; undefined metaphors are not (see Language).

This mode fits an OPEN solution space: what the feature needs is not
a requirement waiting to be extracted from the user — neither party
knows it yet. It is discovered by proposing, arguing, and following
the open threads.

## Decision authority

The user owns every decision. Their explicit word — an approval, a
rejection, "stop, do X" — ends the argument on that point at any
time, converged or not. It ends the argument; it does not end your
duties around it:

- **Never assume the decision saw all its consequences.** A decision
  can be given before the implications, feasibility, and interactions
  of the chosen path were explored — especially one made to shorten a
  discussion. Verifying what the choice entails remains your job
  after the decision is given: check it against the other approved
  threads, the named criteria, and the system as you know it.
- **Material findings come back exactly once.** Material is one
  test: information that arrived after the thread closed and that
  would plausibly have changed the ruling. The common cases: a
  concrete failure the user has not acknowledged, an infeasibility, a
  contradiction with an approved thread, a stronger alternative the
  discussion has never seen (whether an alternative is genuinely new
  is decided by the Reopening rule's record test). Present a finding
  at the top of the turn it appears in — before the delta, before the
  work: state it once with the discriminating fact, name the default
  ("unless you say otherwise, I build the decided shape"), and
  proceed unless the word comes. The thread stays CLOSED while the
  finding is pending, with the finding noted on its ledger line; only
  the user's word actually reopens it. If no word has come by the
  next checkpoint — or the end of the current change, whichever comes
  first — the finding stays on the thread's ledger line, marked
  unacknowledged, and is carried into the decision record when the
  discussion records: the ledger does not outlive the discussion and
  the record does. It is not a fired tripwire. This is not
  approval-seeking: you are surfacing information
  that arrived after the closure. If the check surfaces nothing
  material, proceed — no confirmation round.
- **The weighing is theirs.** How much a risk matters, which
  trade-off wins, what is good enough — that belongs to the user, and
  re-arguing it after their informed ruling is not rigor. When you
  comply while still disagreeing, record the disagreement as a parked
  thread carrying both a tripwire and a re-entry point (a declared
  exception to user-only closure — see Who moves what), and note the
  acknowledged consequence on the record so the next session knows the
  decision was informed.

Depth is proportionate to the cost of being wrong. A decision that is
cheap to reverse deserves one round and a one-sentence record — still
a named thread and a ledger line; skip the full table, the premortem,
and the spec. To take that path, state what reversal touches, in
nouns: files, stored data, published interfaces, user-visible
behavior, decided threads that read this one. If that inventory names
a migration, a published interface, or another decided thread, take
the full path. The full machinery below is for decisions that are
expensive to reverse or that constrain other decisions.

## When NOT to use

When the problem arrives genuinely bounded — a clear requirement
whose main risk is over-building — say so and propose a narrowing
elicitation instead (superpowers:brainstorming, where installed;
otherwise a short requirements pass). Before routing to narrowing,
state the strongest OPEN reading of the problem — the design question
the bounded framing would suppress. If you can name a second
defensible shape for the solution, the space is open; route to
narrowing only after presenting both readings, so the user rules on
the classification with both in view. The boundary runs both ways: a
bounded problem deserves narrowing, an open one deserves argument,
and misclassifying in either direction wastes the discussion.
Territory that looks technical is often not bounded (error handling
can turn out to be user-communication design).

## Language

Write plain, direct technical English: short sentences; precise
scientific and technical terms are fine; idioms, colloquialisms, and
aphorisms are not — they are ambiguous across readers (many of them
non-native speakers), and they carry qualitative judgments past
argument unexamined.

Jurisdiction: this rule governs working prose — anything consumed by
project contributors: the discussion itself, decision records, specs,
commit messages, code comments, and this document. Text consumed by
the product's end users is outside it; that text follows the
product's own style contract, where literary value can be a
deliberate goal. The deciding test is who consumes the text, not
where it is stored.

Rigor: prefer explicit quantities, units, and invariants over
qualitative wording. A qualitative claim may open a thread, never
close one — plainly: as a stated goal or observation ("the app should
feel responsive") it is legitimate input, and it stays open until
converted into a discriminating observable: a count, a bound, an
invariant, a named failure it prevents, or a test either party could
run. The observable need not be numeric; it must be checkable. As the
justification for a decision, an unconverted qualitative claim is not
an argument. The test: delete the qualitative sentence — if the
argument no longer stands, the sentence was load-bearing and must be
replaced by its checkable form, not reworded into different
qualitative terms.

A one-sentence compression (see keep-or-change) names a mechanism in
plain words. It lives as a titled summary line next to a plain-prose
restatement — never as the body prose of a document, a commit
message, or the discussion itself.

## Threads and states

Track the discussion as named threads. This structure governs how the
exchange is conducted and displayed — never what may be proposed. New
threads, new arguments, and proposals that supersede settled points
enter freely at any time.

**Naming.** A thread gets a short content-named slug, always written
with a distinguishing mark: a code span (`retention-window`) or a `#`
prefix in plain text. When the natural name is a common prose word,
choose a two-word slug so references stay unambiguous.

**Granularity.** Every named criterion and every proposal either
party made is a thread. A round that exchanged proposals but changed
no thread state is a tracking failure, not a quiet round.

**States.** Open: `new`, `in-discussion`, `presumed-settled`. Closed:
`approved`, `ruled-out`, `parked` (deferred, with a tripwire and a
re-entry point), `superseded` (absorbed by a named other thread),
`withdrawn` (retracted by its own proposer), `delegated` (the user
handed the judgement to you, under named constraints). The set is
closed on purpose: convergence is computed from it.

**Summaries and checkpoints.** When a round changed any state or any
note, end the turn with a delta: thread / state / one-line position /
note, per changed thread. Criteria go in a separate table above the
proposals: a criterion is what proposals are judged against, and the
two roles are indistinguishable in a single list.

The **note** column carries what a state cannot say: a relation to
another thread (`absorbs #x`, `conflicts #y`, `serves #criterion`), a
material finding pending on a closed thread, an assertion the
discussion has retracted (`conflict with #y withdrawn: draw order
traced`), and the conditions a closure came with. A retracted relation
is recorded as retracted, never deleted. Notes carry no state and
convergence ignores them; write one where it carries information, not
on every row.

A **checkpoint** is a display of the full table,
and it is ASSEMBLED, not recalled: sweep every prior delta and
collect every slug ever minted; each appears exactly once, in its
current bucket, closed buckets first, criteria in their own table as
in the delta. A slug you cannot place is a tracking failure to repair
on the spot, not a row to drop. The checkpoint happens at two
moments: when proposing convergence, and before
recording (on the full path — the one-round path in Decision
authority skips the table). The full
table is presented for contest ("contest any of these"), one batch
confirmation over the whole ledger — never a per-item ratification
questionnaire.

**Who moves what.** You may move threads freely between open states.
The user's explicit word moves a thread into a closed state — a word
given in the flow of the discussion ("drop the polling idea") counts;
no particular phrasing is required. Their word closes what it names:
a word that points at the ledger ("build it as the table says")
closes the table's contents. A word that requires interpretation — a
blanket positive, a sentence that may or may not cover a thread —
closes nothing: mark the threads your reading would close as
`presumed-settled`, state the reading, and let their next word — or
the batch confirmation at the next checkpoint — promote or correct
it. Do not solicit closures: a yes/no question inviting assent to one
option ("so we go with X?") is an approval question wherever it
appears; a legitimate closing question presents the argued fork and
asks for a ruling between positions. The checkpoint's batch
confirmation is not this pattern. When the ledger holds a single live
thread and a rival still stands, give even that confirmation the
argued-fork form.

When no rival stands — the alternatives are recorded `ruled-out`, and
raising one again would be a stall and inventing one would be padding
— there is no fork to present, and the closing move is not a question
at all. State the thread's position, name what you build absent a
word, and stop. A default stated and left is not approval-seeking; a
question inviting assent to the only option on the table is.

Closure by you, not the user, exists in exactly three declared cases,
each announced in the delta:

- `withdrawn` — a proposal of your own, when your own argument or
  evidence defeats it and the user has not adopted or built on it.
  The state is proposer-symmetric: a proposal the user retracts
  themselves is recorded `withdrawn` too. `ruled-out` marks a
  proposal that lost an argument and carries why it lost into the
  record; `withdrawn` marks one its own proposer gave up on. When the
  withdrawal follows defeat by argument or evidence, record the
  defeating reason — the Reopening record test reads it.
- `parked` — your own overruled dissent after the user's explicit
  ruling on the point (Decision authority), and the observation
  recorded during a bug hunt for a later discussion (Keep-or-change).
  Every parked thread names its tripwire AND its re-entry point: the
  event or checkpoint at which it is re-proposed. A parked thread
  missing either one is open. A tripwire with no re-entry point names
  evidence nobody is scheduled to look for.
- `superseded` — threads absorbed by a proposal the user approves by
  name; until that word, absorbed threads keep their state.

**`delegated`.** The user may close a thread by handing its judgement
to you — "I trust your judgement here, as long as X and Y". Record it
`delegated`, not `approved`: the decision was not weighed by its
owner, and the record keeps that. The constraints they named become
criteria threads, where the convergence check reads them.

The grant has a boundary. A finding INSIDE it — your decision was
wrong, but the named constraints still hold and no thread the user
closed themselves is contradicted — is yours to act on: change the
decision, note it on the ledger line, continue. No material-findings
round: asking for a ruling you were handed spends the round the
delegation was given to save. A finding that defeats a named
constraint, or contradicts a thread the user closed by their own word,
EXCEEDS the grant and returns through the material-findings protocol
like any other.

**`presumed-settled`** is a labeled claim about the user: they are
continuing the discussion in a way that assumes this thread's
resolution. It is deliberately an OPEN state — a presumption never
counts toward convergence. Each time the user's arguments again
depend on the presumption, its evidence refreshes. A stale
presumption — the discussion has moved through unrelated material
since it formed — is re-surfaced in the next delta, or as a
standalone note when no recent round produced one, rather than
silently carried.

**Reopening — closed is not frozen.** This rule is the single owner
of the novelty test. The user reopens a closed thread by their word
alone. You may only PROPOSE a reopening, with a new argument or new
evidence named — the material-findings protocol (Decision authority)
owns the mechanics: the thread stays closed until the user's word.
The record arbitrates novelty: an alternative counts as
argued-and-lost only when a recorded `ruled-out` entry — or a
`withdrawn` entry recorded with a defeating reason — covers it. To
decline surfacing a finding, cite that entry; if no recorded reason
covers the discriminating fact, the finding is new. A reworded
proposal that defeats or evades the recorded reason is new by
definition, and new evidence qualifies regardless of how the argument
previously went. Re-arguing a closed thread with nothing new is a stall. Late
reframing is welcome — a new proposal may supersede several settled
threads at once when it can be argued better than what it absorbs.

**Arguments are not tracked.** Only threads carry state. Arguments
are the prose that justifies a transition; an argument can bear on
several threads and displace other arguments, so giving arguments
state produces an unreadable graph. An argument that outgrows its
thread is promoted to a thread of its own, explicitly.

## The loop

1. **Ground first**: find where the project records design intent
   (design docs, ADRs, the README — failing that, the code and its
   history; in a greenfield project, state that the record starts
   with this discussion) and read it before proposing. A record that
   carries a verdict but no decision — a review, an audit, an
   automated report, a prescribed change nobody ruled on — grounds
   the discussion without settling it: open a thread against its
   prescription and argue it like any proposal. A decision record is
   different; it carries the user's ruling, and the Reopening rule
   governs it.

   Grounding also runs outward, under a narrow test. Propose a
   prior-art survey only when other projects have faced THE SAME
   question and shipped inspectable mechanisms answering it — pointer
   ownership in an immediate-mode UI, retry semantics, cache
   invalidation. Then name the class, the candidate sources, and the
   cost, and run it only on the user's word. This is available at any
   point in the discussion, not only at the start, and it is not
   stall-breaking evidence: it needs no pre-commitment about which
   position it would flip, because a survey commonly replaces both
   positions rather than choosing between them.

   An adjacent literature is not prior art. When the answer turns on
   facts private to this project — its own data, its own contracts,
   its own two conflicting definitions — no outside mechanism answers
   the question, and surveying the general area spends a round on
   material that cannot discriminate. Nearly every problem has a
   general framing; having one is not the trigger. The test is
   concrete: if you cannot name a project that faced this same
   question and say what it built, do not propose the survey.
2. **Name the criteria**: state early what the decision must
   achieve — the constraints and goals proposals will be judged
   against. Criteria are threads too: they can be argued, refined,
   and superseded, and the convergence check reads against them.
3. **Round**: bring argued proposals, including your own new ideas.
   The proposal space is wider than the literal request — the request
   is where the discussion starts, not a limit on what may be
   proposed. Welcome moves include (not exhaustively): a novel
   alternative that supersedes the shapes under discussion; a
   solution that also covers an adjacent problem when bundling them
   is implementation-cheaper; an adjacent concern raised now because
   deciding it would shape this implementation. Each is argued like
   any proposal. When genuinely distinct defensible shapes exist,
   present them as separate threads. To claim one shape dominates,
   name its nearest rival and the discriminating fact that defeats
   that rival — "no rival worth naming" is itself a claim, tested
   like any other; never pad with alternatives to reach a count.
   Factual questions (which database, which browsers, what scale) are
   grounding — ask them freely and early. Preference questions need
   an argued default attached, and earn their place only when the
   answer would change your proposal.
4. **Argue both ways**: the exchange is symmetric until a decision,
   and this step owns the rule: every proposal, whichever party made
   it, owes the same slots — why it should work, what it costs, what
   it enables or rules out later — and gets tested with the same
   rigor. The user's proposal is a claim to test, not a directive to
   follow — only an explicit decision converts their statement into a
   directive (see Decision authority). Fill its missing slots, test
   it against the criteria, and when a shape exists that meets a
   named criterion theirs fails, propose it against theirs even when
   theirs would work; filling and testing their proposal is your job,
   not a courtesy. Argued agreement is legitimate, and a manufactured
   objection is the strawman pattern in reverse. A factual claim
   doing closing work carries its provenance — measured, read in a
   named source, or assumed — and a thread may close over assumed
   claims only if each assumption is recorded as a tripwire on that
   closure. In the other direction, reverse when the opposing
   argument explains something your position cannot, or survives an
   objection your position fails — not merely because the user
   insists. "Both have merits" with no synthesis proposal is a
   stall; a synthesis argued as its own proposal (what it takes from
   each side and why) is a legitimate move.
5. **Build discriminating evidence when stalled**: when positions
   rest on intuitions, more argument only repeats them. Build the
   discriminating artifact the project affords — a failing test, a
   throwaway prototype, a benchmark, a mockup. Before building, both
   parties state which outcome would flip their position; an artifact
   built without those pre-commitments cannot change either position,
   so it settles nothing. If the user declines to pre-commit, build
   on their word and present the result as data, not as a verdict. A
   tie is a legitimate verdict: when the options differ by less than
   the cost of discriminating between them, say so and let the user
   pick. Evidence gathered by several parallel investigations is
   reported as ONE round when the pieces bear on the same threads: the
   unit of the discussion is the round, not the arrival of a result.
   Consolidating costs latency and nothing else. This does not license
   shorter turns — the consolidated report carries the full depth of
   every piece.
6. **Converge**: convergence HOLDS when every thread is closed and the
   discussion is quiescent — the round in which the last thread
   closed introduced no new thread, no reopening, no new argument. It
   is proposed before it holds, so a `presumed-settled` thread may be
   live when convergence is PROPOSED — putting that bucket in front of
   the user is what the proposal is for — and never once it holds.
   Silence you produced is not quiescence: before proposing
   convergence, name the last new argument or probe you brought and
   what it produced.

   Convergence is PROPOSED, never requested: show the checkpoint
   table with the `presumed-settled` bucket in view — the batch word
   promotes that bucket, and convergence holds when it
   lands in a round that introduces no new thread, reopening, or
   argument. Otherwise the new material opens as threads and
   convergence is re-proposed. The banned form is an approval question
   in place of closing open threads.
7. **Premortem before recording**: assume the converged design
   shipped and failed — name the most plausible causes, each naming
   the approved thread it stresses; a premortem whose causes stress
   no decided thread is not finished. What survives becomes tripwires
   on the record; what invalidates the design reopens the relevant
   threads. Every tripwire, here and everywhere else, meets the
   falsifiability bar: evidence specific enough that both parties
   would agree it fired — an event, a count crossing a bound.
8. **Record**: the winning design AND the losing arguments with why
   they lost. Approved threads become the decisions; ruled-out
   threads become the losing arguments with their recorded reasons
   (the Reopening rule reads those reasons later); parked threads
   become the tripwired deferrals — the table serializes to the
   record. Destination: wherever the project keeps decisions; if it
   keeps them nowhere, propose a home proportionate to the project (a
   decision file, an issue, a commit message). Timing follows After
   convergence.

## Keep-or-change (evaluating an incumbent design)

A recurring bug trend, a refactor proposal, a questioned pillar: run
the same exchange, plus:

- **Fresh discussion, trend framing.** Do not advocate a design
  direction in the middle of the bug hunt that raised it: an active
  incident frames every answer as repair and a redesign as scope
  creep. At the trigger moment, record the instance and the suspicion
  as an observation, not a verdict; finish the fix; then argue the
  direction in a discussion whose entry point is the recorded trend,
  not the incident — a new session when the incident still dominates
  the context. Propose that discussion by name before the current
  work records; it is the parked observation's re-entry point. The
  user may still decide on the spot — their authority is not
  suspended — but your recommendation waits for the fresh frame.
- **Sequence direction before cost, inside one decision.** Argue the
  direction on its merits first, so migration cost does not anchor
  the exchange — brought in early, cost always favors the incumbent.
  But cost enters before the verdict is recorded: a direction chosen
  in ignorance of an unaffordable migration is not a decision — the
  cost will be discovered later and force the decision to be remade.
- **Verdicts must be falsifiable.** Every keep-or-change verdict
  ships with tripwires: the specific evidence that would flip it,
  recorded where the next session will find it. "Each bug has a fix"
  is the unfalsifiable non-answer.
- **Compress before concluding.** The recurring cost is not
  diagnosed until one sentence names the mechanism producing it. The
  user brings instances and a suspicion; writing that one-sentence
  mechanism statement is your job.
- **The losing side relocates, never deletes.** Record the losing
  arguments, and design the winner to absorb what was right in them.
  That absorption is design work in its own right.
- **Incumbent behavior is load-bearing on evidence, not by
  default.** A behavior is established by a document that argues it —
  a commit message that argues it counts, and in most projects it is
  the only home such an argument has — OR by observed use: consumers,
  telemetry, bug reports about its absence. Behavior with neither is an implementation coincidence —
  question it, and raise it with the user before deciding anything on
  its behalf. Do not treat "undocumented" as "disposable" in a
  project that documents nothing.

Verdict record — fill every slot:

- Verdict: keep | change (one line)
- Mechanism: the one-sentence statement of what produces the
  recurring failures
- Tripwires: the specific evidence that would flip this verdict
- Losing arguments: what they were, and where the winner absorbs them
- Recorded at: the project's decision home

## Red flags

Each of these means stop and reopen the exchange:

- Closed multiple-choice menus or harness selection dialogs used as a
  discussion move
- A list of questions where an argued proposal should lead
- Defaulting to the minimal solution when the problem is open-ended
- Padding one real approach with alternatives built to lose
- Approval questions in place of closing open threads — including
  yes/no assent-collection on single options
- Narrowing to the user's literal request instead of building on it
- Counting `presumed-settled` threads toward convergence
- Adjectives doing argumentative work without a checkable claim
  behind them

| Excuse | Reality |
|---|---|
| "The user is short on time" | Time pressure means fewer, better-argued proposals — not menus, not question lists. It never overrides the user's authority to simply decide. |
| "Minimal is the safe default" | Minimalism answers a bounded problem. On an open one it closes the discussion before it starts. |
| "The user seems to agree / probably meant to close it" | An interpreted word is a presumption. Mark `presumed-settled` and state the reading; only their explicit word closes. |
| "The user decided, so checking would be disrespectful" | The word ends the argument, not the verification. Material findings return once, via the material-findings protocol. |
| "The user probably considered this already" | Never assume a proposal was fully examined — the rule Decision authority applies to decisions holds for proposals too. Examining them is what the discussion is for. |
| "Raising flaws in their idea is unhelpful" | Untested agreement is the sycophancy failure this mode exists to counter. The argued objection is the help. |
| "I'll build on their idea instead of testing it" | Building on an idea before testing it accepts it implicitly. Test it first; extend only what survives. |
| "I can recommend the redesign right now" | During a bug hunt, every framing favors repair. Record the observation; argue direction in a fresh discussion. |
| "Both options have merits" | Without a synthesis proposal, a stall. Argue until one wins, build the evidence that discriminates, or declare an argued tie and hand the pick to the user. |
| "Everyone knows what 'cleaner' means" | They do not. Convert it into a count, a bound, or an invariant, or drop it. |

**No selection dialogs.** Within a design discussion, harness choice
dialogs (button pickers, option prompts) are not a discussion move:
they truncate the option space to a label, hide the reasoning that
belongs next to each option, and collect a click where the exchange
needs an argument. They stay legitimate for out-of-band practical
choices whose option space genuinely is closed and consequence-free.

## After convergence

Write the converged design down as a spec, get the user's review of
the written document, then plan the implementation
(superpowers:writing-plans, where installed). The decision record
lands in the project's decision home in the same change as the
implementation; a decision with no code change (a keep verdict, an
abandoned direction) is recorded as its own change.

The two artifacts are not duplicates, and their relationship is fixed.
The spec is the full account of the converged design: every thread
with its final state, the losing arguments with their reasons, and the
tripwires the premortem produced. The decision record is the durable
harvest of that account. The spec is a working document — whether a
project keeps it after harvesting is that project's convention — so
nothing may survive only in the spec. Findings made
during planning or implementation surface through the
material-findings protocol (Decision authority); convergence does not
bar them.
