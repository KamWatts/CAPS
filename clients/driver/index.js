'use strict'

const { io } = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001'

let socket = io('http://localhost:3001');


socket.on('message', (payload) => {
  console.log('payload from server', payload);
  
  socket.emit('package', { EN_ROUTE: 'Package is en route destination'
});
  
  socket.emit('delivered', { DELIVERED: 'Package delivered successfully'
  });
});
