const express = require('express');
const db = require('./db');
const router = express.Router();

router.post('/login', (req, res) => {
  const sessionId = Math.random().toString(36).substring(2);
  res.json({ sessionId });
});

router.get('/comments', (req, res) => {
  db.query('SELECT * FROM comments ORDER BY timestamp DESC', (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(results);
  });
});

router.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  db.query('INSERT INTO comments (username, comment) VALUES (?, ?)', [username, comment], (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send('Comment added.');
  });
});

module.exports = router;
