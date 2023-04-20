'use strict'

const Events = require('events');
const eventEmitter = new Events();

const eventPool = [
  'PICKED_UP',
  'EN_ROUTE',
  'DELIVERED'
]

module.exports = {
  emitter: eventEmitter,
  eventPool: eventPool
}