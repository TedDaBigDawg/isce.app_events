"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const bodyParser = require("body-parser");
const signale = require("signale");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger.json");
const routes = require("./routes");
const { Server } = require('socket.io');
const { ChatMessage } = require('./models');
const { guid, sortDate } = require("./util");

const server = require("http").Server(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001", 'https://isceauth.onrender.com', 'https://eventnest-slbg.onrender.com'], // allow requests from this origin
    methods: ["GET", "POST"],        // allowed methods
    credentials: true               // allow cookies
}
});


app.use(helmet());
app.disable("x-powered-by");

let chatRooms = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Join a specific event chat room
  
  socket.on('joinRoom', ({ eventId, attendeeId }) => {
    socket.join(eventId);
    if (!chatRooms[eventId]) {
      chatRooms[eventId] = [];
    }
    chatRooms[eventId].push(attendeeId);
    console.log(`Attendee ${attendeeId} joined room ${eventId}`);
  });

    // Handle leave room event
    socket.on('leaveRoom', ({ eventId, attendeeId }) => {
      socket.leave(eventId);
      // Optional: Clean up the chat room list
      if (chatRooms[eventId]) {
        chatRooms[eventId] = chatRooms[eventId].filter(id => id !== attendeeId);
        console.log(`Attendee ${attendeeId} left room ${eventId}`);
      }
    });

  // Handle incoming chat messages
  socket.on('sendMessage', async ({ eventId, attendeeId, message }) => {
    // Broadcast to everyone in the chat room
    io.to(eventId).emit('receiveMessage', { attendeeId, message });

    const id = guid();

    // Store the message in the database
    await ChatMessage.create({
      id,
      chat_room_id: eventId, // assuming eventId maps to the chat_room_id
      attendee_id: attendeeId,
      message,
      createdAt: new Date(), // Adjust based on your setup
      updatedAt: new Date(),
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    customCss: ".topbar{display: none}",
    customSiteTitle: "ISCE Events API",
    swaggerOptions: { filter: true, docExpansion: "none" },
  })
);

app.use("/assets", express.static("./src/storage"));

app.use(cors({
  origin: ['http://localhost:3000', 'https://isceauth.onrender.com', 'https://eventnest-slbg.onrender.com'], // Change to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(routes);

//Handle error
app.use((err, req, res, next) => {
  signale.fatal(err.stack);
  res.status(500).send({
    success: false,
    status: false,
    error: "Something broken! Please contact support.",
    help: "Please check the docs.",
  });
});

//Handle 404
app.use((req, res, next) => {
  res.status(404).send({
    success: false,
    status: false,
    error: "Page not found or has been deleted.",
    help: "Please check the docs.",
  });
});

// Store the db connection and start listening on a port.
const startExpress = () => {
  server.listen(process.env.PORT);
};

// Start express gracefully
startExpress();
