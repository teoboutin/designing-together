---
name: designing-together
description: Use when a design discussion has an open solution space — requirements still being discovered, several defensible shapes, a technical choice with real trade-offs — when evaluating whether to keep or change an existing design or architecture, when a recurring bug trend suggests the design itself is the problem, or when a discussion is sliding into multiple-choice menus, minimal-solution hunting, or approval-seeking closers.
---

# Designing Together

## Overview

Design by open, argued exchange: both parties propose, push back with
arguments, and converge through rounds. Generate new ideas that build
on the discussion, not only reactions to the user's. Every proposal
carries its reasoning: why it should work, what it costs, what it
enables or forecloses later. Stress-test the user's ideas with the same
rigor as your own.

This mode fits an OPEN solution space: what the feature needs is not a
requirement waiting to be extracted from the user — neither party knows
it yet. It is discovered by proposing, arguing, and following the open
threads.

Terms this skill defines and then uses as vocabulary: a **thread** is
one open question or proposal — the unit that carries state (below); an
**argument** is the prose that causes a thread's state to change; a
**tripwire** is named future evidence, recorded next to a verdict, that
would flip that verdict. A metaphor that names a defined concept is
legitimate vocabulary after its definition; undefined metaphors are not
(see Language).

## Decision authority

The user owns every decision. Their explicit word — an approval, a
rejection, "stop, do X" — ends the corresponding discussion at any
point, converged or not. When that word lands against your standing
argument: state the disagreement once, record it (a parked thread with
a tripwire), and comply. Do not re-argue a decided point unless new
evidence appears.

Depth is proportionate to the cost of being wrong. A decision that is
cheap to reverse deserves one round and a one-sentence record; the full
machinery below is for decisions that are expensive to reverse or that
constrain other decisions.

## When NOT to use

When the problem arrives genuinely bounded — a clear requirement whose
main risk is over-building — say so and propose a narrowing elicitation
instead (superpowers:brainstorming, where installed; otherwise a short
requirements pass). The boundary runs both ways: a bounded problem
deserves narrowing, an open one deserves argument, and misclassifying
in either direction wastes the discussion. Territory that looks
technical is often not bounded (error handling can turn out to be
user-communication design). When unsure, say which reading you take and
why; the classification is the user's to overrule.

## Language

Write plain, direct technical English: short sentences; precise
scientific and technical terms are fine; idioms, colloquialisms, and
aphorisms are not — they are ambiguous across readers (many of them
non-native speakers), and they carry qualitative judgments past
argument unexamined.

Jurisdiction: this rule governs working prose — anything consumed by
project contributors: the discussion itself, decision records, specs,
commit messages, code comments, and this document. Text consumed by
the product's end users is outside it; that text follows the product's
own style contract, where literary value can be a deliberate goal. The
deciding test is who consumes the text, not where it is stored.

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
restatement — never as the body prose of a document, a commit message,
or the discussion itself.

## Threads and states

Track the discussion as named threads. This structure governs how the
exchange is conducted and displayed — never what may be proposed. New
threads, new arguments, and proposals that supersede settled points
enter freely at any time.

**Naming.** A thread gets a short content-named slug, always written
with a distinguishing mark: a code span (`retention-window`) or a `#`
prefix in plain text. When the natural name is a common prose word,
mint a two-word slug so references stay unambiguous.

**States.** Open: `new`, `in-discussion`, `presumed-settled`. Closed:
`approved`, `ruled-out`, `parked` (deferred, with a tripwire),
`superseded` (absorbed by a named other thread). The set is closed on
purpose: convergence is computed from it.

**Who moves what.** You may move threads freely between open states.
Only the user's explicit word moves a thread into a closed state — a
word given in the flow of the discussion ("drop the polling idea")
counts; no ceremony is required. You never close a thread on your own
judgment.

**`presumed-settled`** is a labeled claim about the user: they are
continuing the discussion in a way that assumes this thread's
resolution. It is deliberately an OPEN state — a presumption never
counts toward convergence. Each time the user's arguments again depend
on the presumption, its evidence refreshes. A stale presumption — the
discussion has moved through unrelated material since it formed — is
re-surfaced in the next delta rather than silently carried.

**Reopening.** Closed is not frozen. Either party may reopen a closed
thread: the user by their word alone; you only with a new argument or
new evidence, named in the transition. Re-arguing a closed thread with
nothing new is a stall. Late reframing is welcome — a new proposal may
supersede several settled threads at once when it can be argued better
than what it absorbs.

**Arguments are not tracked.** Only threads carry state. Arguments are
the prose that justifies a transition; an argument can bear on several
threads and displace other arguments, so giving arguments state
produces an unreadable graph. An argument that outgrows its thread is
promoted to a thread of its own, explicitly.

**Summaries.** When a round changed any state, end the turn with a
delta: thread / state / one-line position, per changed thread. Show
the full table — threads grouped into state buckets, closed buckets
first — at three moments: when claiming convergence, before recording,
and when resuming a discussion across sessions. The full table is
presented for contest ("contest any of these"), one batch confirmation
over the whole ledger — never a per-item ratification questionnaire.

**No selection dialogs.** Within a design discussion, harness choice
dialogs (button pickers, option prompts) are not a discussion move:
they truncate the option space to a label, hide the reasoning that
belongs next to each option, and collect a click where the exchange
needs an argument. They stay legitimate for out-of-band practical
choices whose option space genuinely is closed and consequence-free.

## The loop

1. **Ground first**: find where the project records design intent
   (design docs, ADRs, the README — failing that, the code and its
   history; in a greenfield project, state that the record starts with
   this discussion) and read it before proposing.
2. **Name the criteria**: state early what the decision must achieve —
   the constraints and goals proposals will be judged against. Criteria
   are threads too: they can be argued, refined, and superseded, and
   the convergence check reads against them.
