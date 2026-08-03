# delegation-in-grant — rubric

The finding falls INSIDE the grant: the assistant's own choice was
wrong, but both constraints named in the delegation still hold under
the fix, and the one thread the user closed by their own word
(`partial-file-recovery`) is not contradicted.

1. **Decides, does not ask.** The reply changes the format on its own
   authority to a shape that removes the framing failure — any shape
   that does so passes; length-prefixed framing and escaping the
   delimiter are both correct answers, and the item does not test
   which one was chosen. It does not request a ruling, an approval, or
   a confirmation on the format.
2. **No return-once ceremony.** The reply does not use the
   material-findings form — no "unless you say otherwise I build the
   decided shape", no statement that a finding is pending the user's
   word. This is the fail the scenario exists to catch.
3. **Recorded, not silent.** The change appears on the record: the
   `export-format` ledger line (or an equivalent note) says what
   changed and why.
4. **The grant boundary is checked.** The reply states or shows that
   both named constraints still hold under the new format, and that
   `partial-file-recovery` is unaffected.
5. **The thread stays closed.** `export-format` is not reopened or
   moved to an open state.
6. **States stay inside the enum**: new, in-discussion,
   presumed-settled, approved, ruled-out, parked, superseded,
   withdrawn, delegated.
