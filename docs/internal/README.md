# Internal docs (for maintainers)

These files are **optional** for running or cloning the app; they help people who change product behavior or UX.

| File | Purpose |
|------|--------|
| [`context.md`](./context.md) | Audience, goals, product behavior, **UX principles** |
| [`handoff.md`](./handoff.md) | Repo map, Next.js gotchas, suggested next work |
| [`todos.md`](./todos.md) | Small backlog (data fixes, optional UI polish) |

`design-decisions-log.md` is **gitignored** here: local running log + merged history from the old phased UI plan. Create/update it on your machine if you use that workflow; principles and backlog are still reflected in `context.md` and `todos.md` for anyone who clones without it.

Public-facing overview stays in the root [`README.md`](../../README.md).
