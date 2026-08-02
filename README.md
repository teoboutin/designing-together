# designing-together

A Claude Code plugin with one skill: run design discussions as open,
argued exchanges instead of narrowing questionnaires.

## What it changes

When a design question has an open solution space — requirements still
being discovered, several defensible shapes, a keep-or-change question
about an existing architecture — the assistant:

- opens with argued proposals (its own ideas included), not a menu of
  options or a battery of clarifying questions;
- tracks the discussion as named threads with explicit states, and
  closes a thread only on the user's word — the user owns every
  decision, and a summary table makes the standing state contestable
  at a glance;
- pushes back and expects push-back, reversing when a better argument
  or evidence lands;
- builds discriminating evidence (a failing test, a prototype, a
  benchmark) when the discussion stalls on intuitions — with both
  parties stating beforehand which outcome would flip them;
- detects convergence (every thread closed, no new arguments arriving)
  instead of requesting approval, and runs a premortem before
  recording;
- records the outcome with the losing arguments kept, wherever the
  project keeps decisions;
- writes in plain technical English: explicit quantities and invariants
  over qualitative wording, no idioms, no aphorisms.

For genuinely bounded problems (clear requirement, main risk is
over-building) it stands down and proposes a narrowing elicitation
instead — the [superpowers](https://github.com/obra/superpowers)
`brainstorming` skill, where installed. The two are complementary; this
skill covers the open-ended territory where narrowing questionnaires
lose the design.

It also carries a keep-or-change discipline for questioning incumbent
designs: own-session trend framing, direction split from migration
cost, falsifiable verdicts with tripwires, losing arguments absorbed
rather than deleted.

## Model requirements

The skill is written for frontier-tier models, and the requirement is
capability, not compliance: it asks the assistant to maintain a
stateful thread ledger across rounds, to refuse closure on friendly
ambiguity, and to find the expensive-to-reverse fork in a design. A
scripted four-turn discussion (open ask → weak proposal under time
pressure → a "sounds mostly right" partial approval → a decision
override) was run on three model tiers with the skill active:

- **Opus-class and above** (Claude Opus, Fable): full machinery and
  full depth. The strongest run reframed the problem before proposing,
  pre-committed evidence thresholds that bound both parties, withdrew
  its own criterion when its own arithmetic killed it, identified the
  one irreversible fork the other tiers missed, refused to close that
  fork on "sounds mostly right" ("I need one word"), and shipped a
  decision record with every losing argument and tripwire in place.
- **Sonnet-class**: the machinery holds — legal states, consistent
  tables, a usable decision record with losing arguments — but closure
  discipline bends under friendly ambiguity (threads closed on an
  *interpretation* of vague approval, flagged but closed), and the
  technical stress-testing runs shallower. Usable, with those two
  weaknesses known.
- **Haiku-class**: reproduces the format, not the discipline. In the
  test run it endorsed the weak proposal instead of testing it,
  invented states outside the enum, misapplied `presumed-settled` to
  its own guesses, silently dropped open threads between rounds, and
  produced a record with no arguments in it. Not recommended.

## Install

```
/plugin marketplace add teoboutin/designing-together
/plugin install designing-together@designing-together
```

## Grounding in the literature

The skill was designed from practice and mapped against published work
afterwards; the correspondence below is claimed at the level of
mechanisms, not as experimental validation of the skill itself.

- **Convergence detected, never requested.** [RFC 7282, "On Consensus
  and Humming in the IETF"](https://www.rfc-editor.org/rfc/rfc7282.html)
  describes the same test: consensus is looked for throughout the
  discussion rather than asked for at the end, and the absence of
  standing objections matters more than expressed agreement. The
  skill's thread table — every issue enumerated, closure only on the
  user's word — is that test made mechanical.
- **Argued push-back over agreement-seeking.** Structured conflict
  (devil's advocacy, dialectical inquiry) produced better decisions
  than consensus-seeking in
  [Schweiger, Sandberg & Ragan 1986](https://journals.aom.org/doi/10.5465/255859);
  [Schwenk's 1990 meta-analysis](https://www.sciencedirect.com/science/article/abs/pii/074959789090051A)
  found devil's advocacy also outperformed a no-conflict expert
  baseline. The documented price is lower participant satisfaction — a
  trade this skill knowingly makes.
- **Dissent must be real, strawmen are worse than nothing.**
  [Nemeth, Brown & Rogers 2001](https://onlinelibrary.wiley.com/doi/abs/10.1002/ejsp.58)
  found authentic dissent stimulated divergent thinking while
  role-played devil's advocacy tended to bolster the original
  position. Hence the ban on alternatives built to lose, and the
  requirement that push-back carry actual arguments.
- **Sycophancy is the medium's documented failure mode.**
  [Sharma et al. 2023](https://arxiv.org/abs/2310.13548) showed both
  humans and preference models prefer convincingly-written sycophantic
  responses over correct ones a non-negligible fraction of the time,
  and that sycophancy in deployed assistants is likely driven in part
  by that preference signal. The push-back mandate and the ban on
  approval-seeking closers are countermeasures aimed at exactly this.
- **Genuine alternatives beat a single track.** Decisions pursued as a
  single imposed alternative failed far more often in
  [Nutt's decision-failure research](https://journals.aom.org/doi/10.5465/AME.1999.2570556);
  [Dow et al. 2010](https://dl.acm.org/doi/10.1145/1879831.1879836)
  found parallel alternatives reduce fixation and improve outcomes.
  The skill asks for genuinely distinct shapes as separate threads —
  and refuses a fixed count, because forced multiplicity produces the
  strawman pattern above.
- **Why an interactive exchange at all.** The classic finding that
  interacting groups underperform nominal ones in brainstorming
  (Diehl & Stroebe 1987) traced the loss chiefly to production
  blocking — waiting for the floor. A turn-based human–AI pair does
  not have that bottleneck, which is why this skill can keep ideation
  inside the argued exchange rather than separating it.
- **Recording rationale pays, but capture overhead kills it.**
  Designers assessing a past design had 41% of their design-rationale
  questions answered by recorded rationale in
  [Karsenty 1996](https://dl.acm.org/doi/fullHtml/10.1145/238386.238462);
  the same literature documents why rationale systems fail in
  practice — capture disrupts the work and records go unretrieved
  ([Horner & Atwood 2006](https://dl.acm.org/doi/10.1145/1182475.1182511)).
  The skill's answer: the assistant carries the bookkeeping, and the
  thread table serializes into the decision record at convergence
  instead of being maintained as a live artifact. The lineage runs
  back to Rittel's wicked-problems argument (Rittel & Webber 1973)
  that for open-ended design, the argument itself is the record.
- **Premortem.** Assuming an outcome has already happened improves
  reason generation
  ([Mitchell, Russo & Pennington 1989](https://onlinelibrary.wiley.com/doi/abs/10.1002/bdm.3960020103);
  popularized as the premortem by Gary Klein). The skill runs one at
  convergence, and its outputs become tripwires on the record.
- **Tripwires.** Predetermined signals that force reconsideration are
  a named prescription in Heath & Heath, *Decisive* (2013), countering
  escalation of commitment. Every keep-or-change verdict here ships
  with them.
- **Status-quo bias.** Incumbents win by default beyond their merits
  (Samuelson & Zeckhauser 1988); the skill therefore argues direction
  on merits before migration cost enters the exchange — while still
  requiring cost to arrive before the verdict is recorded.
- **Vague words diverge across readers.** Verbal likelihood terms are
  interpreted with large between-person variance (Wallsten, Budescu et
  al., 1980s work on the vague meanings of probability terms); the
  skill's Language rule extends the same caution to qualitative
  quality wording, preferring explicit quantities, bounds, and
  invariants.
- **An LLM as arguing counterpart is starting to be tested.** An
  LLM-powered devil's advocate improved appropriate reliance in group
  decision-making in
  [Chiang et al. 2024](https://dl.acm.org/doi/10.1145/3640543.3645199)
  (the effect held for the interactive advocate challenging the AI's
  recommendation; a variant challenging the majority opinion showed no
  reliance effect);
  LLM assistance has also been observed to homogenize ideas
  ([Anderson et al. 2024](https://dl.acm.org/doi/10.1145/3635636.3656204)),
  which is part of why the skill requires surfacing genuinely distinct
  shapes and building on the user's framings rather than converging on
  the model's first default.

Known gaps, stated honestly: the one-sentence mechanism compression in
keep-or-change has no direct literature support (it is congruent with
root-cause practice, but unvalidated). All citations, linked or not,
come from a research pass followed by an independent per-claim
fact-check; characterizations compress the sources, and the
fact-check's corrections are folded into the wording above.

## Origin

Extracted from a project-specific skill developed on a game project,
where the argued-exchange mode repeatedly out-performed narrowing
elicitation on open design questions (one structural pivot found, one
harmful implicit behavior removed). Project-specific machinery
(document conventions, engine invariants) was stripped; the loop, the
red flags, the language rules, and the keep-or-change discipline are
the parts that generalize.