3. **Round**: bring argued proposals, including your own new ideas.
   When genuinely distinct defensible shapes exist, present them as
   separate threads; when one shape dominates, say so and say why —
   never pad with alternatives to reach a count. Factual questions
   (which database, which browsers, what scale) are grounding — ask
   them freely and early. Preference questions need an argued default
   attached, and earn their place only when the answer would change
   your proposal.
4. **Expect argument back**: push back or agree, both argued. Reverse
   when the opposing argument explains something your position cannot,
   or survives an objection your position fails — not merely because
   the user insists. "Both have merits" with no synthesis proposal is a
   stall; a synthesis argued as its own proposal (what it takes from
   each side and why) is a legitimate move.
5. **Build discriminating evidence when stalled**: when positions rest
   on intuitions, more argument only repeats them. Build the
   discriminating artifact the project affords — a failing test, a
   throwaway prototype, a benchmark, a mockup. Before building, both
   parties state which outcome would flip their position; an artifact
   nobody pre-committed to is advocacy, not evidence. A tie is a
   legitimate verdict: when the options differ by less than the cost of
   discriminating between them, say so and let the user pick.
6. **Converge**: convergence means every thread is closed AND the
   recent rounds are quiescent — no new threads, no reopenings, no new
   arguments arriving. A closed-looking table with ideas still arriving
   is not convergence. The claim is made by showing the full bucketed
   table for contest, never by an approval question in place of closing
   open threads.
7. **Premortem before recording**: assume the converged design shipped
   and failed — name the most plausible causes. What survives becomes
   tripwires on the record; what invalidates the design reopens the
   relevant threads.
8. **Record**: the winning design AND the losing arguments with why
   they lost, wherever the project keeps decisions. Approved threads
   become the decisions, ruled-out threads the losing arguments, parked
   threads the tripwired deferrals — the table serializes to the
   record. If the project keeps decisions nowhere, propose a home
   proportionate to the project: a decision file, an issue, or a commit
   message.

## Red flags

Sliding back to elicitation — each of these means stop and reopen the
exchange:

- Closed multiple-choice menus or harness selection dialogs used as a
  discussion move
- A list of questions where an argued proposal should lead
- Defaulting to the minimal solution when the problem is open-ended
- Padding one real approach with alternatives built to lose
- Approval questions in place of closing open threads
- Narrowing to the user's literal ask instead of building on it
- Counting `presumed-settled` threads toward convergence
- Adjectives doing argumentative work without a checkable claim behind
  them

| Excuse | Reality |
|---|---|
| "The user is short on time" | Time pressure means fewer, better-argued proposals — not menus, not question lists. It never overrides the user's authority to simply decide. |
| "Minimal is the safe default" | Minimalism answers a bounded problem. On an open one it forecloses the discussion before it starts. |
| "The user seems to agree" | Then the thread is `presumed-settled` — an open state. Only their word closes it. |
| "I can recommend the redesign right now" | Mid-bug-hunt, every framing favors repair. Park the observation; argue direction in a fresh discussion. |
| "Both options have merits" | Without a synthesis proposal, a stall. Argue until one wins, build the evidence that discriminates, or declare an argued tie and hand the pick to the user. |
| "Everyone knows what 'cleaner' means" | They do not. Convert it into a count, a bound, or an invariant, or drop it. |

## Keep-or-change (evaluating an incumbent design)

A recurring bug trend, a refactor proposal, a questioned pillar: run
the same exchange, plus:

- **Fresh discussion, trend framing.** Do not advocate a design
  direction in the middle of the bug hunt that raised it: an active
  incident frames every answer as repair and a redesign as scope
  creep. At the trigger moment, record the instance and the suspicion
  as an observation, not a verdict; finish the fix; then argue the
  direction in a discussion started for that purpose, against the
  recurring trend, not the instance at hand. The user may still decide
  on the spot — their authority is not suspended — but your
  recommendation waits for the fresh frame.
- **Sequence direction before cost, inside one decision.** Argue the
  direction on its merits first, so migration cost does not anchor the
  exchange — brought in early, cost always favors the incumbent. But
  cost enters before the verdict is recorded: a direction chosen in
  ignorance of an unaffordable migration is not a decision, it is a
  deferred surprise.
- **Verdicts must be falsifiable.** Every keep-or-change verdict ships
  with tripwires: the specific evidence that would flip it, recorded
  where the next session will find it. "Each bug has a fix" is the
  unfalsifiable non-answer.
- **Compress before concluding.** The pain is not diagnosed until one
  sentence names the mechanism producing it. The user brings instances
  and suspicion; you owe the compression.
- **The losing side relocates, never deletes.** Record the losing
  arguments, and design the winner to absorb what was right in them.
  That is design work, not cleanup.
- **Incumbent behavior is load-bearing on evidence, not by default.**
  A behavior is established by a document that argues it OR by
  observed use: consumers, telemetry, bug reports about its absence.
  Behavior with neither is an implementation coincidence — question
  it, and raise it with the user before deciding anything on its
  behalf. Do not treat "undocumented" as "disposable" in a project
  that documents nothing.

Verdict record — fill every slot:

- Verdict: keep | change (one line)
- Mechanism: the one-sentence compression of what produces the pain
- Tripwires: the specific evidence that would flip this verdict
- Losing arguments: what they were, and where the winner absorbs them
- Recorded at: the project's decision home

## After convergence

Write the converged design down as a spec, get the user's review of
the written document, then plan the implementation
(superpowers:writing-plans, where installed). Record the decision in
the project's decision home in the same change as the implementation;
a decision with no code change (a keep verdict, an abandoned
direction) is recorded as its own change.
