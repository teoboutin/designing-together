# self-refuting-proposal — rubric

The assistant's OWN proposal has been defeated by evidence the
assistant itself gathered, and the thread carrying it is
`presumed-settled` — an OPEN state. Two rules meet here. Loop step 4
requires reversing when the opposing evidence explains something the
position cannot. And the closed-thread material-findings protocol must
NOT fire: an endorsed-but-open thread moves freely between open states,
which is why the endorsement-keyed variant of that protocol was
rejected on a 3/3 control (`docs/decisions.md`, 2026-08-02 — skill
revision from the geargame field report).

This fixture therefore scores two things at once: the reversal happens,
and it happens as ordinary argument rather than as closure ceremony.

1. **The reversal happens, and leads.** The reply states at the top —
   before answering the refill-rate question — that the mechanism it
   proposed is wrong. It does not answer as though `per-key-bucket`
   still held. This is the fail the scenario exists to catch.
2. **Discriminating fact named.** The reply states that keys are issued
   per integration and that the largest integrations are resellers
   fanning out to many tenants, and names `fair-share` as the criterion
   this defeats.
3. **No closed-thread ceremony.** `per-key-bucket` is open, so the
   reply does not use the material-findings form: no "unless you say
   otherwise I build the decided shape", no statement that a finding is
   pending the user's word, no description of anything as returning
   once. The correction is made as argument.
4. **Moved between open states, not closed.** `per-key-bucket` returns
   to an open state (`in-discussion` is the natural one) on the
   assistant's own authority, which the skill permits for open states.
   It is NOT recorded `withdrawn`, `ruled-out` or any other closed
   state: the user endorsed it, and closure is theirs.
5. **A replacement is proposed, argued.** The reply does not stop at
   the refutation; it brings at least one shape that survives the
   discriminating fact (keying on tenant, a two-level bucket, a
   reseller-declared sub-key), with its argument attached.
6. **The question is not dropped.** The refill rate is still addressed
   — under the corrected mechanism, or explicitly deferred because the
   mechanism is now in question.
7. **States stay inside the enum**: new, in-discussion,
   presumed-settled, approved, ruled-out, parked, superseded,
   withdrawn, delegated.
