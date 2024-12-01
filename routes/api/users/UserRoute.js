const express = require('express');
const UserController = require('../../../controllers/UsersController')

const router = express.Router();

router
    .route('/all')
    .get(UserController.getUserAll)
    .delete(UserController.deleteAllUser)

router
    .route('/:id')
    .get(UserController.getUserByID)
    .delete(UserController.deleteUserByID)
    .post(UserController.createUser)

module.exports = router;