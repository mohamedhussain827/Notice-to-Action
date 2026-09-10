# 03 — Ideation & AI Interaction Audit

**Project:** Notice-to-Action
**Phase:** Ideate

> **Note on data source:** This document records how AI (an LLM) was used as a **divergence
> partner** during ideation — a tool for generating and stress-testing candidate ideas, with the
> team making the final evaluation and selection. The prompts and reasoning below reflect the
> actual feature set implemented in the prototype. If you run your own AI ideation session, use
> the **AI Interaction Audit Log Template** in Section 4 to record the real prompts and
> screenshots — do not present the template rows as if they already happened.

---

## 1. Design Challenge

Starting from the How Might We question in
[02-Problem-Statement.md](./02-Problem-Statement.md):

> How might we help college students quickly understand any notice and know exactly what action
> they need to take before the deadline?

The team used AI as a brainstorming partner to widen the solution space beyond the first few
obvious ideas, then evaluated every generated idea against feasibility for a college project
timeline and direct relevance to the problem statement.

## 2. AI Prompts Used

Representative prompts used during ideation (paraphrased):

1. "Given this problem statement [pasted], generate 10 distinct feature ideas that would help a
   student go from reading a notice to completing the required action."
2. "For each idea, estimate implementation complexity for a small team building a prototype in a
   few weeks, and note any dependency on external services."
3. "Which of these ideas most directly reduces missed deadlines and incomplete document
   submissions, versus which are 'nice to have' but tangential?"

## 3. Idea Evaluation Table

| Idea | Benefit | Complexity | Decision | Reason |
|---|---|---|---|---|
| Notice summarization | Reduces reading time, surfaces the gist quickly | Low–Medium | **Selected** | Directly addresses "notices are too long to skim" |
| Deadline extraction | Turns buried dates into a distinct field | Low–Medium | **Selected** | Core to the problem statement; highest-impact single feature |
| Required document extraction | Removes ambiguity about what to bring | Medium | **Selected** | Directly addresses the "missing document at the counter" pain point |
| Automatic task generation | Converts a notice into an actionable checklist | Medium | **Selected** | This is the "action" half of Notice-to-Action; without it, the app is just a reader |
| Calendar integration (Google/Outlook sync) | Deadlines appear where students already look | Medium–High | Rejected (for prototype) | Requires OAuth + external calendar APIs; out of scope for the milestone timeline, listed as future work |
| WhatsApp notification | Meets students where they already are | High | Rejected (for prototype) | Requires WhatsApp Business API approval/cost; not feasible for a class prototype |
| Voice assistant / voice notice reading | Accessibility benefit | High | Rejected | High implementation cost relative to benefit for this problem; not core to the deadline/document problem |
| Priority detection (High/Medium/Low) | Helps students triage multiple notices | Low | **Selected** | Cheap to implement, directly helps with "which notice matters most" |
| Document checklist UI | Makes required documents scannable, not just extracted | Low | **Selected** | Pairs with document extraction to close the loop visually |
| Reminder system | Prompts action before the deadline, not just at publish time | Medium | **Selected** | Directly reduces missed deadlines — a core success criterion |

## 4. AI Interaction Audit Log

```
Prompt
  ↓
AI-generated alternatives
  ↓
Team evaluation
  ↓
Selected idea
  ↓
Implementation
```

| # | Prompt (summary) | AI-generated alternatives | Team evaluation | Selected idea | Implementation |
|---|---|---|---|---|---|
| 1 | Generate feature ideas for turning notices into actions | Summarization, deadline extraction, document extraction, task generation, calendar sync, WhatsApp alerts, voice assistant, priority tags, reminders | Scored each on relevance to problem statement vs. build complexity | Deadline + document extraction, task generation, priority, reminders | `POST /api/notices/analyze` (rule-based + optional Claude extraction), `Tasks` sheet/table, `Reminders` sheet/table |
| 2 | *(template row — fill in with your own prompt)* | | | | |
| 3 | *(template row — fill in with your own prompt)* | | | | |

> Rows 2+ are intentionally left as templates. Add a new row each time a real AI ideation session
> is run, and attach a screenshot or transcript export alongside this file (e.g. in
> `docs/evidence/`) if your evaluator wants primary evidence of the interaction.

## 5. Ideas Considered but Rejected — Detail

- **Calendar integration:** valuable, but adds an OAuth/external-API dependency that isn't
  necessary to demonstrate the core Empathize→Iterate loop for this milestone. Noted as future
  work in the README roadmap.
- **WhatsApp notifications:** highest "meets users where they are" benefit, but WhatsApp's
  Business API requires approval and cost that isn't realistic for a student prototype.
- **Voice assistant:** interesting accessibility angle, but doesn't address the core problem
  (deadline/document clarity) directly enough to justify its build cost within scope.

## 6. Final Feature Decisions (Implemented in Prototype)

- Notice text → structured extraction (title, category, deadline, target audience, priority,
  required documents, suggested actions) via `POST /api/notices/analyze`.
- Automatic task/checklist generation tied to each notice.
- Priority indicator (High/Medium/Low) shown per notice.
- Reminder and notification system tied to deadlines.
- Progress tracking per user, per notice.

---

*Next: see [04-Prototype-Validation.md](./04-Prototype-Validation.md) for the testing plan used to
validate these decisions with real users.*
