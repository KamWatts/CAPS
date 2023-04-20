'use strict'
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const io = new Server(PORT);

let messages = io.of('/messages');
let inbox = new MessageQueue();

messages.on('connection', (socket) => {

  socket.on('send', (payload) => {

    if(inbox.read(payload.recipientId)) {
      
    }
    inbox.store(payload);
    socket.emit('send', payload);
  }),

  socket.on('getMessages', (payload) => {
    let messages = inbox.read(payload.recipientId);
    socket.emit('getMessages', message);
  })
  socket.on('received', (payload) => {
    let message = inbox.remove(payload.recipientId);
  })

});
// io.on('connection', (socket) => {
//   console.log('Client has been connected', socket.id);

//   socket.on('message', (payload) => {
//   socket.emit('message', payload)
//   });

//   socket.on('package', (payload) => {
//     socket.emit('package'), payload
//   });

//   socket.on('delivered', (payload) => {
//     socket.emit('delivered'), payload
//     })
//   })