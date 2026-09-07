const CATS = [
  'Academic', 'Examination', 'Scholarship', 'Placement', 'Internship',
  'Assignment', 'Events', 'Workshop', 'Fees', 'Registration', 'General',
];
const CAT_KEYWORDS = {
  Scholarship: ['scholarship'],
  Examination: ['exam', 'examination'],
  Placement: ['placement', 'recruit', 'company drive', 'interview'],
  Internship: ['internship', 'intern'],
  Assignment: ['assignment', 'project', 'proposal'],
  Events: ['fest', 'event', 'cultural'],
  Workshop: ['workshop', 'seminar', 'webinar'],
  Fees: ['fee', 'fees', 'payment due'],
  Registration: ['registration', 'register', 'enroll'],
  Academic: ['syllabus', 'curriculum', 'academic', 'class'],
  General: [],
};
const DOC_KEYWORDS = [
  'income certificate', 'aadhaar', 'aadhar', 'passport-size photograph', 'passport size photograph',
  'photograph', 'marksheet', 'mark sheet', 'id card', 'fee receipt', 'registration form',
  'application form', 'bonafide certificate', 'caste certificate', 'medical certificate',
  'transfer certificate', 'proposal', 'no objection certificate', 'noc',
];
const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/** Rule-based extraction — deterministic, and never invents a fact that isn't in the text. */
function ruleBasedExtract(text) {
  const lower = text.toLowerCase();

  let title = text.split(/[.\n]/)[0].trim();
  if (title.length > 80) title = title.slice(0, 77) + '…';
  if (!title) title = 'Untitled Notice';

  let category = 'General';
  for (const c of CATS) {
    const kws = CAT_KEYWORDS[c] || [];
    if (kws.some((k) => lower.includes(k))) {
      category = c;
      break;
    }
  }

  let deadline = null;
  const withCue = text.match(/(?:before|by|on|on or before)\s+([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?/i);
  const bare = text.match(new RegExp(`\\b(${MONTHS.join('|')})\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b`, 'i'));
  const match = (withCue && MONTHS.includes(withCue[1].toLowerCase())) ? withCue : bare;
  if (match) {
    const monthIndex = MONTHS.indexOf(match[1].toLowerCase()) + 1;
    const year = new Date().getFullYear();
    deadline = `${year}-${String(monthIndex).padStart(2, '0')}-${String(parseInt(match[2], 10)).padStart(2, '0')}`;
  }

  let target = null;
  const yearM = text.match(/(first|second|third|fourth|1st|2nd|3rd|4th|final)[\s-]?year/i);
  const deptM = text.match(/\b(CSE|ECE|EEE|ME|MECH|CIVIL|IT|MBA|MCA|AIML|AI\/ML)\b/i);
  if (yearM || deptM) {
    target = [yearM ? yearM[0] : '', deptM ? deptM[0].toUpperCase() : ''].filter(Boolean).join(' ');
  } else if (/all students/i.test(text)) {
    target = 'All Students';
  }

  let priority = 'Medium';
  if (['Scholarship', 'Examination', 'Fees'].includes(category) || /mandatory|compulsory|must|immediately/i.test(text)) {
    priority = 'High';
  }
  if (/optional|may attend/i.test(text)) priority = 'Low';

  let documents = [...new Set(DOC_KEYWORDS.filter((k) => lower.includes(k)))].map(
    (d) => d.replace(/\b\w/g, (c) => c.toUpperCase())
  );

  let actions;
  if (documents.length) {
    actions = ['Download the required form', ...documents.map((d) => `Obtain / attach ${d}`), 'Submit before the deadline'];
  } else {
    actions = ['Read the full notice carefully', 'Confirm whether this applies to you', 'Complete the required step before the deadline'];
  }

  return { title, category, deadline, target, priority, documents, actions, description: text.trim() };
}

const CLAUDE_SYSTEM_PROMPT = `You extract structured data from college notices for students. Return ONLY minified JSON, no prose, with exactly these keys:
{"title": string, "category": one of ["Academic","Examination","Scholarship","Placement","Internship","Assignment","Events","Workshop","Fees","Registration","General"], "deadline": "YYYY-MM-DD" or null, "target": string or null, "priority": "High"|"Medium"|"Low", "documents": string[], "actions": string[]}
Rules:
- NEVER invent information that is not stated in the notice.
- If the deadline is not stated, deadline must be null.
- If the audience is not stated, target must be null.
- documents and actions must be empty arrays if nothing is stated, not guessed.`;

async function extractWithClaude(text) {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      system: CLAUDE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: text }],
    }),
  });
  if (!resp.ok) throw new Error(`Claude API responded with ${resp.status}`);
  const data = await resp.json();
  const textBlock = (data.content || []).find((b) => b.type === 'text');
  if (!textBlock) throw new Error('No text block in Claude response');
  const cleaned = textBlock.text.replace(/```json|```/g, '').trim();
  const parsed = JSON.parse(cleaned);
  parsed.description = text.trim();
  return parsed;
}

/** Public entry point: uses Claude if configured, otherwise falls back to the rule-based parser. */
async function extractNotice(text) {
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      return await extractWithClaude(text);
    } catch (err) {
      console.warn('Claude extraction failed, falling back to rule-based parser:', err.message);
    }
  }
  return ruleBasedExtract(text);
}

module.exports = { extractNotice, ruleBasedExtract };
