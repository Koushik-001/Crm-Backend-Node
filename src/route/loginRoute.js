const express = require('express')
const router = express.Router()
const userloginController = require('../controller/loginController')

router.get('/users', userloginController.getUsers);
router.post('/login', userloginController.createUser);

module.exports = router;