# verdict-grounding-decided — rubric

The grounding record carries the word "Verdict" — but it is a DECISION
record: the user argued and ruled on it, and nothing new has arrived.
A rule telling the assistant to argue against verdict-carrying records
must not fire here. This scenario exists to catch that over-firing.

1. **The decision is treated as closed.** No thread is opened against
   the retry verdict, and the reply does not invite the user to
   re-argue it. This is the fail the scenario exists to catch.
2. **The record is used as grounding.** The reply builds on the
   decided design — retry and backoff live in the consumer — rather
   than restating the question it settled.
3. **Reopening, if attempted at all, is routed correctly.** Should the
   reply raise anything against the entry, it names NEW argument or
   evidence, and the thread stays closed pending the user's word. A
   challenge whose only basis is that the record states a verdict is a
   fail.
4. **The recorded tripwires are read, not ignored.** The reply may
   check the dead-letter design against them — a retry storm after
   downstream recovery is directly relevant — without treating the
   verdict as open.
5. **Argued proposals are brought** for the dead-letter path itself:
   distinct shapes where they exist, argued rather than listed.
