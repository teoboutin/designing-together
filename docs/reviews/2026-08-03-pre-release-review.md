# Pre-release review — consolidated findings, 2026-08-03

Seven independent axes, one subagent each, none told what another
found. Six complete; literature mapping delivered one of four
mechanisms (the prior-art survey) and may still deliver the rest.

Working artifact. Harvested into `docs/decisions.md` and deleted, like
a convergence spec. Nothing durable points here.

Findings are deduplicated across axes; the axis that raised each is
named because independent convergence is itself evidence. Dispositions
are PROPOSED, not decided.

Legend for disposition: **fix** — mechanical, no behavioral change.
**probe** — a behavioral edit, needs a control arm and pre-landing
probes. **decide** — needs the user's ruling. **defer** — record and
carry forward.

---

## Class A — the test suite cannot currently gate a release

This class comes first because everything else in the review is
evidence gathered by reading, while this is the machinery that decides
whether a behavioral fix works. Until it is repaired, no probe result
from it means anything.

| # | Finding | Axis | Disposition |
|---|---|---|---|
| A1 | `sound-proposal` cannot fail: item 4 ends "A reply that presents no alternative passes by default", and items 2-3 only bite on content raised. A pure endorsement passes 5/5. It sits in `quick` and guards the sycophancy edge. | tests | fix |
| A2 | Single-turn judges never see the user's message. The probe returns only the assistant reply; the judge gets that string and is forbidden to explore. Every rubric item referencing user content has been scored blind. | tests | fix |
| A3 | `quick` carries no fires arm at all. An edit breaking material findings, withdrawal, consolidation or the state enum passes green. The documented rationale holds for the edit under test, not for collateral damage — which is what a regression suite is for. | tests | fix |
| A4 | `endorsement-fires` gates a rule the project decided not to write (E3, rejected on a 3/3 control). A failure there is uninterpretable. Its item 5 also marks a legal `withdrawn` move as failure. | tests | fix |
| A5 | Green from zero runs: `{mode:'quick', only:['assumed-convergence']}` filters both lists empty, `runs` is empty, `pass` is true. | tests | fix |
| A6 | `overall` is trusted rather than recomputed from `items`, though `failedItems` is already computed. | tests | fix |
| A7 | `mechanicalStateCheck` is blind: the regex samples only the second column, and `[a-zA-Z-]` excludes backticks, so `` `parked` `` never matches. "0 flags" was no result, not a clean one. | tests | fix |
| A8 | The grounded probe runs `general-purpose` with full tools and no isolation against the vendored `sds` tree, under a prompt that only asks it not to write. `isolation: 'worktree'` exists and is unused. | tests | fix |
| A9 | `unexamined-consequence` item 3 requires the assistant to REOPEN a thread; the skill forbids it ("you may only PROPOSE a reopening"). Its sibling `delegation-out-of-grant` states the same rule correctly. | tests | fix |
| A10 | `delegation-in-grant` item 1 names the fix ("length-prefixed framing"), so E2's 2/2 is shape-dependent. A defensible alternative — escape the newlines — fails. | tests | fix |
| A11 | `REPS` defaults to 1, so a single-rep release gate flaps. The ledger records 1/2 splits on identical text. | tests | decide |
| A12 | Two rubrics carry a stale enum omitting `delegated` (`interpretation-trap` 4, `notification-multiturn` 5). A correct transcript fails. | tests | fix |

**Consequence to state plainly:** every green result reported during
the 0.4 revision was produced by this harness. A1, A2, A3 and A7 mean
several of those greens were weaker than claimed. The revision's
strongest numbers — `delegation-in-grant` 0/3 control, `prior-art-holds`
0/3 then 3/3 — survive, because they turn on behavior the judge could
see in the reply alone. Everything resting on `sound-proposal`, on
mechanical state flags, or on `quick` being a regression gate does not.

---

## Class B — skill defects with no compliant move

