const router = require('express').Router();
const { getAllRows, findRow, updateRow } = require('../services/sheetService');
const { requireAuth } = require('../middleware/auth');

function rowToNotif(row) {
  return {
    notificationId: row.get('notificationId'),
    message: row.get('message'),
    type: row.get('type'),
    readStatus: row.get('readStatus') === 'true',
    createdAt: row.get('createdAt'),
  };
}

// GET /api/notifications — only the signed-in user's own notifications, newest first
router.get('/', requireAuth, async (req, res) => {
  try {
    const rows = await getAllRows('Notifications');
    const mine = rows
      .filter((r) => r.get('userId') === req.user.userId)
      .map(rowToNotif)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(mine);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load notifications' });
  }
});

// PATCH /api/notifications/:id/read
router.patch('/:id/read', requireAuth, async (req, res) => {
  try {
    const row = await findRow('Notifications', 'notificationId', req.params.id);
    if (!row || row.get('userId') !== req.user.userId) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    await updateRow('Notifications', 'notificationId', req.params.id, { readStatus: 'true' });
    res.json({ updated: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update notification' });
  }
});

module.exports = router;
