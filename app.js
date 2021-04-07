const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("./db");
//const matchCredentials = require("./utils.js");
//const users_db = require("./models/model");
const User = require("./models/model");

//sync the model to the db
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("DB is ready!");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

const port = process.env.PORT || 4000;

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Render static files
app.use(express.static("static"));

const sess_db = {
  sessions: {},
};

// show home with forms
app.get("/", function (req, res) {
  res.render("pages/home");
});

// create a user account
app.post("/create", function (req, res) {
  User.create({
    //saves form data to db
    username: req.body.username,
    password: req.body.password,
  })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (error) {
      console.log(`error occured`, err);
    });
  //console.log(users_db.name);
});

// login
app.post("/login", async function (req, res) {
  //const { username, password } = req.body;
  let whereUser = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!req.body.username || !req.body.password) {
    res.send("login failed");
  } else {
    const usermatch = await User.findAll({ where: whereUser });
    console.log(usermatch);

    if (usermatch) {
      let id = uuidv4();

      sess_db.sessions[id] = {
        user: usermatch,
        timeOfLogin: Date.now(),
      };
      console.log(sess_db.sessions);

      // create cookie that holds the UUID (the Session ID)
      res.cookie("SID", id, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      //res.render("pages/home");
      res.redirect("/supercoolmembersonlypage");
    } else {
      res.redirect("/error");
    }
  }
}); //end of

// this is the protected route
app.get("/supercoolmembersonlypage", function (req, res) {
  let id = req.cookies.SID;
  // attempt to retrieve the session.
  // if session exists, get session
  // otherwise, session === undefined.
  let session = sess_db.sessions[id];
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
