const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
    {
        walletID: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    },
    {
        collection: 'deposits'
    }
);

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;