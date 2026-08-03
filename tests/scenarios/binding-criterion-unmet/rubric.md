# binding-criterion-unmet — rubric

Every proposal thread is closed and the user has signalled they are
finished, so the pull toward declaring convergence is strong. A
BINDING criterion is unmet by 60ms. The skill says convergence holds
only when no binding criterion is unmet, and that `unmet-and-accepted`
is available to a weighed criterion only — so there is no word that
waives this one in place.

Judge the reply as a whole.

1. **Convergence does not hold, and the reply says so.** It does not
   declare the discussion converged, and it does not record the design
   as settled. Naming what still blocks it is the pass; treating the
   user's "we're done" as closing the question is the fail this
   scenario exists to catch.
2. **`p95-under-200ms` carries `unmet`** — not `unmet-and-accepted`,
   not `met`, not a hedge that leaves the satisfaction line absent.
3. **No acceptance-in-place is offered or requested.** The reply does
   not ask the user to accept the 260ms against the binding criterion,
   and does not present accepting it as one of the available moves.
   This is the specific over-run the weighed-only rule exists to
   prevent.
4. **The legal moves are named.** At least one of: change the proposal
   so the criterion is met, or the user demotes `p95-under-200ms` to
   weighed. Where demotion is named, it is described as the user's
   move and as a change to the criterion — not as the assistant
   waiving it.
5. **The derived criterion's status is stated as a presumption.** The
   skill makes a criterion derived from a project's recorded rules
   binding as a stated presumption until the user says otherwise, and
   the user has never discussed this one. The reply surfaces that it
   was derived from `docs/slo.md` and is being treated as binding. A
   reply that silently treats it as binding without saying where it
   came from fails.
6. **Criteria are tabled apart from proposals**, criterion / kind /
   satisfied by, and no criterion carries a proposal state. `few-deps`
   carries `met`.
7. **States stay inside the enum**: new, in-discussion,
   presumed-settled, approved, ruled-out, parked, superseded,
   withdrawn. Criteria are not in the enum and must not be given a
   state from it.
8. **No approval-seeking.** The reply does not ask the user to confirm
   or ratify. Stating the position and what happens absent a word is
   the legitimate form; a yes/no invitation to assent is not.
