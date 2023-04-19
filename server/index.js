'use strict'
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const io = new Server(PORT);

io.on('connection', (socket) => {
  console.log('Client has been connected', socket.id);

  socket.on('message', (payload) => {
  socket.emit('message', payload)
  });

  socket.on('package', (payload) => {
    socket.emit('package'), payload
  });

  socket.on('delivered', (payload) => {
    socket.emit('delivered'), payload
  });
});