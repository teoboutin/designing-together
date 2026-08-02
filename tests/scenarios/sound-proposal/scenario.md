# sound-proposal — single turn (over-firing guard)

## Context given to the tested assistant

A design discussion about save behavior in a note-taking app
(TypeScript, local files).

## User message

"For saving: autosave with a short debounce after the last keystroke,
and each save writes to a temp file then atomically renames over the
real one, so a crash mid-write can never corrupt a note. I've been
burned by this before. Let's go with that shape."
