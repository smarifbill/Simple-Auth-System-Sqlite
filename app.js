const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");
const matchCredentials = require("./utils.js");
const users_db = require("./models/model");
const app = express();

const port = process.env.PORT || 4000;

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Render static files
app.use(express.static("static"));

// show home with forms
app.get("/", function (req, res) {
  res.render("pages/home");
});

// create a user account
app.post("/create", function (req, res) {
  users_db
    .create({
      name: req.body.username,
      password: req.body.password,
    })
    .then(function (dataa) {
      res.redirect("/");
    })
    .catch(function (error) {
      console.log(`error occured`, err);
    });
  console.log(users_db.name);
});

// login
app.post("/login", function (req, res) {
  /*
  users_db
    .findAll({
      where: { name: req.body.username, password: req.body.password },
      //where: { name: users_db.name, password: users_db.password },
    })
    .then(function (dataa) {
      /*
      if (matchCredentials(req.query)) {
        let user = users_db.name[req.query.username];
        console.log(user);
        // this creates a random id that is,
        // for all practical purposes,
        // guaranteed to be unique. We’re
        // going to use it to represent the
        // logged in user, and their session
        let id = uuidv4();
        // create session record
        // Use the UUID as a key
        // for an object that holds
        // a pointer to the user
        // and their time of login.
        // If we have any data that we
        // want to hold that doesn’t belong in
        // database, can put it here as well.
        users_db.sessions[id] = {
          user: user,
          timeOfLogin: Date.now(),
        };
        console.log(users_db.sessions);

        // create cookie that holds the UUID (the Session ID)
        res.cookie("SID", id, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        });
        res.render("pages/home");
      } else {
        res.redirect("/error");
      }
      
      
    })
    .catch(function (error) {
      console.log("error occured", error);
    });
  */
  if (
    matchCredentials(req.body)
    /*
        req.body.username === users_db.name &&
        req.body.password === users_db.password
        */
  ) {
    //let userid = users_db.id;
    let userid = users_db.name[req.body.username];
    console.log(userid);
    // this creates a random id that is,
    // for all practical purposes,
    // guaranteed to be unique. We’re
    // going to use it to represent the
    // logged in user, and their session
    let id = uuidv4();
    // create session record
    // Use the UUID as a key
    // for an object that holds
    // a pointer to the user
    // and their time of login.
    // If we have any data that we
    // want to hold that doesn’t belong in
    // database, can put it here as well.
    users_db.sessions[id] = {
      user: userid,
      timeOfLogin: Date.now(),
    };
    console.log(users_db.sessions);

    // create cookie that holds the UUID (the Session ID)
    res.cookie("SID", id, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    //res.render("pages/home");
    res.redirect("/supercoolmembersonlypage", { data: dataa });
  } else {
    res.redirect("/error");
  }
});

// this is the protected route
app.get("/supercoolmembersonlypage", function (req, res) {
  let id = req.cookies.SID;
  // attempt to retrieve the session.
  // if session exists, get session
  // otherwise, session === undefined.
  let session = users_db.sessions[id];
  // if session is undefined, then
  // this will be false, and we get sent
  // to error.ejs

  if (session) {
    res.render("pages/members");
  } else {
    res.render("pages/error");
  }
});

//delete cookie when user logs out
//when user logs in again, a new session id is created
//which allows user to access member page
//but when user clicks on 'back 2 home', cookie is deleted
//trying to access without logging in gives the error page
app.get("/logout", (req, res) => {
  //remove cookie
  res.clearCookie("SID");
  //go back to home when user clicks log out
  res.redirect("/");
});

// if something went wrong, you get sent here
app.get("/error", function (req, res) {
  res.render("pages/error");
});

// 404 handling
app.all("*", function (req, res) {
  res.render("pages/error");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
