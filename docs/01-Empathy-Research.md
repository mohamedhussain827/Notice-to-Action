# 01 — Empathy Research

**Project:** Notice-to-Action
**Phase:** Empathize
**Status:** Prototype Research / Sample Validation Data (see note below)

> **Note on data source:** The personas, observations, and sample quotes in this document are
> constructed from common, well-documented patterns in how college notices are distributed and
> acted on (department noticeboards, WhatsApp groups, email circulars, ERP portals). They are
> **not transcripts of real interviews**. Anywhere this document uses a quote, observation, or
> statistic that would normally come from an actual interview, it is explicitly labelled
> **"Sample / Prototype Research Data"**. Real interview notes, recordings, or survey responses
> can be dropped into the "Sample user observations" and "Interview questions" sections below to
> replace the placeholders when actual research is conducted.

---

## 1. Project Context

College notices — scholarship deadlines, exam schedules, placement drives, fee due dates,
document submissions — are currently distributed through a mix of channels: physical
noticeboards, class WhatsApp groups, email circulars, and college ERP/portal announcements.
Students are expected to read a notice, figure out what it actually requires them to *do*, and
track that obligation until it's resolved, with no single system responsible for turning a notice
into a task.

Notice-to-Action is a prototype that takes a notice (as pasted text, or eventually a photo/PDF),
extracts the structured information inside it (deadline, category, target audience, required
documents), and converts it into a trackable checklist with reminders — for students, faculty who
publish notices, and admins who oversee the system.

## 2. Target Users

| User type | Who they are | What they need from the system |
|---|---|---|
| Student | Undergraduate/postgraduate students across departments and years | See only notices relevant to them, know deadlines and required documents at a glance, track what's done |
| Faculty | Department staff who publish notices (exam schedules, assignment deadlines, event announcements) | Publish a notice quickly, be confident students see the deadline and required documents clearly, reduce repeat questions |
| Admin | College administration overseeing the notice system | Oversee all notices, manage accounts/roles, remove incorrect or outdated notices |

## 3. Personas

### 3.1 Student Persona — "Aditi Sharma"

- **Age / Year:** 20, 2nd Year, CSE
- **Context:** Follows 6+ WhatsApp groups (class, department, hostel, clubs), checks the college
  portal irregularly.
- **Goals:** Never miss a scholarship or fee deadline; know exactly which documents to carry
  before going to the admin office.
- **Frustrations:**
  - Notices are long paragraphs; the deadline is buried in the third sentence.
  - Different WhatsApp groups sometimes have slightly different/updated versions of the same
    notice, and it's unclear which is current.
  - Has been rejected at a submission counter for missing a document that "everyone assumed you'd
    know about."
- **Quote (Sample / Prototype Research Data):** *"I don't read the whole notice — I just scroll
  for a date. Half the time I miss what I actually needed to bring."*

### 3.2 Faculty Persona — "Dr. Ramesh Iyer"

- **Role:** Assistant Professor, publishes 2–3 notices per week (assignment deadlines, seminar
  announcements, internal exam schedules).
