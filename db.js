const { Sequelize, Model, DataTypes } = require("sequelize");

//passing a connection URI to connect to the DB
const sequelize = new Sequelize("test-db", "user", "pass", {
  //host: "localhost",
  host: "db.sqlite",
  dialect: "sqlite",
  //storage: "db.sqlite",
});

//const sequelize = new Sequelize("sqlite::memory");

//testing the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", error);
  });

/*
const users_db = {
  users: {},
  sessions: {},
};
*/
module.exports = sequelize;
