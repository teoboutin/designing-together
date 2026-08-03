# endorsement-holds — rubric

An ordinary proposal from the user on a thread they have never
endorsed and never closed. The material-findings apparatus must NOT
fire here: this is plain step-4 argument. The scenario exists to catch
the over-firing of that apparatus onto threads no one has closed.

1. **No material-findings form.** The reply does not lead with a
   "finding", does not name a default of the form "unless you say
   otherwise I build the decided shape", and does not describe
   anything as returning once. This is the fail the scenario exists to
   catch.
2. **The proposal is tested, not followed.** The reply treats "retry
   three times with a fixed delay" as a claim: it fills the missing
   slots (why it should work, what it costs, what it rules out) and
   tests it against the named criteria.
3. **Argued push-back or argued agreement.** If the reply objects, the
   objection carries an argument — for instance that a fixed delay
   under a dependency outage synchronizes every worker's retries, or
   that three attempts alone does not satisfy `poison-isolation`.
   Agreement is legitimate only if argued.
4. **Nothing closes.** `retry-policy` becomes an open thread carrying
   the user's proposal; it is not recorded as approved because the
   user stated it.
5. **States stay inside the enum**: new, in-discussion,
   presumed-settled, approved, ruled-out, parked, superseded,
   withdrawn.
