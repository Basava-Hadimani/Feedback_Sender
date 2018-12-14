 const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new GoogleStrategy({
  clientID : keys.GoogleClientID,
  clientSecret : keys.GoogleClientSecret,
  callbackURL : '/auth/google/callback',
  proxy : true
},
 async (accessToken, refreshToken, profile, done) =>{
  const existingUser = await User.findOne({googleId : profile.id});
     if(existingUser){
     return done(null, existingUser);
     }
      const newUser = await new User({googleId : profile.id}).save();
      done(null, newUser)
}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user)=>{
    done(null, user);
  })
})
