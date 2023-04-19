'use strict'

const io = require('socket.io-client');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001'

let socket = io('http://localhost:3001');

socket.emit('message', { MESSAGE: 'Package ready for pickup' });

socket.on('package', (payload) => {
  console.log('Package is in transit', payload)
})

socket.on('delivered', (payload) => {
  console.log('Package has been delievered', payload)
})