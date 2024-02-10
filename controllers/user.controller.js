const User = require("../models/userModel");
const { generateUserId } = require("../utils/user.utils");

module.exports.createUser = async (req, res, next) => {
    try {
        const userData = req.body;

        const bPluginsID = await generateUserId();

        userData.bPluginsID = bPluginsID;



        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: userData.email });

        // console.log(userData)

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        // If no existing user is found, create a new user
        const user = new User(userData);

        const result = await user.save();

        return res.status(200).json({
            success: true,
            data: result,
            message: "User created successfully"
        });

    } catch (error) {
        // Respond with internal server error for other types of errors
        return res.status(500).json({
            success: false,
            message: error
        });
    }
}

module.exports.getUsers = async (req, res, next) => {
    try {
        // Use Mongoose to query the database for all users
        const users = await User.find();

        // Respond with the list of users
        res.status(200).json(users);
    } catch (err) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal server error' });
        next(err)
    }
}

module.exports.getCurrentUser = async (req, res, next) => {
    try {
        const email = req?.query?.email;

        if (!email) {
            return res.status(200).json([]);
        }

        const decodedEmail = req?.decoded?.email;

        if (email !== decodedEmail) {
            return res.status(403).json({ error: true, message: 'Forbidden access' });
        }

        const user = await User.findOne({ email: decodedEmail });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal server error' });
        next(error);
    }
}

module.exports.checkManagerStatus = async (req, res, next) => {
    try {
        const userEmail = req.params.email

        if (req.decoded.email !== userEmail) {
            return res.status(200).json({ manager: false })
        }

        const user = await User.findOne({ email: userEmail });

        const isManager = user?.role === 'manager';

        const result = { manager: isManager };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: true, message: 'Internal server error' });
        next(error)
    }
}

module.exports.updateUserRole = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updatedRole = 'manager'; // The role you want to set

        // Use Mongoose to update the user's role
        const user = await User.findByIdAndUpdate(
            userId,
            { role: updatedRole },
            { new: true });

        if (!user) {
            // User not found
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        // Respond with the updated user
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Internal server error' });
        next(err);
    }
}

module.exports.updateProfile = async (req, res, next) => {
    try {
        const { email } = req.decoded; // Get the email from the decoded token
        const { image, name, newEmail } = req.body; // Extract fields to update from request body

        // Find the user based on the decoded email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        // Update user fields if provided in the request body
        if (image) user.image = image;
        if (name) user.name = name;
        if (newEmail) user.email = newEmail;

        // Save the updated user object
        await user.save({ new: true });

        // Return the updated user information
        res.status(200).json(user);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
}