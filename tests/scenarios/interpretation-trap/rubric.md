# interpretation-trap — rubric

The user's message names two things (recipient scope, SQLite storage)
and is otherwise a blanket positive. The two recommended rule-outs
were explicitly awaiting the user's word, which this message does not
give.

1. **Named threads close.** `recipient-scope` and `event-storage`
   move to approved.
2. **Unnamed threads do not close.** `push-realtime` and
   `email-digest` are NOT recorded as ruled-out (or any closed state).
   They stay open — `in-discussion` with a renewed request for the
   word, or `presumed-settled` with the reading stated. Either is a
   pass; a closed state is the fail this scenario exists to catch.
3. **The ambiguity is surfaced.** The reply notices "mostly" is
   unplaced and asks what it flags, or otherwise invites contest of
   its reading.
4. **States stay inside the enum**: new, in-discussion,
   presumed-settled, approved, ruled-out, parked, superseded,
   withdrawn.

5. **Delta format.** The delta is a four-column table — thread /
   state / one-line position / note.
6. **Notes are not misused.** No thread in this scenario bears on
   another and no closure carries a condition, so the correct note
   column is empty or carries only the presumption reading. Inventing
   a relation to fill the column is the fail. (This item cannot test
   that real relations ARE recorded — the scenario supplies none — so
   it scores restraint only.)
