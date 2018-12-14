const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require("./models/users");
require("./models/Survey");
require('./service/passport');


app.use(bodyParser.json());
app.use(cookieSession({
  maxAge : 30 * 24 * 60 * 60 * 1000,
  keys :  [keys.CookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(keys.MongooseKey);

require('./routes/googleAuth')(app);
require('./routes/stripe')(app);
require('./routes/survey')(app);

if(process.env.NODE_ENV === "production"){
  //for js files
  app.use(express.static("client/build"));

  //for html files
  const path = require('path');
  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
