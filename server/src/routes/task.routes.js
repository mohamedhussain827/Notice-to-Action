const router = require('express').Router();
const { shortId } = require('../utils/id');
const { addRow, getAllRows, findRow, updateRow } = require('../services/sheetService');
const { requireAuth } = require('../middleware/auth');

function rowToTask(row) {
  return {
    taskId: row.get('taskId'),
    noticeId: row.get('noticeId'),
    taskName: row.get('taskName'),
    deadline: row.get('deadline') || null,
    status: row.get('status'),
    completedAt: row.get('completedAt') || null,
  };
}

// GET /api/tasks — only the signed-in user's own tasks
router.get('/', requireAuth, async (req, res) => {
  try {
    const rows = await getAllRows('Tasks');
    const mine = rows.filter((r) => r.get('userId') === req.user.userId).map(rowToTask);
    res.json(mine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load tasks' });
  }
});

// POST /api/tasks — create a task under a notice (usually done in bulk when a notice is saved)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { noticeId, taskName, deadline = '', priority = 'Medium' } = req.body;
    if (!noticeId || !taskName) return res.status(400).json({ error: 'noticeId and taskName are required' });
    const taskId = shortId('t');
    await addRow('Tasks', {
      taskId, noticeId, userId: req.user.userId, taskName, deadline, status: 'Pending', completedAt: '',
    });
    res.status(201).json({ taskId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create task' });
  }
});

// PATCH /api/tasks/:id — toggle Pending / Completed
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ error: 'status must be Pending or Completed' });
    }
    const row = await findRow('Tasks', 'taskId', req.params.id);
    if (!row || row.get('userId') !== req.user.userId) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await updateRow('Tasks', 'taskId', req.params.id, {
      status,
      completedAt: status === 'Completed' ? new Date().toISOString() : '',
    });
    res.json({ updated: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update task' });
  }
});

module.exports = router;
