const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Import your User model

const verifyJWT = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ error: true, message: 'Unauthorized access' });
        }

        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: true, message: 'Unauthorized access' });
            }

            // Use Mongoose to find the user by email from the decoded JWT
            const user = await User.findOne({ email: decoded.email });

            if (!user) {
                return res.status(401).json({ error: true, message: 'Unauthorized access' });
            }

            // Attach the decoded user information to the request object
            req.decoded = decoded;
            next();
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};

module.exports = verifyJWT;