const express = require('express');
const usersController = require('../../controllers/user.controller');
const verifyJWT = require('../../middlewares/verifyJWT');
const router = express.Router();

router.route('/')
    .post(usersController.createUser)
    .get(usersController.getUsers)

router.route('/currentUser')
    .get(verifyJWT, usersController.getCurrentUser)
    .patch(verifyJWT, usersController.updateProfile)

router.route('/:email')
    .get(verifyJWT, usersController.checkManagerStatus)

router.route('/:id')
    .patch(verifyJWT, usersController.updateUserRole)


module.exports = router;