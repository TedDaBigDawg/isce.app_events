"use strict";
require("dotenv").config();

const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");
const { guid } = require("../util");

const Event = sequelize.define("event", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  Town: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  clean_name: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Price = sequelize.define("event_price", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Event, // Reference the Event model
      key: 'id', // Reference the id field in the Event model
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attendees: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  order_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  withChips: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "without"
  }
});

const Gallery = sequelize.define("event_gallerie", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Event, // Reference the Event model
      key: 'id', // Reference the id field in the Event model
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

const Attendee = sequelize.define("event_attendee", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Event, // Reference the Event model
      key: 'id', // Reference the id field in the Event model
    },
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price_category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ticket: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  checked_in: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  thankyou_mail: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

const Token = sequelize.define("event_token", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  },
});

const Invitation = sequelize.define("invitation", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  invitation_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invitation_desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Event, // Reference the Event model
      key: 'id', // Reference the id field in the Event model
    },
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_invitee_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  event_invitee_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  event_invitee_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

const Paystack = sequelize.define("event_url", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  access_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorization_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const chat_rooms = sequelize.define("chat_room", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Event, // Reference the Event model
      key: 'id', // Reference the id field in the Event model
    },
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const ChatMessage = sequelize.define("chat_message", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(), 
    primaryKey: true,
  },
  chat_room_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: chat_rooms,
      key: 'id',
    },
  },
  attendee_id: {
    type: DataTypes.STRING, 
    allowNull: false,
    references: {
      model: Attendee,
      key: 'id',
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const ChatRoomAttendees = sequelize.define("ChatRoomAttendees", {
  chat_room_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: chat_rooms,
      key: 'id',
    },
  },
  attendee_id: {
    type: DataTypes.STRING, 
    allowNull: false,
    references: {
      model: Attendee,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const EventChat = sequelize.define("event_chat", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: guid(),
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attendee_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


const init = async () => {
  await Event.sync();
  await Price.sync();
  await Gallery.sync();
  await Attendee.sync();
  await Token.sync();
  await Invitation.sync();
  await Paystack.sync();
  await chat_rooms.sync();
  await ChatMessage.sync();
  await ChatRoomAttendees.sync();
  await EventChat.sync();
};

init();

// Association for events and prices models
Event.hasMany(Price, { foreignKey: 'event_id', as: 'prices' });
Price.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

// Association for events and gallery models
Event.hasMany(Gallery, { foreignKey: 'event_id', as: 'gallery' });
Gallery.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

// Association for events and invitation models
Event.hasMany(Invitation, { foreignKey: 'event_id', as: 'invitations' });
Invitation.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

// // Association for events and attendees models
Event.hasMany(Attendee, { foreignKey: 'event_id', as: 'attendees' });
Attendee.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

// Association for events and chat rooms models
Event.hasOne(chat_rooms, { foreignKey: 'event_id', as: 'chatRoom' });
chat_rooms.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });


// Association for chat rooms and attendees models
chat_rooms.belongsToMany(Attendee, {
  through: "ChatRoomAttendees",
  foreignKey: "chat_room_id",
  as: "attendees",
});
Attendee.belongsToMany(chat_rooms, {
  through: "ChatRoomAttendees",
  foreignKey: "attendee_id",
  as: "chatRooms",
});



module.exports = { Event, Price, Gallery, Attendee, Token, Invitation, Paystack, chat_rooms, ChatMessage, ChatRoomAttendees, EventChat };
