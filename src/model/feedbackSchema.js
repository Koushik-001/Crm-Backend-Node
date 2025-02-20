const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
product_type:{type:String,require:true},
    mode_of_purchase:{type:String,require:true},
    cost_of_product:{type:String,require:false}
},{
    versionKey: false  
  })

module.exports = mongoose.model('feedback_schemas',feedbackSchema)