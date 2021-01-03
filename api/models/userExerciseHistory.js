const mongoose = require('mongoose');

const exerciseHistory = [{
    idExercise: {type: String},
    time: {type: Number, default: 0},
    kcal: {type: Number, default: 0}
}];

const userExerciseHistorySchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    idUser: { type: String, required: true },
    date: { type: Number, required: true },
    kcal:  { type: Number, default: 0 },
    time: {type: Number, default: 0},
    exercises: { type: exerciseHistory }
});

module.exports = mongoose.model('History', userExerciseHistorySchema);