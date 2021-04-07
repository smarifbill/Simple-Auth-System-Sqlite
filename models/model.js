const { Sequelize, Model, DataTypes, Database } = require("sequelize");
const sequelize = require("../db.js");

//create model
class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /*
    sessions: DataTypes.UUIDV4,
    timeOfLogin: DataTypes.TIME,
    */
  },
  // Other model options go here
  {
    sequelize,
    modelName: "user",
  }
);

/*
User.associate = function ({Session}) {
  User.hasMany(models.Session);
};
*/
//module.exports = users_db;
module.exports = User;