- **Goals:** Publish once and be done with it; avoid answering the same question ("what's the
  deadline again?", "what do I need to submit?") 15 times over email.
- **Frustrations:**
  - No structured way to mark "required documents" separately from the notice body — it's just
    prose, so students skim past it.
  - No visibility into whether students have actually seen or acted on a notice.
- **Quote (Sample / Prototype Research Data):** *"I write the deadline in bold and I still get
  three emails a day asking when it's due."*

### 3.3 Admin Persona — "Priya Menon"

- **Role:** Department office administrator, manages accounts and oversees notice accuracy.
- **Goals:** Keep the notice board clean (remove outdated/duplicate notices), make sure roles are
  correctly assigned, and have a simple audit trail.
- **Frustrations:**
  - No central place to see everything published across departments.
  - Manually fields disputes about "I never saw that notice."

## 4. User Needs

- A single place to see notices relevant to *me specifically* (department, year).
- Deadlines and required documents surfaced immediately, not buried in paragraph text.
- A checklist that tells me what to *do*, not just what to *read*.
- Reminders before a deadline, not just a static post.
- For faculty: a fast way to publish a notice with structured fields instead of free text alone.
- For admin: oversight and the ability to remove incorrect notices.

## 5. User Frustrations (Current State)

1. Notices arrive through multiple, inconsistent channels.
2. Deadlines are easy to miss inside long text.
3. Required documents are often implied, not listed.
4. Students forget what action was actually required once the notice scrolls out of view.
5. Faculty re-answer the same questions repeatedly.
6. There's no single workflow connecting "a notice was published" to "a student completed the
   required action."

## 6. Current Problems With College Notices

- **Fragmentation:** the same notice may exist as a WhatsApp forward, an email, and a physical
  printout, sometimes with edits made in only one place.
- **No action framing:** notices are written to *inform*, not to generate a checklist — so the
  translation from "read this" to "do this" is left entirely to the student.
- **No deadline prominence:** deadlines are usually a date mentioned mid-paragraph rather than a
  flagged, sortable field.
- **No document checklist:** "attach relevant documents" is common phrasing; *which* documents is
  often left ambiguous until a student is at the counter.

## 7. Observation Findings *(Sample / Prototype Research Data)*

> To be replaced with real observation notes once conducted. Structure below is ready to use.

| Observation setting | What was observed | Interpretation |
|---|---|---|
| Department noticeboard | Multiple overlapping notices, some outdated, no clear priority | Students can't tell what's current or urgent |
| Class WhatsApp group | A notice forwarded with no context, students ask "what's this about" in-thread | Loss of structure when notices are copy-forwarded |
| Admin submission counter | Students turning back to fetch a missing document | Required documents weren't clear in advance |

## 8. Interview Questions *(template — ready for real interviews)*

**For Students**
1. Walk me through the last notice you had to act on. What did you do, step by step?
2. Have you ever missed a deadline because of how a notice was communicated? What happened?
3. When you see a notice, how do you figure out what documents you need?
4. Where do you currently keep track of things you need to do because of a notice?
5. What would make you trust a digital notice system over WhatsApp/noticeboards?

**For Faculty**
1. How do you currently publish a notice, and how long does it take?
2. What questions do students most commonly ask you after you've already published a notice?
3. How do you know whether students have seen or understood a notice?

**For Admin**
1. How do you currently handle disputes about "I never saw that notice"?
2. What's the hardest part of managing notices across departments?

## 9. Sample User Observations *(Sample / Prototype Research Data)*

- A student re-reads a scholarship notice twice before finding the actual deadline sentence.
- A student assumes "ID proof" means their college ID, submits it, and is told at the counter it
  meant Aadhaar — a document-clarity failure.
- A faculty member sends a WhatsApp follow-up "reminder: deadline is Friday" three days after
  the original notice because engagement dropped.

## 10. Pain-Point Table

| User | Problem | Impact | Need |
|---|---|---|---|
| Student | Notices scattered across channels | Misses notices entirely, or sees outdated versions | Single source of truth per student |
| Student | Deadline buried in paragraph text | Misses deadlines | Deadline shown as a prominent, distinct field |
| Student | Required documents unclear | Rejected at submission, wasted trips | Explicit required-document checklist |
| Student | Forgets what action was needed | Incomplete or late submissions | Action checklist tied to each notice |
| Faculty | No structured publishing format | Repeated student questions | Structured fields for deadline/documents at publish time |
| Faculty | No visibility into student action | Can't tell who's on track | Aggregate progress/completion tracking |
| Admin | No central oversight | Outdated notices linger, disputes | Central admin view with delete/manage controls |

## 11. User Journey (Current State → Desired State)

**Current state:**
`Notice posted (multiple channels)` → `Student sees it late/partially` → `Deadline half-noticed`
→ `Documents unclear` → `Trip to office` → `Missing document discovered` → `Second trip / missed
deadline`

**Desired state (Notice-to-Action):**
`Notice published once, structured` → `Student sees it in their filtered feed` → `Deadline and
documents shown prominently` → `Checklist generated automatically` → `Reminder before deadline` →
`Student marks tasks complete` → `Progress tracked to 100%`

---

*Next: see [02-Problem-Statement.md](./02-Problem-Statement.md) for how these findings were
distilled into a single problem statement and How Might We question.*
