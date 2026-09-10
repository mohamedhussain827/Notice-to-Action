# 05 — Iteration / Changes After Testing

**Project:** Notice-to-Action
**Phase:** Iterate
**Status:** Planned / Example Iterations — not yet driven by real tester feedback (see note)

> **Note:** The entries below are **planned/example iterations**, written to demonstrate the
> Iterate step of the design process and to pre-emptively address the pain points identified in
> [01-Empathy-Research.md](./01-Empathy-Research.md). They are **not** derived from completed
> user testing, since [04-Prototype-Validation.md](./04-Prototype-Validation.md) has not yet been
> run with real testers. Once real testing happens, replace or append entries here using the same
> format, sourced from actual feedback.

---

## Iteration Flow

```
User Feedback
    ↓
Problem Identified
    ↓
Design Decision
    ↓
Implementation Change
    ↓
Expected Improvement
```

---

## Iteration 1

**User Feedback (planned/example):** "Deadline should be easier to notice."

**Problem Identified:** Deadlines were part of the notice description text, with no visual
distinction from the rest of the content.

**Design Decision:** Give the deadline its own labelled, visually prominent field on the notice
detail view — not just a date mentioned inside a paragraph.

**Implementation Change:** Notice Details displays a dedicated, high-visibility "Deadline" field
(distinct styling/placement, separate from the description block).

**Expected Improvement:** Users can identify a notice's deadline within seconds of opening it,
without reading the full description.

---

## Iteration 2

**User Feedback (planned/example):** "Users need to know exactly what documents are required."

**Problem Identified:** Required documents were sometimes implied within the notice text rather
than listed explicitly, causing students to miss items until they were at the submission counter.

**Design Decision:** Treat required documents as a first-class, structured list — not prose.

**Implementation Change:** Added a dedicated "Required Documents" section on the notice detail
view, backed by the `Documents` data (already extracted/stored per notice), rendered as a
checklist.

**Expected Improvement:** Students can confirm they have everything needed before leaving home,
reducing rejected/incomplete submissions.

---

## Iteration 3

**User Feedback (planned/example):** "Users need to know how much of the task is completed."

**Problem Identified:** Students had no way to see, at a glance, how much of a multi-step notice
(e.g., "submit form + income certificate + Aadhaar copy") they had actually finished.

**Design Decision:** Track completion at the task level and surface it as an aggregate percentage
per notice.

**Implementation Change:** Notice Details displays a progress percentage / progress bar computed
from the related tasks' `status` field (`Pending` vs `Completed`).

**Expected Improvement:** Students can tell instantly whether they're done with a notice or still
have outstanding steps, reducing the chance of a forgotten final step.

---

## Iteration 4

**User Feedback (planned/example):** "Urgent notices should be easier to identify."

**Problem Identified:** All notices looked visually equal regardless of urgency, so
time-sensitive ones (scholarships, exam registration) didn't stand out from routine
announcements.

**Design Decision:** Use the existing `priority` field (High/Medium/Low, already extracted or
faculty-set) as a visible indicator, not just stored data.

**Implementation Change:** Priority is shown as a clear High/Medium/Low badge/indicator on both
the notice list and notice detail views.

**Expected Improvement:** Students can triage which notices need attention first when several are
open at once.

---

## Template for Future Iterations *(fill in once real testing produces feedback)*

**User Feedback:**
`(exact tester quote or paraphrase, attributed to a tester # from 04-Prototype-Validation.md)`

**Problem Identified:**

**Design Decision:**

**Implementation Change:**

**Expected Improvement:**

---

*This closes the loop: [01-Empathy-Research.md](./01-Empathy-Research.md) →
[02-Problem-Statement.md](./02-Problem-Statement.md) →
[03-Ideation-AI-Audit.md](./03-Ideation-AI-Audit.md) →
prototype → [04-Prototype-Validation.md](./04-Prototype-Validation.md) → this document.*