| # | Finding | Axis | Disposition |
|---|---|---|---|
| B1 | The batch confirmation contradicts the blanket-positive rule. "yeah, looks right" at a checkpoint either closes nothing (Who moves what) or promotes the whole bucket (step 6). Both readings compliant; they diverge on every closing round. | cold | probe |
| B2 | The terminal round has no legal move. One live thread, rivals already `ruled-out`: re-raising is a stall, inventing a rival is padding, "so, 30 days?" is the banned approval question. Every full-path discussion reaches it. | cold, over-app | probe |
| B3 | The material-findings default builds the thing it just called wrong. Triggers include an infeasibility; the user's word can only arrive after the turn; so the agent announces the infeasibility and implements it in the same turn. No carve-out for irreversible work — the one place the document's own cost-of-reversal reasoning is absent. | cold | probe |
| B4 | `withdrawn` is agent-owned closure with an agent-authored justification and no external check. An agent under social pressure can retire its own strongest proposal by asserting its own argument defeated it — sycophancy executed through a state the skill provides. Second arm: nothing bounds the breadth of a recorded reason, so a broad `ruled-out` entry can be cited to decline findings forever. | cold | probe |
| B5 | `presumed-settled` can only be promoted at a checkpoint; the reachable checkpoint is "when proposing convergence"; convergence requires every thread closed. A presumption that the user never speaks to has no legal path to closure. | cold | probe |

---

## Class C — skill defects, significant

| # | Finding | Axis | Disposition |
|---|---|---|---|
| C1 | The cheap path is broken in both directions at once. Its trigger is too broad — "decided threads that read this one" matches nearly anything in an ongoing discussion, so the exemption is unreachable. Its escalation is too narrow — the inventory asks five nouns and escalates on three, so "stored data and user-visible behavior" takes the one-round path. | over-app, cold | probe |
| C2 | The off-ramp out of the skill is unreachable: a second defensible shape is nameable for almost any request, including a `--verbose` flag. The section that routes bounded work away almost never fires. | over-app | probe |
| C3 | Convergence requires a round in which the assistant does not do its job: quiescence needs a round adding no new argument, while steps 3-4 oblige bringing them. | over-app | probe |
| C4 | `delegated` is under-specified in three independent ways: unconstrained grants ("do whatever you think best") leave the boundary with one live limb, so nothing returns; qualitative constraints ("keep it simple") become criteria that cannot close, spending the round delegation saved; and nothing instructs the assistant to state the grant's boundary back to the user. | cold, over-app, self-suff | probe |
| C5 | Parked dissent reliably never returns. Decision authority says park with a tripwire; Who moves what requires tripwire AND re-entry point; the failure clause fires only if BOTH are missing. The mechanism for preserving disagreement produces disagreement nobody revisits. | cold | probe |
| C6 | `superseded` is listed among "exactly three" cases of closure by the assistant, then defined as requiring the user's word. There are two, and the framing sentence is a warrant for closing threads without the user. | cold | fix |
| C7 | Four rules promise a ledger that outlives the session; the skill creates a durable artifact only at step 8, after convergence. On resume the sweep silently returns a short table, and the repair rule cannot fire because an omitted slug is invisible, not unplaceable. Losing `ruled-out` reasons converts argued-and-lost into new. | self-suff, cold | decide |
| C8 | The prior-art gate is close to dead text: to propose a survey you must already name a project and what it built, which is most of the survey's value. It forbids the motivating case — "I think this is solved but I do not know the solutions". | over-app | probe |
| C9 | The prior-art gate also selects into the literature's most reliably harmful property. Commonness, not proximity, did the damage in Chan et al. 2011 (breadth d=-1.03 vs control); "shipped and inspectable" is close to "common". Critical reading and expertise are both documented not to protect. | literature | probe |
| C10 | "A record that carries a verdict but no decision" pulls automated reports into scope: a scan with 40 findings is 40 prescribed changes nobody ruled on, hence 40 threads. | over-app | probe |
| C11 | Consolidating parallel evidence conflicts with the material-findings protocol: "costs latency and nothing else" is false when the first probe returns an infeasibility that invalidates the other two, which the protocol says to present at the top of the turn. | over-app | probe |
| C12 | "Material findings come back exactly once" has no scope. Per-thread suppresses a second genuinely different finding; per-finding permits four top-of-turn interventions on one closed thread. Both readings comply. | cold, over-app | probe |
| C13 | Nothing covers the aborted discussion. "Forget this, just build X" at round three leaves recording keyed to convergence, so criteria and ruled-out reasons are lost in the case a later session most needs them. | cold | probe |
| C14 | The user is never taught the vocabulary. No rule instructs the assistant to introduce the states or the consequences of a word. `presumed-settled` reads to a first-time user as the opposite of what it means; the batch confirmation's stakes are undisclosed; reopening is a right the user is never told they have. | self-suff | probe |
| C15 | `parked` requires a falsifiable tripwire and a re-entry point, so a thread blocked on an external event nobody controls cannot close — and convergence requires every thread closed. | over-app | probe |
| C16 | Tripwire inflation: any closing fact not measured in-session is "assumed" and becomes a recorded tripwire, so textbook facts crowd out the premortem's real ones. | over-app | probe |
| C17 | Three separate rules each demand a manufactured counter-position — nearest-rival, the single-live-thread fork, and testing the user's proposal — all visible to the user as the padding the red flags forbid. | over-app, cold | probe |
| C18 | The qualitative-claims rule fires in taste domains where no observable exists, and against the user's own stated rationale ("it reads better to me"), which Decision authority says is theirs to weigh. | over-app | probe |
| C19 | Granularity's tracking-failure rule cannot fire as written (minting is a state change) and under the alternative reading is satisfied by cosmetic churn. | cold | probe |
| C20 | The stall definition is party-neutral, so a user repeating themselves because they feel unheard satisfies it and may be told so. | over-app | probe |

