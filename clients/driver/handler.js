'use strict'

const { emitter, eventPool } = require('../eventPool');

let capsSocket = io(SERVER_URL + '/caps');

// emitter.emit(eventPool[2], {
//   DELIVERED: 'Package Delivered to Client'
// })

// emitter.emit(eventPool[0], { ALERTED: 'Vendor was alerted for package delivery' });



// // Driver event - package picked up
// function packagePickedUp(packageID, vendorID) {
//   // Notify the vendor that the package has been picked up
//   console.log(`Package ${packageID} has been picked up from Vendor ${vendorID}.`);
// }

// // Example usage:
// packagePickedUp(123, "XYZ");

// // Driver event - package delivered
// function packageDelivered(packageID, vendorID) {
//   // Notify the vendor that the package has been delivered
//   console.log(`Package ${packageID} has been delivered to Vendor ${vendorID}.`);
// }

// // Example usage:
// packageDelivered(123, "XYZ");

capsSocket.on(eventPool[0], (payload) => {

  capsSocket.emit('join', payload);
  console.log('Cap socket is active');

  console.log(`DRIVER: picked up ${payload['orderId']}`)
  capsSocket.emit(eventPool[1], payload);

  console.log(`${payload.orderId} en route the destination`)
  capsSocket.emit(eventPool[2], payload);
})
