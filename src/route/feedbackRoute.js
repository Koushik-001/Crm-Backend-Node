const express = require('express')
const router = express.Router()
const feedbackController = require('../controller/feedbackController')
const verifyToken = require('../middleware')

router.post('/user_feedback', verifyToken, feedbackController.createFeedback)
router.get('/get_feedback', verifyToken, feedbackController.getFeedback)
router.patch('/update_feedback/:id', verifyToken, feedbackController.updateFeedback)
router.delete('/delete_feedback/:id', verifyToken, feedbackController.deleteFeedback)

module.exports = router;
