const Feedback = require('../model/feedbackSchema')

exports.createFeedback=async(req,res)=>{
    try{const data = new Feedback(req.body)
    await data.save()
    res.status(200).json(data)}
catch(error){
    res.status(400).json(error)
}
}
exports.getFeedback=async(req,res)=>{
    try{const data = await Feedback.find()
            res.status(200).json(data)}
catch(error){
    res.status(400).json(error)
}
}