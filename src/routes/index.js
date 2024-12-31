const { default: axios } = require("axios");
const { Router } = require("express");
const controllers = require("../controllers");
const config = require("../config");
const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
  async function authenticateCheck() {
    const token = req.header("Authorization");
    let email, password, name;

    if (!token) {
      return res.status(401).send({
        success: "false",
        message: "Authorization header is missing",
      });
    } else{
      try {
        // Decode the JWT token to extract the payload (email, password, etc.)
        const decoded = jwt.decode(token);
        console.log('DECODED', decoded);
        name = decoded?.fullname;
        id = decoded?.id;
        email = decoded?.email;
        password = decoded?.password;

        console.log('Email from token:', email);

        console.log('Name from token:', name);

        // console.log('Email from token:', email);
        // If email and password are found in the token, use them
        if (email && password) {
          console.log('Email from token:', email);
          console.log('Password from token:', password);
        } 
      } catch (error) {
        return res.status(400).send({ message: 'Invalid token', error });
      }
    }
    try {
      const { data: auth } = await axios.post(
        config.auth.url + "/auth/signin-events",
        { email: email, password: password },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );
      // console.log('Email from token:', email);
      console.log('AUTH', auth);

      if (auth.success === true) {
        
         user = jwt.decode(auth?.token);
         req.isce_auth = user;
        next();
      } else {
        res.status(401).send({
          success: "false",
          message: "Unauthorized",
        });
      }
    } catch (error) {
      res.status(500).send({
        error,
        success: "false",
        message: "Unauthorized",
      });
    }
  }
  authenticateCheck();
};

const route = Router();

//Event routes

route.post("/api/events/create", authenticate, controllers.createEvent);
route.get("/api/events", authenticate, controllers.getEvents);
route.get("/api/events/search", authenticate, controllers.searchEvents);
route.get("/api/events/search-by-town", authenticate, controllers.searchEventsByTown);

route.get("/api/events/:id", authenticate, controllers.getEvent);
route.patch("/api/events/:id", authenticate, controllers.updateEvent);
route.delete("/api/events/:id", authenticate, controllers.deleteEvent);
route.post("/api/events/:id/get-cards", controllers.getRequestedCards);

//route.post("/api/events/:id/card", authenticate, controllers.get);

//Invitation routes
route.post("/api/invite/create", authenticate, controllers.createInvitation);
route.patch("/api/invite/update/:id", authenticate, controllers.updateInvitation);
route.get("/api/invite/:eventId/:inviteToken", authenticate, controllers.getAndValidateInvitation);
route.post("/api/invite/accept/:inviteToken", authenticate, controllers.acceptInvitation);
route.delete("/api/invite/delete-all/:event_id", authenticate, controllers.deleteEventInvitation);
route.delete("/api/invite/delete-one/:id", authenticate, controllers.deleteInvitation);


//Chat Routes
route.post("/api/chat-room/create", authenticate, controllers.createChatRoom);
route.get("/api/chat-messages/:chat_room_id", authenticate, controllers.getChatMessages);

//Card Event Routes
route.get("/api/card/events", controllers.cardGetEvents);
route.get("/api/card/events/open", controllers.cardGetOpenEvents);
route.post("/api/card/events/register", controllers.cardRegisterEvent);
route.get("/api/card/events/token/:id", controllers.cardTokenPage);
route.get("/api/card/events/chip/:id", controllers.cardChipLoader);
route.post("/api/card/events/chip/:id", controllers.attachTokenToChip);
route.post("/api/card/events/payment/success", controllers.cardPaymentSuccess);

//Attendee routes
route.post("/api/attendee/create", controllers.createAttendee);
//route.post("/api/attendee/update", controllers.updateAttendee);
route.get("/api/attendees/:id", controllers.getAttendees);
route.post("/api/attendees/check/:id", controllers.setCheckedStatus);

//Arena routes
route.post("/api/card/events_chat/create/:id", controllers.saveArenaChat);

route.get("/api/send/thankyou", controllers.sendEndOfEventMails);



module.exports = route;
