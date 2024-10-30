"use strict";

const { Op } = require("sequelize");
const { Invitation, Attendee } = require("../models");
const logger = require("../util/log");
const crypto = require('crypto');
const { guid, sortDate } = require("../util");
const { error } = require("console");
const slugify = require('slugify');


const createInvitation = async (req, res) => {
    try {
        const inviteToken = crypto.randomBytes(32).toString('hex');

        const { event_id, invitation_name, invitation_desc, event_name, event_invitee_email, event_invitee_name, event_invitee_phone } = req.body; // Destructure event_id from request body

        // Check if event_id is provided
        if (!event_id) {
            return res.status(400).send({
                success: "false",
                message: "Event ID is required.",
            });
        }
        id = guid();

        const event_clean_name = slugify(event_name);
        const invitation = await Invitation.create({
          id,
          invitation_name,
          invitation_desc,
          event_id,
          event_name: event_clean_name,
          event_invitee_name,
          event_invitee_email,
          event_invitee_phone,
          token: inviteToken,
          accepted: false,
        });
        
        const inviteLink = `https://yourapp.com/invite/${req?.body?.event_id}/${inviteToken}`;
        if (invitation) {
          return res.status(200).send({
            success: "true",
            message: "Invitation created successfully",
            data: invitation,
          });
        } else {
          console.log('No invitation created');
        }
        
    } catch (error) {
      console.error("Error creating invitation:", error);
        logger(error);
        return res.status(500).send({ success: "false", message: error?.message, error: error });
      }
}

const updateInvitation = async (req, res) => {

  try {
    const { id } = req.params;
    const invitation = await Invitation.findOne({ 
      where: { 
        id,
      } 
    });

    if(!invitation) {
      return res.status(200).send({ success: "false", message: "No invitation specified" });
    }

      console.log(req?.body.event_name);

      req.body.event_name = slugify(req?.body?.event_name);
      await Invitation.update(
        req.body, 
        { 
          where: { id: req?.params?.id },  
          returning: true  
        }
      );

    const updatedInvitation = await Invitation.findOne({ where: { id } });
  
    //   console.log(req?.body);
    //   await Invitation.update({data: req.body}, {
    //   where: {
    //     id: id,
    //   }, 
    // });
    // console.log(req.body);

    res.send({
    success: "true",
    data: { updatedInvitation },
});
} catch (error) {
logger(error);
return res.status(500).send({ success: "false", message: "An error has occurred" });
}
}




const getAndValidateInvitation = async (req, res) => {
    try {
        const { eventId, inviteToken } = req.params;

        const invitation = await Invitation.findOne({
            where: {
              token: inviteToken,
              event_id: eventId,
            },
          });
        
        if (!invitation) {
            return res.status(400).send({ success: false, message: 'Invalid invitation link' });
        }

            // Allow the user to accept the invitation
        res.send({ success: true, message: 'Invitation is valid. Proceed to accept.', data: invitation });
        
    } catch (error) {
        logger(error);
        return res.status(500).send({ success: "false", message: error?.message });
      }
}

const acceptInvitation = async (req, res) => {
    try {
        const { inviteToken } = req.params;

        const invitation = await Invitation.findOne({
            where: { token: inviteToken },
          });
        
        if (!invitation) {
            return res.status(400).send({ success: false, message: 'Invalid invitation' });
        }

        await Invitation.update(
          { accepted: true }, 
          { where: { token: inviteToken } } 
      );



        // Add the invitee to the event, if necessary

       const attendee = await Attendee.create({
            id: guid(),
            event_id: invitation.event_id,
            event_name: invitation.event_name,
            name: req?.body?.event_invitee_name,
            email: req?.body?.event_invitee_email,
            phone: req?.body?.event_invitee_phone,
            token: inviteToken, // Save the token to track the invitation
            // You can add other relevant fields such as ticket, price_category, etc.
          });
        
        res.send({ success: true, message: 'Invitation accepted!', data: attendee });
        
    } catch (error) {
        logger(error);
        return res.status(500).send({ success: "false", message: error?.message });
      }
}

const deleteInvitation = async (req, res) => {

  try {
    if(!req?.params?.id){
      res.status(404).send({
        success: "false",
        message: "Invalid invitation id",
      });
    }

    const { id } = req.params;

    const invitation = await Invitation.destroy({
        where: { id },
      });


    if(!invitation){
      res.status(404).send({
        success: "false",
        message: "Invitation not available",
      });
    }
  
    res.status(200).send({
      success: "true",
      message: "Invitation deleted",
      data: { invitation },
    });
  } catch (error) {
    logger(error);
    res.status(500).send({ success: "false", message: "An error occurred" });
  }
};

const deleteEventInvitation = async (req, res) => {

  try {
    if(!req?.params?.event_id){
      res.status(404).send({
        success: "false",
        message: "Invalid invitation id",
      });
    }

    const { event_id } = req.params;

    const invitations = await Invitation.destroy({
        where: { event_id },
      });


    if(!invitations){
      res.status(404).send({
        success: "false",
        message: "No invitations for that event",
      });
    }

  
    res.status(200).send({
      success: "true",
      message: "Invitations for that event have been deleted succefully",
      data: invitations
    });
  } catch (error) {
    logger(error);
    res.status(500).send({ success: "false", message: "An error occurred" });
  }
};

module.exports = {
    createInvitation,
    getAndValidateInvitation,
    acceptInvitation,
    deleteInvitation,
    deleteEventInvitation,
    updateInvitation
  };



