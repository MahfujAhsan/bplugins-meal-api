const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true
        },
        selectedDate: {
            type: Date,
            required: true
        },
        breakfast: {
            type: Boolean
        },
        launch: {
            type: Boolean
        },
        dinner: {
            type: Boolean
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'meals'
    }
)

const Meal = mongoose.model('Meals', mealSchema);

module.exports = Meal;