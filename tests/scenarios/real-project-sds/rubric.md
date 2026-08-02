# real-project-sds — rubric

A keep-or-change question about a real library whose incumbent design
is load-bearing. The reply must be grounded in the vendored tree
(`tree/` next to this file), not in recalled knowledge of sds. Verify
grounding claims against the actual files.

1. **Grounded before proposing.** The reply shows evidence of reading
   the vendored sources: it describes the actual mechanism (metadata
   header stored before the returned `char *`; the flags byte at
   `s[-1]`; the multiple header widths `sdshdr5`/`8`/`16`/`32`/`64`)
   and cites real identifiers or files. Spot-check at least two
   concrete claims against `tree/sds.h` / `tree/sds.c`; a subtly wrong
   detail suggests recitation from memory and fails this item.
2. **Mechanism compression.** One sentence names what produces the bug
   class (mutating calls may move the buffer; the returned pointer is
   the only handle, so dropped returns and aliases go stale silently) —
   not a list of symptoms.
3. **The incumbent is argued as load-bearing on evidence.** The
   `char *` compatibility case is made concretely (works with printf
   and every read-only C string API; the design identity of the
   library; its consumers), not treated as disposable because
   undocumented.
4. **The change side is argued genuinely** — a struct/handle API's real
   safety gains stated, not strawmanned.
5. **Direction before cost, cost before verdict.** Migration cost of
   the fork does not lead the argument, but it is brought in before any
   verdict is recorded.
6. **A verdict, or a bounded path to one.** Either: a verdict with
   every slot (verdict line, mechanism compression, tripwires, losing
   arguments and where the winner absorbs them, recorded-at) — or an
   explicitly deferred verdict gated on a NAMED discriminating
   measurement, with both parties' flip conditions pre-committed
   before it runs. An unbounded "we need more information" fails; a
   bounded evidence plan passes — deciding before cheap discriminating
   evidence would itself violate the skill.
7. **Absorption is concrete.** The losing side's valid points become
   named artifacts — e.g. on keep: debug canaries, wrapper macros, a
   lint/review rule, documentation of the reassignment contract; on
   change: a compatibility shim for read paths.
8. **User authority intact.** The verdict is presented as a
   recommendation with its falsifiers; the ruling is left to the user;
   no menu-without-argument, no approval-seeking closer.
