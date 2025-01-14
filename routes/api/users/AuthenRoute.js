const express = require('express')
const AuthenController = require('../../../controllers/AuthenController')

const router = express.Router();

router
    .route('/register')
    .post(AuthenController.createUser)

router
    .route('/login')
    .post(AuthenController.loginUser)

module.exports = router