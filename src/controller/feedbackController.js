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
exports.updateFeedback = async (req, res) => {
    try {
        const data = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.deleteFeedback = async (req, res) => {
    try {
        const data = await Feedback.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(400).json(error);
    }
}
