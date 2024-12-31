
// {
//   "swagger": "2.0",
//   "info": {
//     "version": "1.0.0",
//     "title": "Eventssssss API",
//     "description": "ISCE Events API"
//   },
//   "host": "http://localhost",
//   "basePath": "/",
//   "schemes": [
//     "http",
//     "https"
//   ],
//   "securityDefinitions": {
//     "apikey": {
//       "type": "apiKey",
//       "name": "apikey",
//       "in": "header"
//     }
//   },
//   "consumes": [
//     "application/json"
//   ],
//   "produces": [
//     "application/json"
//   ],
//   "paths": {
//     "/api/events/create": {
//       "post": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Endpoint for creating a new event. Users can add event details including title, description, location, dates, and other relevant information.",
//         "parameters": [
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           },
//           {
//             "name": "obs",
//             "in": "body",
//             "required": true,
//             "description": "Event data required to create a new event.",
//             "schema": {
//               "type": "object",
//               "properties": {
//                 "title": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "description": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "image": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "location": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "user_id": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "start_date": {
//                   "type": "string",
//                   "example": "2024-12-01T18:00:00.000Z"
//                 },
//                 "end_date": {
//                   "type": "string",
//                   "example": "2024-12-02T18:00:00.000Z"
//                 },
//                 "gallery": {
//                   "type": "array",
//                   "items": {
//                     "type": "object",
//                     "properties": {
//                       "name": {
//                         "type": "string",
//                         "example": "string"
//                       },
//                       "image": {
//                         "type": "string",
//                         "example": "string"
//                       }
//                     }
//                   }
//                 },
//                 "prices": {
//                   "type": "array",
//                   "items": {
//                     "type": "object",
//                     "properties": {
//                       "title": {
//                         "type": "string",
//                         "example": "VIP"
//                       },
//                       "amount": {
//                         "type": "number",
//                         "example": 100
//                       }
//                     }
//                   }
//                 }
//               },
//               "required": [
//                 "title",
//                 "description",
//                 "image",
//                 "location",
//                 "user_id",
//                 "start_date",
//                 "end_date",
//                 "gallery",
//                 "prices"
//               ]
//             }
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "404": {
//             "description": "Not Found"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/events": {
//       "get": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Events",
//         "parameters": [
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           },
//           {
//             "name": "page",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "limit",
//             "in": "query",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/events/search": {
//       "get": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Search events using title or description",
//         "parameters": [
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           },
//           {
//             "name": "page",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "limit",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "query",
//             "in": "query",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/events/search-by-town": {
//       "get": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Search events using town name",
//         "parameters": [
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           },
//           {
//             "name": "page",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "limit",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "query",
//             "in": "query",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/events/{id}": {
//       "get": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Event by id",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "404": {
//             "description": "Not Found"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       },
//       "patch": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Update Event",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           },
//           {
//             "name": "obj",
//             "in": "body",
//             "schema": {
//               "type": "object",
//               "properties": {
//                 "title": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "description": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "image": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "location": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "start_date": {
//                   "type": "string",
//                   "example": "datetime"
//                 },
//                 "end_date": {
//                   "type": "string",
//                   "example": "datetime"
//                 }
//               },
//               "required": [
//                 "title",
//                 "description",
//                 "image",
//                 "location",
//                 "start_date",
//                 "end_date"
//               ]
//             }
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       },
//       "delete": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Delete event by id",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "404": {
//             "description": "Not Found"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/events/{id}/get-cards": {
//       "post": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           }
//         }
//       }
//     },
//     "/api/invite/create": {
//       "post": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           },
//           {
//             "name": "body",
//             "in": "body",
//             "schema": {
//               "type": "object",
//               "properties": {
//                 "event_id": {
//                   "example": "any"
//                 },
//                 "invitation_name": {
//                   "example": "any"
//                 },
//                 "invitation_desc": {
//                   "example": "any"
//                 },
//                 "event_name": {
//                   "example": "any"
//                 },
//                 "event_invitee_email": {
//                   "example": "any"
//                 },
//                 "event_invitee_name": {
//                   "example": "any"
//                 },
//                 "event_invitee_phone": {
//                   "example": "any"
//                 }
//               }
//             }
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/invite/update/{id}": {
//       "patch": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           },
//           {
//             "name": "body",
//             "in": "body",
//             "schema": {
//               "type": "object",
//               "properties": {
//                 "event_name": {
//                   "example": "any"
//                 }
//               }
//             }
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/invite/{eventId}/{inviteToken}": {
//       "get": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "eventId",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "inviteToken",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/invite/accept/{inviteToken}": {
//       "post": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "inviteToken",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/invite/delete-all/{event_id}": {
//       "delete": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "event_id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "404": {
//             "description": "Not Found"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/invite/delete-one/{id}": {
//       "delete": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "404": {
//             "description": "Not Found"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/chat-room/create": {
//       "post": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           },
//           {
//             "name": "body",
//             "in": "body",
//             "schema": {
//               "type": "object",
//               "properties": {
//                 "event_id": {
//                   "example": "any"
//                 },
//                 "event_name": {
//                   "example": "any"
//                 }
//               }
//             }
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/chat-messages/{chat_room_id}": {
//       "get": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "chat_room_id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           },
//           {
//             "name": "Authorization",
//             "in": "header",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "400": {
//             "description": "Bad Request"
//           },
//           "401": {
//             "description": "Unauthorized"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/card/events": {
//       "get": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Events",
//         "parameters": [
//           {
//             "name": "page",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "limit",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "id",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "type",
//             "in": "query",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/card/events/open": {
//       "get": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Events",
//         "parameters": [
//           {
//             "name": "page",
//             "in": "query",
//             "type": "string"
//           },
//           {
//             "name": "limit",
//             "in": "query",
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/card/events/register": {
//       "post": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Event by id",
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "404": {
//             "description": "Not Found"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/card/events/token/{id}": {
//       "get": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Event by id",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/card/events/chip/{id}": {
//       "get": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Event by id",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       },
//       "post": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Event by id",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/card/events/payment/success": {
//       "post": {
//         "description": "",
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "404": {
//             "description": "Not Found"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/attendee/create": {
//       "post": {
//         "tags": [
//           "Attendee"
//         ],
//         "description": "Create Attendee",
//         "parameters": [
//           {
//             "name": "obj",
//             "in": "body",
//             "schema": {
//               "type": "object",
//               "properties": {
//                 "event_id": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "image": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "name": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "email": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "phone": {
//                   "type": "string",
//                   "example": "string"
//                 },
//                 "price_category": {
//                   "type": "string",
//                   "example": "string"
//                 }
//               },
//               "required": [
//                 "event_id",
//                 "image",
//                 "name",
//                 "email",
//                 "phone",
//                 "price_category"
//               ]
//             }
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/attendees/{id}": {
//       "get": {
//         "tags": [
//           "Attendee"
//         ],
//         "description": "Get Attendees by event_id",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/attendees/check/{id}": {
//       "post": {
//         "description": "",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/api/card/events_chat/create/{id}": {
//       "post": {
//         "tags": [
//           "Event"
//         ],
//         "description": "Get Event by id",
//         "parameters": [
//           {
//             "name": "id",
//             "in": "path",
//             "required": true,
//             "type": "string"
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "OK"
//           },
//           "404": {
//             "description": "Not Found"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         },
//         "security": [
//           {
//             "apikey": []
//           }
//         ]
//       }
//     },
//     "/api/send/thankyou": {
//       "get": {
//         "description": "",
//         "responses": {
//           "200": {
//             "description": "OK"
//           }
//         }
//       }
//     }
//   }
// }