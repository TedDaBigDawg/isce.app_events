//DB config
"use strict";
require("dotenv").config();

module.exports = {
  environment: process.env.ENVIRONMENT,
  api: {
    host: process.env.DB_HOST,
    db: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
  server: {
    port: process.env.PORT,
  },
  auth: {
    url: process.env.AUTH_URL
  },
  link: {
    server1: process.env.SERVER_1,
    frontend: process.env.FRONTEND
  }
};
