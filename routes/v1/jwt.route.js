const express = require('express');
const jwtController = require('../../controllers/jwt.controller');
const router = express.Router();

router.route('/')
    .post(jwtController.generateJWT)

module.exports = router;