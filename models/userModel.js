const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema(
    {
        bPluginsID: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures email addresses are unique
        },
        role: {
            type: String,
            enum: ['manager', 'member'], // You can adjust the enum values as needed
            default: 'member', // Default role is 'user' if not provided
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true, // Enable timestamps
    },
    {
        collection: 'users'
    }
);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;