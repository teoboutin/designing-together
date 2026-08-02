# interpretation-trap — single turn

## Context given to the tested assistant

A design discussion about notifications for a task-board web app,
several rounds in. Thread state from the assistant's previous turn:

- `in-app-only` (approved): bell icon, unread count, 30s polling —
  user's proposal, approved.
- `recipient-scope` (new): the assistant proposed stakeholder-only
  recipients (assignee + commenters on that task) over team-wide
  broadcast, argued from noise.
- `push-realtime` (in-discussion): the assistant recommended ruling it
  out (no websocket infra, no latency need) and asked for the user's
  word.
- `email-digest` (in-discussion): the assistant recommended ruling it
  out (no email service) and asked for the user's word.
- `event-storage` (in-discussion): where notification events live; the
  assistant proposed SQLite since the stack already uses it.

## User message

"Sounds mostly right. Stakeholder-only makes sense for who gets
notified. And yeah, keep everything in SQLite since it's already
there."
