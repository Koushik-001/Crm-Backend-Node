const express = require('express')
const router = express.Router()
const feebackController = require('../controller/feedbackController')

router.post('/user_feedback',feebackController.createFeedback)
router.get('/get_feedback',feebackController.getFeedback)

module.exports = router;