var express = require('express');
var router = express.Router();
const userModel = require("./users");
const passport = require('passport');

const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/register', function(req, res) {
    var userdata = new userModel({
      username:String,
      secret:String
    });

    userModel.register(userdata,req.body.password)
    .then(function(registeredUser){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
        
      })
    })
});

module.exports = router;
