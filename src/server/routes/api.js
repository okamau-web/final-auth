const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/user");
const Property = require("../model/property");
const mongoose = require("mongoose");
const passport = require('passport')
const bcrypt = require('bcrypt')

const link = require('./p')
mongoose
  .connect(link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

router.get("/", function (req, res) {
  res.send("From API router");
});

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}

router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

router.get('/user',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}



router.post("/property", (req, res) => {
  var property = new Property(req.body);

  property
    .save()
    .catch((e) => {
      console.log("error occured", e);
    });
});


router.get("/property", (req, res) => {
  let jobData = req.body;

  User.findOne({jobData }, (error, job) => {
    if (error) {
      //console.log(error);
    } else{

        res.status(200).send('ok');
      }

  });
});


module.exports = router;
