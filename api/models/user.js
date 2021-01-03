/* Sekcja odpowiedzialna za model użytkownika. Definiowanie użytkownika. */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    email:
    {
        type: String,
        required: true,
        unique: true,
        // regex email
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    nick: { type: String, default:"" },
    weight: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    gender: { type: String, default: 'Mężczyzna' },
    weeklyChange: { type: Number, default: 0 },
    country: { type: String, default: 'Polska' },
    age: { type: Number, default: 0 },
    language: { type: String, default: 'PL' },
    target: { type: Number, default: 0 },
    forecast: { type: String, default: 'decrease' },
    userFavExercises: {type: Array, default:[]},
    startingWeight: { type: Number, default: 0 },
    finalWeight: { type: Number, default: 0 },
    counterSignIn: { type: Number, default: 0 },
    ppm: { type: Number, default: 0 },
    cpm: { type: Number, default: 0 },
    physicalActivity: { type: Number, default: 1.4 },
    isAdmin: {type: Boolean, default: false}

});

module.exports = mongoose.model('User', userSchema);