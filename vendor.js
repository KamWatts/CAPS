// Vendor event - package ready for pickup
function notifyDriver(packageID, driverID) {
  // Send a notification to the driver that the package is ready for pickup
  console.log(`Package ${packageID} is ready for pickup by Driver ${driverID}.`);
}

// Example usage:
notifyDriver(123, "ABC");

// Vendor event - package in transit
function notifyVendor(packageID) {
  // Notify the vendor that the package is in transit
  console.log(`Package ${packageID} is now in transit.`);
}

// Example usage:
notifyVendor(123);
