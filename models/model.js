const { Sequelize, Model, DataTypes, Database } = require("sequelize");
const sequelize = require("../db.js");

//create model
const users_db = sequelize.define(
  "data",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
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
    tableName: "Users",
  }
);

console.log(users_db.tableName);

module.exports = users_db;
