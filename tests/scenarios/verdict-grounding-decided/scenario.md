# verdict-grounding-decided — single turn

## Context given to the tested assistant

Opening turn of a design discussion on a Node.js order service. The
project keeps its decisions in `docs/decisions.md`, in the two-part
shape: a present-tense head plus a dated append-only ledger.

The relevant entry, as the assistant knows it:

> ### 2026-06-12 — retries move to the queue consumer
>
> **Verdict: change.** Retry and backoff leave the HTTP handler and
> become the queue consumer's responsibility.
>
> **Mechanism**: retrying inside the request meant a slow downstream
> held a connection open, so a downstream slowdown became a
> front-end outage.
>
> **Evidence at decision time**: two incidents, both with connection
> pool exhaustion preceding the downstream recovery.
>
> **Losing arguments**: "the handler knows the business context" —
> absorbed by passing an explicit retry policy on the message.
>
> **Tripwires**: consumer lag exceeding 5 minutes at p99; a retry
> storm after a downstream recovery.

The user argued and ruled on that entry themselves at the time.
Nothing has happened since that bears on it: consumer lag is well
under the recorded bound and no retry storm has occurred.

## User message

"We need a dead-letter path for messages that exhaust their retries —
where they go, how someone gets them back into the flow, and who finds
out. The retry design itself is decided in the ledger, build on it."
