const express = require('express');
const router = express.Router();
const costsController = require("../../controllers/costs.controller")

router.route('/')
    .post(costsController.createCost)
    .get(costsController.getCosts)
    .delete(costsController.deleteAllCostEntries)

module.exports = router;