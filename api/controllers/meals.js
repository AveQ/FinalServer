const Meal = require('../models/meal');
const mongoose = require('mongoose');

// GET ALL
exports.meals_get_all = (req, res, next) => {
    Meal.
        find()
        .exec()
        .then(docs => {
            const respone = {
                count: docs.length,
                meals: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        oneServing: doc.oneServing,
                        kcal: doc.kcal,
                        proteins: doc.proteins,
                        carbs: doc.carbs,
                        fats: doc.fats,
                        salt: doc.salt,
                        fiber: doc.fiber,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/meals/' + doc._id
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

// GET MEAL
exports.meals_get_meal = (req, res, next) => {
    const id = req.params.mealId;
    Meal.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    name: doc.name,
                    oneServing: doc.oneServing,
                    kcal: doc.kcal,
                    proteins: doc.proteins,
                    carbs: doc.carbs,
                    fats: doc.fats,
                    salt: doc.salt,
                    fiber: doc.fiber,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/meals/' + doc._id
                    }
                });
            } else {
                res.status(404).json({ message: 'No valid entry found for provided ID' });
            }
        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({ error: err });
            }
        );
}

// POST MEAL
exports.meals_post_meal = (req, res, next) => {
    const mealHistory = new Meal({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        oneServing: req.body.oneServing,
        kcal: req.body.kcal,
        proteins: req.body.proteins,
        carbs: req.body.carbs,
        fats: req.body.fats,
        salt: req.body.salt,
        fiber: req.body.fiber
    });
    mealHistory
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created meal succesfully',
                createdExercise: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//PATCH
exports.meals_patch_meal = (req, res, next) => {
    const id = req.params.mealId;
    res.status(200).json({
        message: 'Updated meal', id: id
    });
}

//DELETE
exports.meals_delete_meal = (req, res, next) => {
    Meal.remove({ _id: req.params.mealId })
        .exec()
        .then(result => {
            console.log('Meal deleted. _id = ' + req.params.mealId)
            res.status(200).json({
                message: 'Meal deleted'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}