const express = require('express');
const router = express.Router();
const userloginController = require('../controller/loginController');
const verifyToken = require('../middleware');

router.get('/users', verifyToken, userloginController.getUsers);
router.get('/verify-otp', userloginController.verifyUser);
router.post('/login', userloginController.createUser);

module.exports = router;
