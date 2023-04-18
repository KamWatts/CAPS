'use strict'

const Events = require('events')
const eventEmitter = new Events();

const eventPool = {
  ALERTED: 'alerted',
  EN_ROUTE: 'enRoute',
  DELIVERED: 'delivered',
  NOTIFICATION: 'notification',
  MILES: 1
};

module.exports = {
  eventPool: eventPool,
  emitter: eventEmitter
};
