const { Sequelize, Model, DataTypes } = require("sequelize");

//passing a connection URI to connect to the DB
const sequelize = new Sequelize("db", "user", "pass", {
  host: "localhost",
  dialect: "sqlite",
  storage: "db.sqlite",
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

//sync the model with the db
(async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      /*
      users_db.create({
        name: req.body.username,
        password: req.body.password,
      });
      */
    })
    .catch((err) => {
      console.log(err);
    });
})();

/*
const users_db = {
  users: {},
  sessions: {},
};
*/
module.exports = sequelize;
