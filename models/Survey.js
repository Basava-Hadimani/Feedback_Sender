const mongoose = require('mongoose');
const {Schema} = mongoose;
const Recipients = require('./recipients');

const serveySchema = new Schema({
  title : String,
  body : String,
  subject : String,
  recipients : [Recipients],
  yes : {type : Number, default : 0},
  no : {type : Number, default : 0},
  _user : {type:Schema.Types.ObjectId, ref : 'users'},
  dateSent : Date,
  lastResponded : Date
})

mongoose.model('Serveys', serveySchema);