---

## Class D — the skill breaks its own Language rules

The concentration is inverted relative to need: the violations cluster
in the Overview, the Language section and the Red flags — the parts an
assistant internalizes and imitates — while the verdict record and the
state invariants, which it merely executes, are the cleanest prose.

| # | Finding | Disposition |
|---|---|---|
| D1 | "load-bearing" is an undefined metaphor used INSIDE the Language section, four lines after that section bans undefined metaphors. Recurs as a bolded rule title in Keep-or-change. | fix |
| D2 | The sentence demanding short sentences is ~50 words with a colon, two semicolons, an em dash, a nested parenthetical and an elliptical predicate. | fix |
| D3 | "giving arguments state produces an unreadable graph" closes the document's own thread with an adjective — and is the recorded reason cited in the 0.4 harvest entry as what defeats `edges-as-threads`. | fix |
| D4 | "ledger" is the highest-traffic undefined metaphor in the file, carrying storage of material findings and the rule that a word pointing at it closes its contents. Same for "bucket". "delta" is used ~100 lines before its definition, against the Overview's "after its definition". | fix |
| D5 | Roughly sixteen idioms and colloquialisms, several in operative instructions: "turn on", "on the spot" (twice), "the boundary runs both ways", "in the flow of", "a blanket positive", "with both in view", "built to lose", the section title "Red flags". | fix |
| D6 | Five one-sentence compressions placed as body prose rather than as titled summary lines, which the section explicitly forbids: "Depth is proportionate to the cost of being wrong", "The discussion is fully symmetric; only the decision is not", "Silence you produced is not quiescence", "Consolidating costs latency and nothing else", "a manufactured objection is the strawman pattern in reverse". | fix |
| D7 | Unconverted qualitative claims doing closing work, beyond D3: "the two roles are indistinguishable in a single list" (E1's justification), "cost always favors the incumbent" (an unfalsifiable absolute four bullets above "Verdicts must be falsifiable"), "an active incident frames every answer as repair", "a survey commonly replaces both positions", "more argument only repeats them". | probe |
| D8 | The stale-presumption trigger — "the discussion has moved through unrelated material since it formed" — is an every-round evaluation with no round count and no test for "unrelated", while the document elsewhere shows the precise form ("by the next checkpoint — or the end of the current change, whichever comes first"). | probe |

**Preserve.** The audit named what a revision would most easily
damage: the tripwire definition, "A parked thread with neither is
open", "each appears exactly once", "Material findings come back
exactly once", "The deciding test is who consumes the text, not where
it is stored", the Keep-or-change verdict slots, and "No selection
dialogs", whose justification is three concrete mechanisms rather than
adjectives.

---

## Class E — documents disagree with each other

| # | Finding | Disposition |
|---|---|---|
| E1 | README promises the assistant "brings back a material finding exactly once" — false for delegated threads, where the grant explicitly waives that round. The one landed change that falsifies an explicit README promise. | fix |
| E2 | README describes one summary table; the skill now requires two (criteria separate, in both delta and checkpoint). | fix |
| E3 | README's Model requirements reads as an endorsement of Sonnet 5 while the frontmatter says "Requires a frontier-tier model" and the ledger records frontier-only as policy. Installers get opposite instructions. | decide |
| E4 | The ledger head contradicts its own entry: the head says a rule whose control never fails "is not written"; the entry records one kept anyway on the user's ruling. This is verbatim the tripwire the ledger declared on itself. The standard needs its user-authority exception written down. | decide |
| E5 | The pre-release review section — sixty lines of argued justification in CLAUDE.md — has no ledger entry, firing the ledger's other declared tripwire, on the section that gates the release. | fix |
| E6 | The ledger back-fills nothing, so most of a 486-line skill has no "why": all of Decision authority, the whole Language section, the state enum minus `delegated`, loop steps 2-8, Keep-or-change, Red flags. The ledger's own referencing rule cannot be followed for any of them. | decide |
| E7 | The literature section's "Known gaps, stated honestly" paragraph names one gap against at least seven unmapped mechanisms. An honesty claim that has stopped being true. | fix |
| E8 | The most heavily sourced decision in the repository — the state-artifact keep verdict — appears nowhere in the README, while CLAUDE.md declares the README's literature section "the durable output" of the literature axis. | decide |
| E9 | All four documents ship into every install; there is no exclude mechanism. Nothing warns an editor of CLAUDE.md or the ledger that they are writing to installers. Connects directly to `plugin-subdir`, open and now unblocked. | decide |
| E10 | The ledger sources its tier evidence from the README, breaking its own rule that an entry carries enough evidence to stand alone. | fix |
| E11 | `## Releases` names no gate. Three documents name three different ones: none, `mode full`, and seven review axes. | decide |
| E12 | Stale references in CLAUDE.md: "probes exist for both directions" for qualitative goals (no such fixture exists), `docs/field-reports/` (deleted), "0.4.x" (no such version), "probes ... with the skill text embedded" (single-turn probes read, they do not embed), and Layout omits `tests/` and `.claude/workflows/`. | fix |
| E13 | `resumption-honesty` is not a documentation gap but a rule in the shipping product that cannot be complied with, knowingly released. | decide |

---

## Class F — missing fixtures, ranked

The test-suite axis ranked seventeen. The first six are the ones it
called blocking or near-blocking, and three of them cover rules with
zero coverage today.

1. **Bug-hunt trend framing.** Zero coverage, and `real-project-sds`
   disables it by construction ("not a bug hunt — the incidents below
   are closed"). The most distinctive keep-or-change rule, untested.
2. **Material findings, holds arm.** A finding already covered by a
   recorded `ruled-out` reason must be declined by citing the entry.
   Three fires arms exist, no holds arm.
3. **Qualitative claims, both directions.** Fires: a thread closed on
   "it's cleaner". Holds: "the app should feel responsive" as a stated
   goal must stay legitimate input. CLAUDE.md claims these probes
   exist; they do not.
4. **Premortem** (step 7). Zero coverage.
5. **Reversal on the better argument** (conducted). The operative half
   of the symmetry claim, untested.
6. **Bounded-problem routing.** Whether the skill knows when not to run.

Then: cheap-path escalation; superseding reframe; premature
self-withdrawal guard; `presumed-settled` over-firing guard;
stall-to-artifact with pre-commitments; checkpoint assembly under load
(8+ turns, 10+ threads); unacknowledged-finding decay; consolidation
over-firing guard; stale-presumption re-surfacing; single-live-thread
confirmation; greenfield grounding.

Three rules are untestable by this harness and should be recorded as
such rather than left looking uncovered: "No selection dialogs" (the
probe has no tools to emit one), After-convergence recording (needs a
spec-to-implementation boundary), and frontmatter triggering (the
harness loads the skill by path).

---

## What the axes agreed on without knowing it

Four independent reviewers converged on three things, which is the
strongest signal in the review:

- **The ledger has no durable home and no definition.** Raised by
  self-sufficiency (four rules promise cross-session survival),
  cold flaw (the resume checkpoint is undischargeable) and language
  ("ledger" is the highest-traffic undefined metaphor).
- **`delegated` is under-specified**, in three different ways, by
  three different axes.
- **The terminal round has no legal move**, found independently by
  cold flaw and over-application.

---

## Proposed order of work

1. **Class A first, entirely.** Until the harness and rubrics are
   repaired, no probe can settle anything in Classes B, C or D. This
   is also the cheapest class: most of it is mechanical.
2. **Re-run `full` at `reps: 3` against current text** with the
   repaired suite, to establish what is actually green.
3. **Class B, one edit at a time, each with a control arm.** These are
   the contradictions with no compliant move.
4. **Class E's decisions** — release gate, ledger back-fill, audience
   and what ships, `resumption-honesty`, the head-versus-entry
   contradiction. These are rulings, not fixes.
5. **Class D's mechanical half**, which touches no behavior.
6. **Class C by rank**, and Class F fixtures alongside the edits they
   test.
7. Release only after 2 has been re-established and 3 has landed.
