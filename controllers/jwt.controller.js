const jwt = require('jsonwebtoken');

module.exports.generateJWT = (req, res) => {
    try {
        const user = req.body;

        // Create a JWT token using the user data and your secret key
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};