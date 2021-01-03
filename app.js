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

// MongoDB settings - connection and set unique email
mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_PASSWORD + '@server.umpof.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);
mongoose.set('useCreateIndex', true);

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
app.use('/meals', mealRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/userExercisesHistory', userExercisesHistoryRoutes);
app.use('/mealsHistory', userMealsHistory);
app.use('/pollutions', pollutionExternalApi);
app.use('/users', userRoutes);

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