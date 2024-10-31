"use strict";

const { Op } = require("sequelize");
const { Event, Price, Gallery } = require("../models");
const { guid, sortDate } = require("../util");
const { getPrices } = require("../models/price");
const { getGallery } = require("../models/gallery");
const { getAttendees, getChats } = require("../models/attendee");
const logger = require("../util/log");
const slugify = require('slugify');

const createEvent = async (req, res) => {
  /*
    #swagger.tags = ["Event"]
    #swagger.description = 'Endpoint for creating a new event. Users can add event details including title, description, location, dates, and other relevant information.'
    #swagger.security = [{
      "apikey": []
    }]
    #swagger.parameters['obs'] = {
      in: 'body',
      required: true,
      description: 'Event data required to create a new event.',
      schema: {
        $title: "string", 
        $description: "string", 
        $image: "string", 
        $location: "string", 
        $user_id: "string",
        $start_date: "2024-12-01T18:00:00.000Z", 
        $end_date: "2024-12-02T18:00:00.000Z",
        $gallery: [
          { name: "string", image: "string" }
        ],
        $prices: [
          { title: "VIP", amount: 100 }
        ]
      }
    }
    #swagger.responses[200] = {
      description: 'Event created successfully.',
      schema: {
        success: true,
        data: {
          id: "string",
          user_id: "string",
          clean_name: string,
          title: "string",
          description: "string",
          location: "string",
          start_date: "2024-12-01T18:00:00.000Z",
          end_date: "datetime",
          createdAt: "datetime",
          updatedAt: "datetime",
        },
        message: "Event created successfully."
      }
    }
    #swagger.responses[400] = {
      description: 'Invalid request data',
      schema: {
        success: false,
        message: "Validation error: Missing or incorrect field values.",
        errors: {
          title: "Title is required.",
          start_date: "Invalid start date format."
        }
      }
    }
    #swagger.responses[500] = {
      description: 'Internal server error.',
      schema: {
        success: false,
        message: "An unexpected error occurred. Please try again later."
      }
    }
  */

  try {
    //const clean_name = req?.body?.title?.replace(/ /g,"-");
    const clean_name = slugify(req?.body?.title);
    let event = await Event.findOne({
      where: {
        clean_name: clean_name
      }
    });
    if(event){
      return res.status(404).send({ success: "false", message: "Event name already exists" });
    }

    //If no prices add, don't save 
    const prices = req?.body?.prices;
    if(prices?.length < 1){
      return res.status(404).send({ success: "false", message: "Unable to create event" });
    }

    console.log(req?.isce_auth?.id);
    
    event = await Event.create({
      id: guid(),
      user_id: req?.isce_auth?.id || "db3a2d6b-b7f8-4832-9600-477af579b293",
      image: req?.body?.image,
      clean_name: clean_name,
      title: req?.body?.title,
      location: req?.body?.location,
      Town: req?.body?.Town,
      description: req?.body?.description,
      start_date: req?.body?.start_date,
      end_date: req?.body?.end_date,
    });

    // console.log('event isce-auth', req?.isce_auth);

    if(!event?.id){
      return res.status(404).send({ success: "false", message: "Unable to create event" });
    }
    
    const newPrices = await Promise.all(
      prices.map(price => Price.create({
        id: guid(),
        event_id: event.id,
        ...price,
        order_amount: 0
      }))
    );

    const gallery = req?.body?.gallery || [];
    const newGallery = await Promise.all(
      gallery.map(item => Gallery.create({
        id: guid(),
        event_id: event.id,
        ...item
      }))
    );

    return res.status(200).send({
      success: "true",
      message: "Event created successfully",
      data: { event, newPrices, newGallery, }
    });
  } catch (error) {
    logger(error);
    return res.status(500).send({ success: "false", message: error?.message });
  }
};

const updateEvent = async (req, res) => {
  /*
    #swagger.tags = ["Event"]
    #swagger.description = 'Update Event'
     #swagger.security = [{
               "apikey": []
        }]
     #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                      $title: "string",
                      $description: "string",
                      $image: "string",
                      $location: "string",
                      $start_date: "datetime",  
                      $end_date: "datetime",  
                }
        }
  */

  try {
    const event = await Event.findOne({ 
      where: { 
        id: req?.params?.id
      } 
    });

    if(!event) {
      return res.status(200).send({ success: "false", message: "No event specified" });
    }

    req.body.clean_name = slugify(req?.body?.title);
    await Event.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const prices = req.body?.prices;
    if(prices?.length > 0){
      await Price.destroy({
        where: {
          event_id: event?.id
        }
      });

      prices.forEach(async (price) => {
        await Price.create({ 
          id: guid(), event_id: event?.id, ...price, order_amount: 0 
        });
      });
    }

    const gallery = req.body?.gallery;
    if (gallery?.length > 0){
      await Gallery.destroy({
        where: {
          event_id: event?.id
        }
      });

      gallery.forEach(async (item) => {
        await Gallery.create({
          id: guid(), event_id: event?.id, ...item
        });
      });
    }

    res.send({
      success: "true",
      data: { event },
    });
  } catch (error) {
    logger(error);
    return res.status(500).send({ success: "false", message: "An error has occurred" });
  }
};

const deleteEvent = async (req, res) => {
  /*
    #swagger.tags = ["Event"]
    #swagger.description = 'Delete event by id'
     #swagger.security = [{
               "apikey": []
        }]
  */

  try {
    if(!req?.params?.id){
      res.status(404).send({
        success: "false",
        message: "Invalid event id",
      });
    }

    const event = await Event.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!event){
      res.status(404).send({
        success: "false",
        message: "Event not available",
      });
    }
  
    res.status(200).send({
      success: "true",
      message: "Event deleted",
    });
  } catch (error) {
    logger(err);
    res.status(500).send({ success: "false", message: "An error occurred" });
  }
};

