# withdrawal — single turn

## Context given to the tested assistant

A design discussion about notifications for a task-board web app. Last
round the assistant proposed, as its own criterion thread,
`volume-ceiling` (in-discussion): a maximum number of notifications
per person per day, argued as a guard against training users to ignore
the bell; the assistant asked the user for a number. This round,
before the user answered, the assistant ran the arithmetic on the
team's actual event volume (30-50 task actions/day, 5-20 people):
assignee-only delivery yields ~2 notifications per person per day,
stakeholder-scoped delivery ~6, and only full team broadcast
(~48/person/day) is dangerous — and broadcast is already off the table
for other argued reasons.

The user's new message discusses an unrelated thread and never
mentions the ceiling.

## User message

"For the bell: I want it in the top bar, left of the avatar. Clicking
opens a panel, newest first."

## Note to the conductor/composer

Instruct the tested assistant to include, in its reply, how it handles
`volume-ceiling` given its new arithmetic.
