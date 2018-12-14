const passport = require('passport');


module.exports = app =>{
  app.get('/auth/google', passport.authenticate('google',{
    scope : ['profile', 'email']
  }))

  app.get('/auth/google/callback',
  passport.authenticate('google'),
  (req, res) =>{
    res.redirect('/survey');
  }
  );

  app.get('/api/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
  })
  app.get('/api/currentUser', (req, res) => {
    res.send(req.user);
  })
};