const getEvents = async (req, res) => {
  /*
    #swagger.tags = ["Event"]
    #swagger.description = 'Get Events'
     #swagger.security = [{
               "apikey": []
        }]
  */
  try {
    let offset = 0,
    page = Number(req.query.page) || 1,
    limit = Number(req.query.limit) || 100;
    if (page > 1) {
      offset = limit * page;
      offset = offset - limit;
    }
    
    const user = req?.isce_auth;

    console.log(req.isce_auth.user.id);
    const events = await Event.findAll({
      limit,
      offset,
      where: {
        user_id: {
          [Op.eq]: req.isce_auth.user.id,
        }
      }
    });

    let updatedEvents = await Promise.all(events?.map(async (event) => {
      const item = event.dataValues;
      const prices = await getPrices(item.id);
      const gallery = await getGallery(item.id);
      const attendees = await getAttendees(item.id);
      return { ...item, prices, gallery, attendees };
    })); 
    updatedEvents = sortDate(updatedEvents);

    const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);

    let past = updatedEvents.filter(({ start_date }) => new Date(start_date) < yesterday);

    const upcoming = updatedEvents.filter(({ start_date }) => new Date(start_date) >= yesterday);

    return res.status(200).send({
      success: "true",
      data: {
        count: updatedEvents?.length,
        all: updatedEvents,
        upcoming,
        past,
        user
      },
    });
  } catch (error) {
    logger(error);
    return res.status(500).send({
      success: 'false', message: 'A server error occurred'
    });
  }
};

const searchEvents = async (req, res) => {
  /*
    #swagger.tags = ["Event"]
    #swagger.description = 'Search events using title or description'
     #swagger.security = [{
               "apikey": []
        }]
  */
  
  try {
    let offset = 0,
    page = Number(req.query.page) || 1,
    limit = Number(req.query.limit) || 100,
    query = req.query.query;

    if (page > 1) {
      offset = limit * page;
      offset = offset - limit;
    }

    const events = await Event.findAll({
      limit,
      offset,
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
        // Uncomment to filter events starting from today or later
        // start_date: {
        //   [Op.gte]: new Date(),
        // },
      },
    });

    res.status(200).send({ success: "true", data: { events } });
  } catch (error) {
    logger(error);
    res.status(500).send({ success: "false", message: "an error occurred" })
  }
};

const searchEventsByTown = async (req, res) => {
  /*
    #swagger.tags = ["Event"]
    #swagger.description = 'Search events using town name'
     #swagger.security = [{
               "apikey": []
        }]
  */
  
  try {
    let offset = 0,
    page = Number(req.query.page) || 1,
    limit = Number(req.query.limit) || 100,
    query = req.query.query;

    if (page > 1) {
      offset = limit * page;
      offset = offset - limit;
    }

    const events = await Event.findAll({
      limit,
      offset,
      where: {
        town: { [Op.like]: `%${query}%` },
      },
    });

    res.status(200).send({ success: "true", data: { events } });
  } catch (error) {
    logger(error);
    res.status(500).send({ success: "false", message: "an error occurred" })
  }
};


const getEvent = async (req, res) => {
  /*
    #swagger.tags = ["Event"]
    #swagger.description = 'Get Event by id'
     #swagger.security = [{
               "apikey": []
        }]
  */

  try {
    const event = await Event.findOne({ 
      where: { 
        id: req?.params?.id,
        user_id: req.isce_auth.user.id 
      } 
    });

    if(!event){
      return res.status(404).send({ success: "false", message: "No data found" });
    }
    
    const user = req?.isce_auth.user;
    const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
    const past = (new Date(event?.start_date) < yesterday);

    const prices = await getPrices(event?.id);
    const gallery = await getGallery(event?.id);
    const attendees = await getAttendees(event?.id);
    let chats = await getChats(event?.id);
    chats = chats?.sort(function(a, b) {
      return (a?.updatedAt < b?.updatedAt) ? -1 : ((a?.updatedAt > b?.updatedAt) ? 1 : 0);
    });

    const data = { ...event?.dataValues, gallery, prices, attendees, past, user, chats };

    return res.status(200).send({ success: "true", data });
  } catch (error) {
    logger(error);
    return res.status(500).send({ success: "false", message: "An error occurred" });
  }
};

const getRequestedCards = async (req, res) => {
  //receives event_id, requested card number, event_price_id

  try {
    let price = await Price.findOne({
      where: {
        id: req.body?.event_price_id,
      },
    });

    const updatedOrder = +req?.body?.order_amount + price?.order_amount;
    if(updatedOrder > price?.attendees){
      return res.send({
        success: "false",
        message: "Maximum amount reached"
      });
    }

    /* NEEDS UPDATE */
      //send a mail to isce indicating that a card request has been made
        //mail will contain user details, event details, and the total cost of cards

      //send a mail to user indicating that they will receive the cards soon
          //mail will contain user details, event details, and the total cost of cards

      //update price table

      await Price.update({ order_amount: updatedOrder }, {
        where: {
          id: req.body?.event_price_id,
        },
      });

      return res.send({
        success: "true",
        message: "Updated successfully",
        data: { order_amount: updatedOrder }
      });
  } catch (error) {
    logger(error)
    return res.send({
      success: "false",
      message: "Unable to update data"
    });
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  searchEvents,
  searchEventsByTown,
  getEvent,
  getRequestedCards
};