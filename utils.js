/*
utilities file
(i didn't want to clutter the main app.js)
*/

const users_db = require("./models/model");

function matchCredentials(requestBody) {
  if (
    requestBody.username === users_db.name &&
    requestBody.password === users_db.password
  ) {
    return true;
  } else {
    return false;
  }
  /*

let user = users_db.name[requestBody.username];

  if (user !== undefined && requestBody.password === user.password) {
    return true;
  } else {
    return false;
  }

   
  */
}

module.exports = matchCredentials;
