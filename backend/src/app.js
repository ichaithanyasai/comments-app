const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const routes = require('./routes');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log('New client connected:', socket.id);

  socket.on('new-comment', comment => {
    io.emit('update-comments', comment);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
