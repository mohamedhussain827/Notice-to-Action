const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { shortId } = require('../utils/id');
const { addRow, findRow } = require('../services/sheetService');

function signToken(user) {
  return jwt.sign({ userId: user.userId, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'student', department = '', year = '' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }
    if (!['student', 'faculty', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'role must be student, faculty, or admin' });
    }
    const existing = await findRow('Users', 'email', email);
    if (existing) return res.status(409).json({ error: 'An account with this email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const userId = shortId('u');
    await addRow('Users', {
      userId, name, email, password: hashed, role, department, year,
      createdAt: new Date().toISOString(),
    });

    const user = { userId, name, email, role, department, year };
    res.status(201).json({ token: signToken(user), user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    const row = await findRow('Users', 'email', email);
    if (!row) return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, row.get('password'));
    if (!match) return res.status(401).json({ error: 'Invalid email or password' });

    const user = {
      userId: row.get('userId'), name: row.get('name'), email: row.get('email'),
      role: row.get('role'), department: row.get('department'), year: row.get('year'),
    };
    res.json({ token: signToken(user), user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
