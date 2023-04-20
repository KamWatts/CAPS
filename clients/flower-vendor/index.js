const Chance = require('chance');
const chance = new Chance();

const socket = require('socket.io-client')

let payload = {
  store: 'flower-store',
  customer: chance.name(),
  orderId: chance.guid(),
  address: chance.address();
}

socket.emit(event, payload);
