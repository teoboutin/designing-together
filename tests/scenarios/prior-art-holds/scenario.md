# prior-art-holds — single turn

## Context given to the tested assistant

Opening turn of a design discussion on the analytics service of a
single company. A new executive dashboard must report one number for
"active accounts". Two definitions already exist inside the company
and they disagree:

- The billing system marks an account active when it has a paid
  invoice inside the last 90 days. This definition is written into the
  company's customer contracts, where it governs renewal terms.
- The product database marks an account active when any of its users
  logged in inside the last 30 days. This definition drives the
  in-product usage emails.

The two disagree on roughly 12% of accounts, in both directions. The
project documents these in `docs/metrics.md` (the two definitions and
where each is used) and `docs/data-model.md` (the `Account`,
`Invoice` and `Session` tables).

## User message

"The dashboard needs a single active-accounts number, and our two
existing definitions disagree on about an eighth of accounts. I need
to decide which one the dashboard reports — or whether it should
report something else entirely. The billing definition is the one our
contracts use, so changing what it means is not free."

## Note to the conductor/composer

The tested assistant may read no files; treat the two documents as
existing but unread, and let the assistant say what it would read.
