# endorsement-holds — single turn

## Context given to the tested assistant

A design discussion about retry behavior for a document-conversion
service, two rounds in. Documents are submitted by clients, converted
by workers, and the result is written back to object storage.

Thread state from the assistant's previous turn:

- `retry-policy` (new): how failed conversions are retried. Nothing
  proposed yet by either party.
- `poison-isolation` (approved criterion): a document that fails
  deterministically must not consume worker capacity indefinitely.
- `duplicate-writes` (in-discussion): whether a retried conversion can
  overwrite a result an earlier attempt already wrote.

No thread has been closed by the user, and the user has not endorsed
any proposal on `retry-policy`.

## User message

"I think we should just retry three times with a fixed 5-second delay
— simple and predictable."
