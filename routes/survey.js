const mongoose = require('mongoose');
const userLogin = require('../middlewares/userLogin');
const userCredit = require('../middlewares/userCredit');
const Survey = mongoose.model('Serveys');
const Mailer = require('../service/sendGrid');
const mailTemplate = require('../template/mailTemplate');
const _ = require('lodash');
const {URL} = require('url');
const Path = require('path-parser').default;




module.exports = async (app) =>{
  app.get('api/surveys', async(req, res)=>{
    const surveys = await Survey.find({ _user : req.user}).select({recipients:false});
    res.send(surveys);
  })
  app.post('/api/survey',userLogin,userCredit, async (req, res) => {
  const {title, body, subject, recipients} = req.body;
  const survey =  new Survey({
    title,
    body,
    subject,
    recipients : recipients.split(',').map((email) => ({ email : email.trim()})),
    _user : req.user.id,
    dateSent : Date.now()
  });

  const mailer = new Mailer(survey, mailTemplate(survey));

  try{
    await mailer.send();
    await survey.save();
    req.user.credits -=1;
    const user = await req.user.save();
    res.send(user);
  }catch(err){
    res.status(422).send(err);
  }
  })

  app.post('/api/sendGridNotify', (req, res)=>{
    const path = new Path(`/api/:surveyId/feedback/:response`);

    const survey =  _.chain(req.body)
                     .map(({url, email})=>{
                            if(url){
                              let {surveyId, response} = path.test(new URL(url).pathname);
                              if(pathObj){
                                return {email, surveyId, response}
                              }
                            }
                          })
                      .compact()
                      .uniqBy('email', 'surveyId')
                      .each(({email, surveyId, response}=>{
                        Survey.updateOne({
                          _id : surveyId,
                          recipients : {
                          $elemMatch : {email : email,responded : false}
                          },
                          {
                            $inc : [response]:1,
                            $set : 'recipients.$.responded' : true,
                            lastResponded : new Date
                          }
                        }).exec()
                      }))
                      .value();

    res.send({});
  })

  app.get('/api/:surveyId/feedback/:response', (req, res)=>{
    res.send(`Thank you for your feedback`);
  })
}
