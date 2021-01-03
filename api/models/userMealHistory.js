const mongoose = require('mongoose');

const mealHistory = [{
    idMeal: {type: String},
    mealAmong: {type: Number, default: 0},
}];

const userMealHistory = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    idUser: { type: String, required: true },
    date: { type: Number, required: true },
    meal_1: { type: mealHistory },
    meal_2: { type: mealHistory },
    meal_3: { type: mealHistory },
    meal_4: { type: mealHistory },
    meal_5: { type: mealHistory },
    meal_6: { type: mealHistory},
    water: {type: Number, default: 0}
});

module.exports = mongoose.model('mealsHistory', userMealHistory);