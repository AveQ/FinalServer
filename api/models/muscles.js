/* Sekcja odpowiedzialna za model mięśni.  */

const mongoose = require('mongoose');

const muscleSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name:{type: String, required: true},
    namePL: {type: String, required: true},
    dbName: {type: String, required: true},
    description: { type: String, required: true },
    descriptionPL: { type: String, required: true }
});

module.exports = mongoose.model('Muscle', muscleSchema);