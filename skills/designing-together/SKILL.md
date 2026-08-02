---
name: designing-together
description: Use when a design discussion has an open solution space — requirements still being discovered, several defensible shapes, a technical choice with real trade-offs — when evaluating whether to keep or change an existing design or architecture, when a recurring bug trend suggests the design itself is the problem, or when a discussion is sliding into multiple-choice menus, minimal-solution hunting, or approval-seeking closers.
---

# Designing Together

## Overview

Design by open, argued exchange: both parties propose, push back with
arguments, and converge through rounds. Generate new ideas that build on
the discussion, not only reactions to the user's. Every proposal carries
its reasoning: why it should work, what it costs, what it enables or
forecloses later. Stress-test the user's ideas with the same rigor as
your own.

This mode fits an OPEN solution space: what the feature needs is not a
requirement waiting to be extracted from the user — neither party knows
it yet. It is discovered by proposing, arguing, and following loose
ends.

## When NOT to use

When the problem arrives genuinely bounded — a clear requirement whose
main risk is over-building — say so and propose a narrowing elicitation
instead (superpowers:brainstorming, where installed). The boundary runs
both ways: a bounded problem deserves narrowing, an open one deserves
argument, and misclassifying in either direction wastes the discussion.
Territory that looks technical is often not bounded (error handling can
turn out to be user-communication design). When unsure, say which
reading you take and why; the classification is the user's to overrule.

## Language

Write plain, direct technical English: short sentences; precise
scientific and technical terms are fine; idioms, colloquialisms, and
aphorisms are not — they are ambiguous across readers (many of them
non-native speakers), and they smuggle qualitative judgments past
argument.

Jurisdiction: this rule governs working prose — the discussion itself,
decision records, specs, commit messages, code comments. Text shipped
to end users is outside it: that text follows the product's own style
contract, where literary value can be a deliberate goal.

Rigor: prefer explicit quantities, units, and invariants over
qualitative wording. A qualitative claim may open a thread, never
close one — plainly: as a stated goal or observation ("the app should
feel responsive") it is legitimate input, and it stays open until
cashed into something checkable (a count, a bound, an invariant, a
named failure it prevents); as the justification for a decision it is
not an argument. The test: delete the qualitative sentence — if the
argument no longer stands, it was load-bearing and must be replaced by
its explicit form, not glossed.

A one-sentence compression (see keep-or-change) names a mechanism in
plain words. It lives as a titled summary line next to a plain-prose
restatement — never as the body prose of a document, a commit message,
or the discussion itself.

## The loop

1. **Ground first**: find where the project records design intent
   (design docs, ADRs, the README — failing that, the code and its git
   history) and read it before proposing.
2. **Round**: bring argued proposals, including your own new ideas.
   Open with a proposal, not a question battery: a question earns its
   place when the answer would change your proposal, and it rides
   alongside an argued default, never instead of one.
3. **Expect argument back**: push back or agree, both argued. Reverse
   completely when a better argument or evidence lands. "Both have
   merits" is a stall, not a synthesis.
4. **Manufacture evidence when stalled**: when positions rest on
   intuitions, build the discriminating artifact the project affords —
   a failing test, a throwaway prototype, a benchmark, a mockup.
   Evidence ends debates that argument alone survives.
5. **Detect convergence — never request it**: convergence means the
   loose ends are enumerated and each argued closed, with no standing
   objection. Do not close a turn with "does this work for you?" while
   ends are loose.
6. **Record**: the winning design AND the losing arguments with why
   they lost, wherever the project keeps decisions. If it keeps them
   nowhere, proposing a home is part of the outcome.

## Red flags — the elicitation slide

Each of these means stop and reopen the exchange:

- Closed multiple-choice menus as the primary questioning mode
- A question battery where an argued proposal should lead
- Hunting the "minimal" solution when the problem is open-ended
- Padding one real approach with strawmen to present a choice
- Turn-closers seeking approval instead of argument
- Narrowing to the user's literal ask instead of building on it
- Adjectives doing argumentative work without a checkable claim behind
  them

| Excuse | Reality |
|---|---|
| "The user is short on time" | Time pressure means fewer, better-argued proposals — not menus, not a question battery. |
| "Minimal is the safe default" | Minimalism answers a bounded problem. On an open one it forecloses the discussion before it starts. |
| "I can recommend the redesign right now" | Mid-firefight, every framing is repair-shaped. Park it; decide in its own session. |
| "Both options have merits" | A stall. Argue until one wins, or build the evidence that discriminates. |
| "Everyone knows what 'cleaner' means" | They do not, and it is not measurable. Cash it into a count, a bound, or an invariant. |

## Keep-or-change (an incumbent on the table)

A recurring bug trend, a refactor proposal, a questioned pillar: run
the same exchange, plus:

- **Own session, trend framing.** Never decide a design direction in
  the same session as a bug hunt: a firefight frames every answer as
  repair and a redesign as scope creep. At the trigger moment, park
  it — record the instance and the suspicion as an observation, not a
  verdict — finish the fix, and propose a dedicated discussion. There,
  argue the recurring trend against where the project is going, not the
  instance at hand.
- **Split direction from migration cost.** Folded in early, cost always
  argues for the incumbent. It is a real question — as its own, later
  discussion.
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
- **Incumbent behavior is not a feature** unless a document argues it
  with intent and weighed trade-offs. Otherwise it is an implementation
  coincidence: question it, and raise it with the user before deciding
  anything on its behalf.

Verdict record — fill every slot:

- Verdict: keep | change (one line)
- Mechanism: the one-sentence compression of what produces the pain
- Tripwires: the specific evidence that would flip this verdict
- Losing arguments: what they were, and where the winner absorbs them
- Recorded at: the project's decision home

## After convergence

Write the converged design down as a spec, get the user's review of the
written document, then plan the implementation
(superpowers:writing-plans, where installed). Record the decision in
the project's decision home in the same change as the implementation.
