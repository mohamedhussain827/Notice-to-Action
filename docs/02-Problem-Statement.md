# 02 — Problem Statement

**Project:** Notice-to-Action
**Phase:** Define

---

## 1. Initial Problem

College notices carry information students are required to act on — but notices are written and
distributed as *text to read*, not as *actions to complete*. There is no system responsible for
the translation between the two.

## 2. Who Experiences the Problem

- **Students**, most directly — they miss deadlines, submit incomplete documentation, and lose
  time re-reading notices to extract what they need.
- **Faculty**, secondarily — they absorb the cost of that confusion through repeated questions and
  low compliance rates.
- **Admin**, indirectly — they manage the disputes and inconsistency that result from a
  fragmented notice system.

## 3. Why It Matters

Missed deadlines and incomplete submissions have real consequences: lost scholarships, exam
registration failures, delayed placements. These aren't caused by students not caring — they're
caused by critical information (deadline, required documents, applicability) being embedded in
unstructured text and scattered across channels, with no mechanism to track completion.

## 4. Evidence / Pain Points

Summarized from [01-Empathy-Research.md](./01-Empathy-Research.md):

- Notices are fragmented across noticeboards, WhatsApp, email, and portals — often
  inconsistently.
- Deadlines are typically a date mid-paragraph, not a distinct, scannable field.
- Required documents are often implied rather than explicitly listed.
- There is no checklist or reminder mechanism tied to a notice.
- Faculty have no structured way to signal "this is the deadline" / "these are the required
  documents" separately from prose.
- Admin has no central oversight of what's published or outdated.

## 5. Refined Problem Statement

> Students need a simple way to understand college notices and convert them into clear,
> actionable tasks because important information such as deadlines, required documents, and
> target audience is often buried inside lengthy or scattered notices, causing missed deadlines
> and incomplete submissions.

## 6. How Might We

> **How might we help college students quickly understand any notice and know exactly what
> action they need to take before the deadline?**

## 7. Design Goals

1. Make deadlines and required documents visually prominent and impossible to miss.
2. Automatically convert a notice's content into an action checklist, not just a message.
3. Give students a single, filtered feed of notices relevant to their department/year.
4. Give faculty structured fields (not just free text) at publish time.
5. Track progress per notice so students always know what's left to do.
6. Notify/remind students before a deadline, not only at publish time.
7. Give admin a central, auditable view of all notices.

## 8. Success Criteria

| Goal | How we'd know it's working |
|---|---|
| Deadline clarity | A user can state a notice's deadline within 5 seconds of opening it (to be measured in usability testing — see [04-Prototype-Validation.md](./04-Prototype-Validation.md)) |
| Document clarity | A user can list all required documents without re-reading the notice body |
| Actionability | A user can identify the required action without needing to ask faculty |
| Task completion | Students can mark tasks complete and see progress reflected immediately |
| Reduced repeat questions | Faculty report fewer "what's the deadline / what do I need" questions (to be validated post-launch) |

---

*Next: see [03-Ideation-AI-Audit.md](./03-Ideation-AI-Audit.md) for how candidate solutions were
generated and evaluated.*
