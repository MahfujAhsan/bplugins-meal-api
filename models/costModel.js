const mongoose = require('mongoose')

const costSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        bazarDetails: {
            type: String,
            required: true
        },
        expenseAmount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'costs'
    }
)

const Cost = mongoose.model('Costs', costSchema)

module.exports = Cost