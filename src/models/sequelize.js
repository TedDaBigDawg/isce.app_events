"use strict";

require("dotenv").config();
const Sequelize = require("sequelize");
const config = require("../config");

let sequelize;
// if(config?.environment === 'prod'){
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: process.env.DB_PORT,
    }
  );
// }else{
//   sequelize = new Sequelize({
//     dialect: 'mysql',
//     storage: '../../USER/database/db.sqlite'
//   });
// }

sequelize.sync({ alter: true })
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch(error => {
    console.error("An error occurred while synchronizing the models:", error);
  });


module.exports = sequelize;
