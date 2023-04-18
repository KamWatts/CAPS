// Create an object to hold your state
const state = {
  packages: [],
  currentPackage: null,
};

// Define your event handlers
function handlePackagePickup(packageId) {
  // Find the package in the packages array and update its status to "in transit"
  const updatedPackages = state.packages.map((pkg) => {
    if (pkg.id === packageId) {
      return {
        ...pkg,
        status: "in transit",
      };
    }
    return pkg;
  });

  // Update the state with the new packages array
  state.packages = updatedPackages;

  // Emit an event to notify vendors of the package pickup
  const event = new CustomEvent("packagePickup", {
    detail: {
      packageId,
    },
  });
  document.dispatchEvent(event);
}

function handlePackageDelivery(packageId) {
  // Find the package in the packages array and update its status to "delivered"
  const updatedPackages = state.packages.map((pkg) => {
    if (pkg.id === packageId) {
      return {
        ...pkg,
        status: "delivered",
      };
    }
    return pkg;
  });

  // Update the state with the new packages array
  state.packages = updatedPackages;

  // Emit an event to notify vendors of the package delivery
  const event = new CustomEvent("packageDelivery", {
    detail: {
      packageId,
    },
  });
  document.dispatchEvent(event);
}

// Add event listeners to handle state changes
document.addEventListener("packagePickup", (event) => {
  // Update the UI to reflect the new state
  console.log(`Package ${event.detail.packageId} is now in transit.`);
});

document.addEventListener("packageDelivery", (event) => {
  // Update the UI to reflect the new state
  console.log(`Package ${event.detail.packageId} has been delivered.`);
});

// Example usage
state.packages = [
  {
    id: 1,
    status: "ready",
  },
  {
    id: 2,
    status: "ready",
  },
];

handlePackagePickup(1);
handlePackageDelivery(2);
