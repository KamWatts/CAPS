'use strict'

const { emitter, eventPool } = require('./eventPool');

emitter.emit(eventPool[2], {
  DELIVERED: 'Package Delivered to Client'
})

emitter.emit(eventPool[0], { ALERTED: 'Vendor was alerted for package delivery' });



// Driver event - package picked up
function packagePickedUp(packageID, vendorID) {
  // Notify the vendor that the package has been picked up
  console.log(`Package ${packageID} has been picked up from Vendor ${vendorID}.`);
}

// Example usage:
packagePickedUp(123, "XYZ");

// Driver event - package delivered
function packageDelivered(packageID, vendorID) {
  // Notify the vendor that the package has been delivered
  console.log(`Package ${packageID} has been delivered to Vendor ${vendorID}.`);
}

// Example usage:
packageDelivered(123, "XYZ");
