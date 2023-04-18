'use strict';

const { handlePackageAlert } = require('./vendor.js');
const { handlePackageEnRoute } = require('./driver.js');
const { emitter, eventPool } = require('./eventPool.js');

const state = {
  ALERTED: 'alerted',
  EN_ROUTE: 'enRoute',
  DELIVERED: 'delivered',
  NOTIFICATION: 'notification',
  MILES: 100
};

let alertedEvent = eventPool[0];
let routeEvent = eventPool[1];
let deliveredEvent = eventPool[2];
let notifyEvent = eventPool[3];
let mileEvent = eventPool[4];

emitter.on(alertedEvent, function(payload) {
  console.log('Alert was sent', payload);
})

emitter.on(routeEvent, function(payload) {
  console.log('Package is en route the destination', payload);
})

emitter.on(deliveredEvent, function(payload){
  console.log('Package has been delivered', payload);
})

emitter.on(notifyEvent, function(payload){
  console.log('Notification sent', payload);
  })

emitter.on(mileEvent, function(payload){
  console.log('All miles were logged for driver', payload);
})

require('./driver.js');
// function handlePackagePickup(packageId) {
//   // Find the package in the packages array and update its status to "in transit"

//   // Function to subscribe to events
//   function subscribeToEvents() {
//     eventPool.forEach((event) => {
//       emitter.on(event, (data) => {
//         console.log(`Received ${event} event with data: `, data);
//       });
//     });
//   }

//   const updatedPackages = state.packages.map((pkg) => {
//     if (pkg.id === packageId) {
//       return {
//         ...pkg,
//         status: "in transit",
//       };
//     }
//     return pkg;
//   });

//   // Update the state with the new packages array
//   state.packages = updatedPackages;

//   // Call the vendor module's function to alert the vendor
//   handlePackageAlert(packageId);

//   // Call the driver module's function to mark the package as en route
//   handlePackageEnRoute(packageId);
// }

// function handlePackageDelivery(packageId) {
//   // Find the package in the packages array and update its status to "delivered"
//   const updatedPackages = state.packages.map((pkg) => {
//     if (pkg.id === packageId) {
//       return {
//         ...pkg,
//         status: "delivered",
//       };
//     }
//     return pkg;
//   });

//   // Update the state with the new packages array
//   state.packages = updatedPackages;

//   // Call the driver module's function to mark the package as delivered
//   handlePackageDelivery(packageId);
// }

// // Subscribe to events
// subscribeToEvents();
