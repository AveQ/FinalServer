const mongoose = require('mongoose');

exerciseRate = {
    counter: { type: Number },
    sum: { type: Number },
    rate: { type: Number }
}

const exerciseSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    rate: {
        type: exerciseRate, default: {
            counter: 0,
            sum: 0,
            rate: 0
        }
    },
    popular: { type: Number, default: 0 },
    musclePart: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, default: "" },
    difficult: { type: Number, default: 0 },
    kcalRatio: { type: Number, default: 0 }
});

module.exports = mongoose.model('Exercise', exerciseSchema);