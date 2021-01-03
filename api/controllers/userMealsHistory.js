const MealHistory = require('../models/userMealHistory');
const mongoose = require('mongoose');

// GET ALL
exports.mealHistoryController_get_all = (req, res, next) => {
    MealHistory.find()
    .exec()
    .then(docs => {
        const respone = {
            count: docs.length,
            exercises: docs.map(doc => {
                return {
                    _id: doc._id,
                    idUser: doc.idUser,
                    date: doc.date,
                    meal_1: doc.meal_1,
                    meal_2: doc.meal_2,
                    meal_3: doc.meal_3,
                    meal_4: doc.meal_4,
                    meal_5: doc.meal_5,
                    meal_6: doc.meal_6,
                    water: doc.water,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/mealsHistory/' + doc._id
                    }
                };
            }
            )
        }
        console.log(docs);
        res.status(200).json(respone);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

// GET MEAL - USERID
exports.mealHistoryController_get_history_userId = (req, res, next) => {
    const id = req.params.userId;
    MealHistory.find({idUser: id})
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// GET MEAL -HISTORYID
exports.mealHistoryController_get_history_historyId = (req, res, next) => {
    const id = req.params.historyId;
    console.log("dziala")
    MealHistory.findById(id)
        .exec()
        .then(
            doc => {
                console.log(doc);
                if (doc) {
                    res.status(200).json({
                        _id: doc.id,
                        idUser: doc.idUser,
                        date: doc.date,
                        meal_1: doc.meal_1,
                        meal_2: doc.meal_2,
                        meal_3: doc.meal_3,
                        meal_4: doc.meal_4,
                        meal_5: doc.meal_5,
                        meal_6: doc.meal_6,
                        water: doc.water,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/mealsHistory/' + doc._id
                        }
                    });
                } else {
                    res.status(404).json({ message: 'No valid entry found for provided ID' });
                }
            }           
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// POST MEALHISTORY
exports.mealHistoryController_post = (req, res, next) => {
    const mealHistory = new MealHistory({
        _id: new mongoose.Types.ObjectId(),
        idUser: req.body.idUser,
        date: req.body.date,
        meal_1: req.body.meal_1,
        meal_2: req.body.meal_2,
        meal_3: req.body.meal_3,
        meal_4: req.body.meal_4,
        meal_5: req.body.meal_5,
        meal_6: req.body.meal_6,
        water: req.body.water,
    });
    mealHistory
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created mealHistory succesfully',
                id: mealHistory._id,
                createdExercise: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//PATCH
exports.mealHistoryController_patch = (req, res, next) => {
    const id = req.params.mealUserId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    MealHistory.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//DELETE
exports.mealHistoryController_delete = (req, res, next) => {
    const id = req.params.exercisesHistoryId;
    ExercisesHistory.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}