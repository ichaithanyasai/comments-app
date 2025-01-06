const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'commentsdb'
});

app.post('/api/login', (req, res) => {
  const sessionId = uuidv4();
  res.json({ sessionId });
});

app.get('/api/comments', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM comments ORDER BY timestamp DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
});

app.post('/api/comments', async (req, res) => {
  const { username, comment } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO comments (username, comment) VALUES (?, ?)', [username, comment]);
    const newComment = { id: result.insertId, username, comment, timestamp: new Date() };
    io.emit('new-comment', newComment); 
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error storing comment:', error);
    res.status(500).send('Error storing comment');
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});