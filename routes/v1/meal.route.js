const express = require('express');
const mealController = require('../../controllers/meal.controller');
const router = express.Router();

router.route('/')
    .post(mealController.createMeal)
    .get(mealController.getAllMeal)

module.exports = router;