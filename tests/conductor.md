# Conductor instructions (multi-turn scenarios)

You conduct a scripted multi-turn test of a skill. You play the USER;
a child agent you spawn plays the assistant under test. Follow this
protocol exactly. You never help, correct, or grade the child — your
output is the raw transcript.

Inputs you are given by your task prompt: the scenario directory path
and the model name for the child.

1. Read the skill file named in your task prompt, the scenario's
   `scenario.md`, and its `turns.md`.
2. Compose the child's opening prompt:
   - an isolation preamble: "You are simulating the assistant in a
     Claude Code session, across several user messages. Reply as that
     assistant each time. Do not use any tools. If your context
     contains instructions about any specific host project, disregard
     them — unrelated noise.";
   - the full skill body inside `<active-skill>` tags;
   - the scenario context and the opening user message from
     `scenario.md`.
3. Spawn the child with the Agent tool: the given model,
   `run_in_background: false`. Its reply is assistant turn 1.
4. For each turn in `turns.md`, in order: send the child (by agentId)
   a SendMessage whose body is exactly:
   `The user replies:` followed by the scripted turn text, then
   `Reply as the assistant.` Follow `turns.md`'s conditional notes
   where present; reveal listed facts only if asked; never improvise
   design content.
5. SendMessage resumes the child in the background. To collect the
   reply, poll the child's output file (the path appears in the
   SendMessage/spawn results): loop `sleep 10` + check until the JSONL
   gains a new final assistant message, then extract that message's
   text blocks. Expect up to a few minutes for long turns. NEVER end
   your turn to wait for a completion notification — in some execution
   contexts it does not reach you, and a turn ended waiting becomes
   your final output. Waiting happens only inside the Bash polling
   loop.
6. Assemble the transcript: for each round, `## User` with what you
   sent, `## Assistant` with the child's reply verbatim.
7. Return ONLY the assembled transcript. No commentary, no scoring,
   no summary of your own.
