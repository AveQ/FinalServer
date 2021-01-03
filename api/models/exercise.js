const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    rate: { type: Number, default: 0 },
    popular: { type: Number, default: 0 },
    musclePart: {type: String, required: true},
    image: {type: String, required: true },
    video: {type: String, default: ""},
    difficult: { type: Number, default: 0 },
    kcalRatio: { type: Number, default: 0 }
});

module.exports = mongoose.model('Exercise', exerciseSchema);