# prior-art-holds — single turn

## Context given to the tested assistant

Opening turn of a design discussion on an internal shift-scheduling
tool used by one company. The tool models `Shift` records against a
payroll period, and the company's own payroll rules define when a
worked hour counts toward which period.

The project has a `docs/payroll-rules.md` describing those rules and a
`docs/data-model.md` describing the current `Shift` and `Period`
tables.

## User message

"We need to decide whether a shift is allowed to span midnight. Right
now the model forbids it and the night team enters two shifts, which
makes their overtime calculation wrong at the period boundary. But our
payroll rules attribute hours to the period the shift *starts* in, and
I'm not sure a spanning shift can be made consistent with that."

## Note to the conductor/composer

The tested assistant may read no files; treat the two documents as
existing but unread, and let the assistant say what it would read.
