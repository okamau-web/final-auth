const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require('bcrypt')
const passport = require('passport')


const  session = require('express-session');
const app = express();
//const MongoStore = require("connect-mongo")(session);
 app.use(
 session({
   name: "kamaa.sid",
   resave: false,
   saveUninitialized: false,
   secret: "secret",
   cookie: {
     maxAge: 36000000,
     httpOnly: false,
     secure: false,
   }
  })
);

require("./passport-config");


app.use(passport.initialize());
app.use(passport.session());





const PORT = 3000;
const api = require("./routes/api");


app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials:true
}));

app.use(bodyParser.json());

app.use("/api", api);

app.get("/", function(req, res) {
    res.send("Hello from" + PORT);
});

app.listen(PORT, function() {
    console.log("This Server is running" + '' + PORT);
});
