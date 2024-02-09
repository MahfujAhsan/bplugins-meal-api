const express = require('express');
const router = express.Router();
const depositController = require('../../controllers/deposit.controller');
const verifyJWT = require('../../middlewares/verifyJWT');

router.route('/')
    .post(depositController.createDepositByManager)
    .get(depositController.getAllUsersDepositInfo)


router.route('/wallet-info')
    .get(verifyJWT, depositController.getDepositInfoByUser)


router.route('/:id')
    .get(depositController.getDepositById)
    .patch(depositController.editDepositById)

module.exports = router;