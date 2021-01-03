const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mealRoutes = require('./api/routes/meals');
const exerciseRoutes = require('./api/routes/exercises');
const userExercisesHistoryRoutes = require('./api/routes/userExercisesHistory');
const userMealsHistory = require('./api/routes/userMealsHistory');
const pollutionExternalApi = require('./api/routes/pollutionExternalApi');
const userRoutes = require('./api/routes/user');
const { performance } = require('perf_hooks');
require('dotenv').config();
// MongoDB settings - connection and set unique email

console.log('[Server] Initialize MongoDB Connection');
let dbConectionTime = performance.now();

mongoose.connect(
    'mongodb+srv://admin:' + process.env.MONGODB_PASSWORD + '@server.umpof.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('[Server] Successfully connected to MongoDB in ' + Math.ceil(performance.now() - dbConectionTime) + 'ms'))
    .catch(error => console.log(error.message));

// morgan
app.use(morgan('dev'));

// przechowywane zdjecia
app.use('/uploads', express.static('uploads'));

// body
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// CROSS SETTINGS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    next();
});

// routes
app.use('/api/meals', mealRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/userExercisesHistory', userExercisesHistoryRoutes);
app.use('/api/mealsHistory', userMealsHistory);
app.use('/api/pollutions', pollutionExternalApi);
app.use('/api/users', userRoutes);

//handling errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;