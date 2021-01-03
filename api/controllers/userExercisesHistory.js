const ExercisesHistory = require('../models/userExerciseHistory');
const mongoose = require('mongoose');

// GET ALL
exports.exercisesHistory_get_all = (req, res, next) => {
    ExercisesHistory.find()
    .exec()
    .then(docs => {
        const respone = {
            count: docs.length,
            exercises: docs.map(doc => {
                return {
                    _id: doc._id,
                    idUser: doc.idUser,
                    date: doc.date,
                    kcal: doc.kcal,
                    time: doc.time,
                    exercises: doc.exercises,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/userExercisesHistory/' + doc._id
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

// GET EXERCISEHISTORY EXERCISEHISTORYID
exports.exercisesHistory_get_exerciseHistory_exerciseHistoryId = (req, res, next) => {
    const id = req.params.exercisesHistoryId;
    ExercisesHistory.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
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

// GET EXERCISEHISTORY USERID
exports.exercisesHistory_get_exerciseHistory_userId = (req, res, next) => {
    const id = req.params.userId;
    ExercisesHistory.find({idUser: id})
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

// POST EXERCISEHISTORY
exports.exercisesHistory_post_exerciseHistory = (req, res, next) => {
    const exerciseHistory = new ExercisesHistory({
        _id: new mongoose.Types.ObjectId(),
        idUser: req.body.idUser,
        date: req.body.date,
        kcal: req.body.kcal,
        time: req.body.time,
        exercises: req.body.exercises
    });
    exerciseHistory
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created exercise succesfully',
                createdExercise: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

//PATCH
exports.exercisesHistory_patch_exerciseHistory = (req, res, next) => {
    const id = req.params.exercisesHistoryId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ExercisesHistory.update({ _id: id }, { $set: updateOps })
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
exports.exercisesHistory_delete_exerciseHistory = (req, res, next) => {
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