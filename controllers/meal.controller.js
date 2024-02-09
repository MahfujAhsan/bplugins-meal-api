const Meal = require("../models/mealModel");

module.exports.getAllMeal = async (req, res, next) => {
    try {
        const mealItems = await Meal.find();
        res.status(200).json({ success: true, data: mealItems });
    } catch (err) {
        next(err);
    }
}

module.exports.createMeal = async (req, res, next) => {
    try {
        const mealData = req.body;

        const meal = new Meal(mealData)

        const result = await meal.save();

        res.status(200).json({
            success: true,
            data: result,
            message: "Meal created successfully!"
        })
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal server error' });
        next(err);
    }
}

