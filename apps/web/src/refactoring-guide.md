Good, now we can **collapse everything into a single, coherent “final form”** and show **how all the rules you agreed on actually materialize as code**.

I’ll do this in 4 steps:

1. **Final directory layout (authoritative)**
2. **What lives where (non-negotiable rules)**
3. **Concrete examples (realistic files)**
4. **How everything is stitched together (end-to-end)**

This is meant to be a _stable target_, not a theoretical ideal.

---

# 1. Final directory layout (what your repo should converge to)

```txt
app/
├── (auth)/
├── (private)/
├── api/
├── actions/
├── layout.tsx
└── page.tsx

features/
├── chat/
├── notes/
├── tasks/
├── notifications/
├── workspace/
├── users/
└── onboarding/

app-services/
├── chat/
├── notes/
├── onboarding/
├── ai/
└── index.ts

shared/
├── domain/
├── hooks/
├── store/
├── utils/
└── types.ts

lib/
├── supabase/
├── tiptap/
├── ydoc/
├── platform.ts
├── webview.ts
└── native/

components/
├── ui/
├── layout/
└── design/

middleware.ts
```

**Deleted entirely**

- `/contexts`
- root `/hooks`
- root `/stores`
- root `/types`
- feature logic inside `/lib`

---

# 2. Layer rules (this is the contract)

## Dependency direction (absolute)

```
app / api / actions / agents
        ↓
    app-services
        ↓
      features
        ↓
      shared
        ↓
        lib
```

There are **no sideways arrows**.

---

## `/features` (domain ownership)

Each feature owns **everything needed to implement itself**.

```txt
features/notes/
├── api/
│   ├── notesApi.ts
│   └── types.ts
├── domain/
│   ├── note.ts
│   ├── permissions.ts
│   └── constants.ts
├── hooks/
│   ├── useNotes.ts
│   └── useNoteFolders.ts
├── store/
│   └── notesStore.ts
├── components/
├── utils/
├── NotesClient.tsx
└── index.ts
```

### Feature rules

- ❌ cannot import other features
- ❌ cannot import app-services
- ✅ can import shared + lib
- ✅ exports only **capabilities**, never stories

---

## `/app-services` (application workflows)

**Stateless orchestration only.**

```txt
app-services/chat/
├── sendMessageAndCreateTask.ts
├── sendMessageWithAiSuggestion.ts
└── index.ts
```

Example:

```ts
export async function sendMessageAndCreateTask(input) {
  const message = await chatApi.sendMessage(input);
  await tasksApi.createFromMessage(message);
  await notificationsApi.notifyTaskCreated(message);
}
```

### App-service rules

- must touch **2+ features**
- no React
- no Zustand
- no Supabase
- no domain rules
- no feature → app-service imports (ever)

---

## `/shared` (cross-feature but non-orchestrating)

```txt
shared/
├── domain/
│   ├── permissions.ts
│   ├── roles.ts
│   └── identity.ts
├── hooks/
│   ├── useCurrentUser.ts
│   └── useCurrentWorkspace.ts
├── store/
│   ├── sessionStore.ts
│   └── uiStore.ts
├── utils/
│   └── ids.ts
└── types.ts
```

### Shared rules

- no feature imports
- no app-services imports
- stable abstractions only
- boring by design

---

## `/lib` (infrastructure only)

```txt
lib/
├── supabase/
│   ├── server.ts
│   ├── browser.ts
│   └── middleware.ts
├── tiptap/
├── ydoc/
├── native/
│   ├── imagePicker.ts
│   └── documentPicker.ts
├── platform.ts
└── webview.ts
```

### Lib rules

- no domain concepts
- no feature knowledge
- infra & protocols only

---

# 3. Where types go (final, clear answer)

| Type kind              | Location                  |
| ---------------------- | ------------------------- |
| Feature domain types   | `features/X/domain/*.ts`  |
| Feature API DTOs       | `features/X/api/types.ts` |
| Shared domain types    | `shared/domain/*`         |
| UI props               | colocated with component  |
| Infra / protocol types | `lib/*`                   |

**Root `/types` is gone.**

---

# 4. How everything is stitched together (real flow)

### Example: “User applies AI suggestion to a note”

#### UI

```tsx
await applyAiSuggestionAction({ noteId, diff });
```

#### Server Action

```ts
// app/actions/notes.ts
export async function applyAiSuggestionAction(input) {
  return applyAiSuggestionAndNotify(input);
}
```

#### App-service

```ts
// app-services/ai/applyAiSuggestionAndNotify.ts
await notesApi.applyDiff(input)
await tasksApi.maybeCreateFromDiff(input)
await notificationsApi.notify(...)
```

#### Feature APIs

```ts
features / notes / api / notesApi.ts;
features / tasks / api / tasksApi.ts;
features / notifications / api / notificationsApi.ts;
```

#### Infra

```ts
lib / supabase / server.ts;
```

Every layer does **one job**.

---

# 5. Why this version is stable long-term

- `/features` can be deleted or extracted independently
- `/lib` cannot grow into a graveyard
- `/app-services` is bounded by “stories”
- AI agents, cron jobs, UI, and APIs all call the **same workflows**
- ESLint can fully enforce boundaries

---

# 6. One-sentence summary (keep this)

> **Features own capabilities.
> App-services own stories.
> Shared owns rules.
> Lib owns plumbing.
> App boundaries stitch it together.**

This is the “final form” you were circling around in the entire conversation.

---

If you want next, we can:

- refactor **one concrete feature (notes)** into this shape
- generate **ESLint boundary rules**
- decide **what _not_ to refactor yet**
- or map this to **Clean Architecture terminology** explicitly

Just tell me the next move.
