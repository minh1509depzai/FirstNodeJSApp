const express = require('express')
const AuthenController = require('../../../controllers/AuthenController')

const router = express.Router();

router
    .route('/register')
    .post(AuthenController.createUser)

module.exports = router