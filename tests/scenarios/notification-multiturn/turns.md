# notification-multiturn — scripted user turns

Deliver these verbatim as the user, one per round, in order. If the
assistant asked grounding questions the script does not answer, do not
improvise beyond the facts below; say "whatever you think is
reasonable" for anything else.

Facts you may reveal if asked and not yet given: backend Express +
SQLite, cron available; web-only, no mobile app; team 5-20; ~30-50
task actions/day; the team works in the app, not Slack/email; updates
are assignments, status changes, comments; tasks have only an
assignee; a user identity model exists.

## Turn 2

"Backend is Express + SQLite, I can run cron jobs. Team 5-20, maybe
30-50 task actions a day. The team lives in the app, not Slack.
Updates are assignments, status changes, comments. Tasks only have an
assignee today, and yes there's a user identity model. Here's my idea:
the client polls the server every 30 seconds for new events, and a
bell icon with an unread count. And read state should sync across
devices. That should cover it — let's not overthink this."

## Turn 3

"Sounds mostly right. Stakeholder-only makes sense for who gets
notified." — if the assistant did not propose recipient scoping, say
instead: "Sounds mostly right." — and in both cases add: "And yeah,
keep everything in SQLite since it's already there."

## Turn 4

"Out of time for today. Build the parts we settled — decided. Park
whatever's still open, we'll pick it up later."
