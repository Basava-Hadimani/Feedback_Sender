const stripe = require("stripe")("sk_test_AuXDjZ0CjIXWElz2DmHfEEa0");
const userLogin = require('../middlewares/userLogin');

module.exports =  app =>{
     app.post('/api/stripeToken',userLogin ,async (req, res) =>{
     const charge =   await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id, // obtained with Stripe.js
      description: "$ 5 fro 5 credits"
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
}
