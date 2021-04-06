const { Sequelize, Model, DataTypes, Database } = require("sequelize");
const sequelize = require("../db.js");

//create model.Define method takes two arguments
//1- table name, 2 - column names
// const users_db = sequelize.define(
//   "data",

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
    sessions: DataTypes.STRING,
  },
  // Other model options go here
  {
    //Enforcing the table name to be equal to the model name
    //freezeTableName: true,
    //tableName: "Users",
    sequelize,
    modelName: "user",
  }
);

//);

//console.log(users_db.tableName);
//sync the model to the db

/*
(async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Database & Table created!");
    })
    .catch((err) => {
      console.log(err);
    });
})();
*/
//module.exports = users_db;
module.exports = User;
