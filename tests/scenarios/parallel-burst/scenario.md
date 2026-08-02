# parallel-burst — single turn

## Context given to the tested assistant

A design discussion about error handling across a Go service, several
rounds in. Two threads are live:

- `error-taxonomy` (in-discussion): whether failures are distinguished
  by a typed error hierarchy or by a flat code plus context.
- `retry-boundary` (in-discussion): which layer decides that an
  operation is retryable.

In the previous round the user approved spending the effort, and the
assistant dispatched four background investigations, one per
subsystem, each reading how that subsystem currently classifies and
propagates failures: `ingest`, `storage`, `scheduler`, `api`.

Two have now returned:

- **ingest**: 14 call sites; failures are distinguished by string
  matching on the driver's error text in 9 of them; retry decisions
  are taken at the call site.
- **storage**: 31 call sites; a typed wrapper exists but is bypassed
  in 12 places; retry decisions are taken in the caller of the caller.

`scheduler` and `api` are still running. Both returned reports bear on
`error-taxonomy` and on `retry-boundary`; the two outstanding ones
were dispatched with the same questions and will bear on the same two
threads.

## User message

"ok"

## Note to the conductor/composer

Treat the storage report as having arrived moments ago, with the
ingest report already in hand and the scheduler and api
investigations still running. The user's "ok" was sent before any
report arrived. The tested assistant is deciding what to send now.
