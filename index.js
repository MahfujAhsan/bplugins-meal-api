const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./utils/dbConnect');
const port = process.env.PORT || 200;
const jwtRoutes = require("./routes/v1/jwt.route");
const userRoutes = require("./routes/v1/user.route");
const depositRoutes = require("./routes/v1/deposit.route");
const mealRoutes = require("./routes/v1/meal.route");
const costsRoutes = require("./routes/v1/costs.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// api routes
app.use('/api/v1/jwt', jwtRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/users/manager', userRoutes);
app.use('/api/v1/deposit', depositRoutes);
app.use('/api/v1/meal', mealRoutes);
app.use('/api/v1/cost', costsRoutes);

app.get('/', (req, res) => {
    res.send('Server Running...')
})

const database = 'meal-management-db';

const startServer = async (req, res) => {
    try {
        await connectDB(database);
        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error)
    }
};

startServer();


