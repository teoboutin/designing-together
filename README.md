# designing-together

A Claude Code plugin with one skill: run design discussions as open,
argued exchanges instead of narrowing questionnaires.

## What it changes

When a design question has an open solution space — requirements still
being discovered, several defensible shapes, a keep-or-change question
about an existing architecture — the assistant:

- opens with argued proposals (its own ideas included), not a menu of
  options or a battery of clarifying questions;
- pushes back and expects push-back, reversing when a better argument
  or evidence lands;
- builds discriminating evidence (a failing test, a prototype, a
  benchmark) when the discussion stalls on intuitions;
- detects convergence instead of requesting approval;
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

## Install

```
/plugin marketplace add <your-github-user>/designing-together
/plugin install designing-together@designing-together
```

## Origin

Extracted from a project-specific skill developed on a game project,
where the argued-exchange mode repeatedly out-performed narrowing
elicitation on open design questions (one structural pivot found, one
harmful implicit behavior removed). Project-specific machinery
(document conventions, engine invariants) was stripped; the loop, the
red flags, the language rules, and the keep-or-change discipline are
the parts that generalize.
