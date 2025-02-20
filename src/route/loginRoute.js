const express = require('express');
const router = express.Router();
const userloginController = require('../controller/loginController');


/**
 * @swagger
 * **/
router.get('/users', userloginController.getUsers);

/**
 * @swagger
 */
router.post('/login', userloginController.createUser);

module.exports = router;
