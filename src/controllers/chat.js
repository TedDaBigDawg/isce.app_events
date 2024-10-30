"use strict";

const { Op } = require("sequelize");
const { ChatMessage, chat_rooms } = require('../models');
const { guid, sortDate } = require("../util");
const logger = require("../util/log");
const { error } = require("console");
const slugify = require('slugify');

// Fetch messages for a specific event
const getChatMessages = async (req, res) => {
  try {
    const { chat_room_id } = req.params;
    const messages = await ChatMessage.findAll({
      where: { chat_room_id: chat_room_id },
      order: [['created_at', 'ASC']],
    });
    res.status(200).send({ success: true, messages });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


const createChatRoom = async (req, res) => {
    try {

        const { event_id, event_name } = req.body; // Destructure event_id from request body

        // Check if event_id is provided
        if (!event_id) {
            return res.status(400).send({
                success: "false",
                message: "Event ID is required.",
            });
        }
        id = guid();

        const event_clean_name = slugify(event_name);
        const chatRoom = await chat_rooms.create({
          id,
          event_id,
          event_name: event_clean_name,
        });
        

        if (chatRoom) {
          return res.status(200).send({
            success: "true",
            message: "Chat room created successfully",
            data: chatRoom,
          });
        } else {
          console.log('No Chat room created');
        }
        
    } catch (error) {
      console.error("Error creating Chat room:", error);
        logger(error);
        return res.status(500).send({ success: "false", message: error?.message, error: error });
      }
}

module.exports = { getChatMessages, createChatRoom };
