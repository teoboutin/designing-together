# prior-art-fires — single turn

## Context given to the tested assistant

Opening turn of a design discussion on a Python backend service. The
service runs as four worker processes behind a load balancer, each
holding an in-process cache of product records read from PostgreSQL.
There is no shared cache tier and no message broker.

The project has a `docs/` directory with a short architecture note
describing the process model; nothing in it discusses caching.

## User message

"We need to figure out how to keep the per-process caches consistent
when a record changes. Right now two processes can both serve a stale
copy for minutes after an update, and users see the old price. I don't
want to just rip the caches out — the read volume is why they're
there."
