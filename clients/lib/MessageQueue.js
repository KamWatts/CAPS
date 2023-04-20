'use strict'

class MessageQueue {
  constructor() {
    this.data =  {};
  }

  store(key, value) {
    this.data[key] = value;
    return key;
  }

  read(key, value) {
    return this.data[key];
  }

    removeEventListener(key) {
      let value = this.data[key];
      delete this.data[key];
      return value
    }
  }

  module.exports = MessageQueue