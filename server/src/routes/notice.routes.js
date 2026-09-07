const router = require('express').Router();
const { shortId } = require('../utils/id');
const { addRow, getAllRows, findRow, findRows, deleteRow } = require('../services/sheetService');
const { requireAuth, requireRole } = require('../middleware/auth');
const { extractNotice } = require('../utils/extract');

function rowToNotice(row) {
  return {
    noticeId: row.get('noticeId'),
    title: row.get('title'),
    description: row.get('description'),
    category: row.get('category'),
    source: row.get('source'),
    targetDepartment: row.get('targetDepartment'),
    targetYear: row.get('targetYear'),
    publishDate: row.get('publishDate'),
    deadline: row.get('deadline') || null,
    priority: row.get('priority'),
    createdBy: row.get('createdBy'),
    createdAt: row.get('createdAt'),
  };
}

// GET /api/notices — list all notices (optionally filter by department/year via query params)
router.get('/', requireAuth, async (req, res) => {
  try {
    let rows = await getAllRows('Notices');
    const { department, year, category } = req.query;
    if (department) rows = rows.filter((r) => (r.get('targetDepartment') || '').toLowerCase() === department.toLowerCase());
    if (year) rows = rows.filter((r) => (r.get('targetYear') || '').toLowerCase() === year.toLowerCase());
    if (category) rows = rows.filter((r) => r.get('category') === category);
    res.json(rows.map(rowToNotice).reverse());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load notices' });
  }
});

// GET /api/notices/:id — one notice, plus its required documents
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const row = await findRow('Notices', 'noticeId', req.params.id);
    if (!row) return res.status(404).json({ error: 'Notice not found' });
    const docs = await findRows('Documents', 'noticeId', req.params.id);
    res.json({ ...rowToNotice(row), documents: docs.map((d) => d.get('documentName')) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load notice' });
  }
});

// POST /api/notices/analyze — turn raw notice text into structured fields (does NOT save anything)
router.post('/analyze', requireAuth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'Notice text is required' });
    const extracted = await extractNotice(text);
    res.json(extracted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not analyze this notice' });
  }
});

// POST /api/notices — publish a notice (students can add their own; faculty/admin publish official ones)
router.post('/', requireAuth, async (req, res) => {
  try {
    const {
      title, description = '', category = 'General', targetDepartment = '', targetYear = '',
      deadline = '', priority = 'Medium', documents = [],
    } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const noticeId = shortId('n');
    await addRow('Notices', {
      noticeId, title, description, category,
      source: req.user.role === 'student' ? `${req.user.email} (self-added)` : req.user.email,
      targetDepartment, targetYear,
      publishDate: new Date().toISOString().slice(0, 10),
      deadline, priority, originalFile: '', createdBy: req.user.userId,
      createdAt: new Date().toISOString(),
    });

    for (const docName of documents) {
      await addRow('Documents', { documentId: shortId('d'), noticeId, documentName: docName, required: 'true' });
    }

    res.status(201).json({ noticeId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not publish notice' });
  }
});

// DELETE /api/notices/:id — admin only
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const ok = await deleteRow('Notices', 'noticeId', req.params.id);
    if (!ok) return res.status(404).json({ error: 'Notice not found' });
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete notice' });
  }
});

module.exports = router;
