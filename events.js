const Event = require('events');

const eventEmitter = new Event();

function test(payload) {
  console.log('Event payload triggered', payload);
}

eventEmitter.on('Emitter on', test);
eventEmitter.emit('Emitter emitted', { name: 'Code Academy Postal Service' })