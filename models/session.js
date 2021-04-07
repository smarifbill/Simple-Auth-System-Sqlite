const { Sequelize, Model, DataTypes, Database } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../db.js");
const User = require("./model.js");

//create model
class Session extends Model {}

Session.init(
  {
    // Model attributes are defined here
    sessions: DataTypes.UUIDV4,
    timeOfLogin: DataTypes.TIME,
    allowNull: false,
  },
  // Other model options go here
  {
    sequelize,
    modelName: "session",
  }
);

Session.associate = function (User) {
  // associations can be defined here
  Session.belongsTo(User);
};

// generates a random id and associates it with a user
Session.generate = async function (UserId) {
  if (!UserId) {
    throw new Error("Session requires a user ID");
  }

  let id = uuidv4();

  return Session.create({ id, UserId });
};

//module.exports = users_db;
module.exports = Session;
