/* Sekcja odpowiedzialna za model posiłku. Definiowanie posiłków. */

const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name:{type: String, required: true},
    oneServing:{ type: Number, default: 0 },
    kcal: { type: Number, default: 0 },
    proteins: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    salt: {type: Number, default: 0},
    fiber: {type: Number, default: 0}
});

module.exports = mongoose.model('Meal', mealSchema);