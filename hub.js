/** @format */

"use strict";

const { eventPool, emitter } = require("./eventPool");

const { Server } = require("socket.io");

const io = new Server(PORT);

let capsServer = io.of("/caps");

capsServer.on("connection", (socket) => {
  socket.on("join", (payload) => {
    socket.join(payload["store"]);
  });

  socket.on(eventPool[0], (payload) => {
    socket.broadcast.emit(eventPool[0], payload);

    console.log(
      `Event: ${eventPool[0]},
    time: ${new Date(Date.now()).toDateString()},
    payload: {
      store: ${payload["store"]},
      orderId: ${payload["orderId"]},
      customer: ${payload["customer"]},
      address: ${payload["address"]}
      }`
    );
  });

  socket.on(eventPool[1], (payload) => {
    socket.to(payload.store).emit(eventPool[1], payload);
    console.log(
      `Event: ${eventPool[1]},
          time: ${new Date(Date.now()).toDateString()},
          payload: {
            store: ${payload["store"]},
            orderId: ${payload["orderId"]},
            customer: ${payload["customer"]},
            address: ${payload["address"]}
            }`
    );
  });

  socket.on(eventPool[2], (payload) => {
    socket.to(payload.store).emit(eventPool[2], payload);
    console.log(
      `Event: ${eventPool[2]},
          time: ${new Date(Date.now()).toDateString()},
          payload: {
            store: ${payload["store"]},
            orderId: ${payload["orderId"]},
            customer: ${payload["customer"]},
            address: ${payload["address"]}
            }`
    );
  });

  const http = require("http");
  const server = http.createServer();
  const io = require("socket.io")(server);

  const PORT = 3000;

  // configure socket connections to caps namespace on specified port
  const caps = io.of("/caps");
  caps.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // handle pickup event
    socket.on("pickup", (payload) => {
      // add payload to queue for driver clients
      driverQueue.push(payload);

      // emit pickup event to all clients
      caps.emit("pickup", payload);
    });

    // handle delivered event
    socket.on("delivered", (payload) => {
      // add payload to queue for vendor clients
      vendorQueue.push(payload);

      // emit delivered event to all clients
      caps.emit("delivered", payload);
    });

    // handle received event
    socket.on("received", (payload) => {
      // delete payload from queue
      if (payload.client === "vendor") {
        vendorQueue = vendorQueue.filter((p) => p.id !== payload.id);
      } else if (payload.client === "driver") {
        driverQueue = driverQueue.filter((p) => p.id !== payload.id);
      }
    });

    // handle getAll event
    socket.on("getAll", (payload) => {
      // find messages in queue for client and event
      let messages = [];
      if (payload.client === "vendor") {
        messages = vendorQueue.filter((p) => p.event === payload.event);
      } else if (payload.client === "driver") {
        messages = driverQueue.filter((p) => p.event === payload.event);
      }

      // broadcast messages to client
      messages.forEach((message) => {
        socket.emit(payload.event, message);
      });
    });
  });

  // start server
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
