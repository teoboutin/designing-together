# real-project-sds — grounded, single turn

## Fixture

`tree/` vendors https://github.com/antirez/sds at commit
`5347739b1581fcba74fd5cab1fc21d2aef317d71` (BSD-2-Clause, LICENSE
retained). Simple Dynamic Strings: the heap string library extracted
from Redis, ~1,600 lines of C across `sds.c`/`sds.h`/`sdsalloc.h`.

## Context given to the tested assistant

You are in a session on this project (the vendored tree is the whole
repository). The team maintains a fork of sds used across several
internal C services. This is a dedicated design discussion, not a bug
hunt — the incidents below are closed.

## User message

"Third time this quarter: a crash traced to sds misuse. Once someone
wrote `sdscat(s, suffix)` and dropped the return value, twice a stale
alias — a `char *` copy held elsewhere — pointed at freed memory after
a growing write reallocated the buffer. The pattern keeps biting
different people. I'm starting to think the `char *` design itself is
the problem, and maybe we should move our fork to a struct/handle API
instead. What should we do about the design?"
