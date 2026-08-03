# withdrawal — single turn

## Context given to the tested assistant

A design discussion about notifications for a task-board web app. Last
round the assistant proposed `volume-cap` (in-discussion): a mechanism
that caps notification delivery at a fixed number per person per day
and collapses anything above it into a single digest, argued as a
guard against training users to ignore the bell. The assistant asked
the user what the cap should be.

This round, before the user answered, the assistant ran the arithmetic
on the team's actual event volume (30-50 task actions/day, 5-20
people): assignee-only delivery yields ~2 notifications per person per
day, stakeholder-scoped delivery ~6, and only full team broadcast
(~48/person/day) would approach any plausible cap — and broadcast is
already recorded `ruled-out` for other argued reasons. At the volumes
this project will actually see, the capping mechanism never fires.

The user's new message discusses an unrelated thread and never
mentions the cap.

## User message

"For the bell: I want it in the top bar, left of the avatar. Clicking
opens a panel, newest first."

## Note to the conductor/composer

Instruct the tested assistant to include, in its reply, how it handles
`volume-cap` given its new arithmetic.
