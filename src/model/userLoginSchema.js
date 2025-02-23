const mongoose = require('mongoose');


const loginSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: false }
},{
    versionKey: false  
  });


module.exports = mongoose.model('login_schemas', loginSchema);  
