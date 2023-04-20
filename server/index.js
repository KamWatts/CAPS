'use strict'
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const io = new Server(PORT);

const capsServer = io.of('/caps');
const pickupQueue = new MessageQueue();
const deliveryQueue = new MessageQueue();

capsServer.on('connection', (socket) => {


socket.on('join-room', (payload) => {
  socket.join(payload.store);
  capsServer.to(payload.store).emit('join-room', 'client joined the room', socket.id)
}),

socket.on('pickup', (payload) => {
  let storeQueue = pickupQueue.read(payload.store);
  if (storeQueue) {
    storeQueue.store(payload.order, payload);
  } else {
    let newStoreQueue = new MessageQueue();
    newStoreQueue.store(payload.orderId, payload);
    pickupQueue.store(payload.store, new MessageQueue);
  }
  console.log(util.inspect(pickupQueue, false, null))
  socket.broadcast.emit('pickup', payload)
}),

socket.on('in-transit', (payload) => { 
  capsServer.to(payload.store).emit('in-transit', payload)
}),

socket.on('delivered', () => { }),

socket.on('received', () => { }),

})

// messages.on('connection', (socket) => {

//   socket.on('send', (payload) => {

//     if(recipient) {
//       recipientMessages.store(payload.messageId, payload);
//     } else {
//       let recipientMessages = new MessageQueue();
//       recipientMessages.store(payload.messageId, payload);
//     }
//     inbox.store(payload);
//     messages.emit('send', payload);
//   }),

//   socket.on('getMessages', (payload) => {
//     let messages = inbox.read(payload.recipientId);
//     socket.emit('getMessages', message);
//   })
//   socket.on('received', (payload) => {
//     let recipientMessages = inbox.read(payload.recipientId);
//     let message = inbox.remove(payload.recipientId);
//     socket.emit('received', message);
//   })

// });
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