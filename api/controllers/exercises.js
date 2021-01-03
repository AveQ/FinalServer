const Exercise = require('../models/exercise');
const mongoose = require('mongoose');

// GET ALL
exports.exercises_get_all = (req, res, next) => {
    Exercise
        .find()
        .exec()
        .then(docs => {
            const respone = {
                count: docs.length,
                exercises: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        type: doc.type,
                        description: doc.description,
                        rate: doc.rate,
                        popular: doc.popular,
                        musclePart: doc.musclePart,
                        image: doc.image,
                        video: doc.video,
                        difficult: doc.difficult,
                        kcalRatio: doc.kcalRatio,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/exercises/' + doc._id
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

// GET EXERCISE
exports.exercises_get_exercise = (req, res, next) => {
    const id = req.params.exerciseId;
    Exercise.findById(id)
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

// POST EXERCISE
exports.exercises_post_exercise = (req, res, next) => {
    const exercise = new Exercise({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        rate: req.body.rate,
        popular: req.body.popular,
        musclePart: req.body.musclePart,
        image: req.file.path,
        video: req.body.video,
        difficult: req.body.difficult,
        kcalRatio: req.body.kcalRatio,
    });
    exercise.save().then(result => {
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
exports.exercises_patch_exercise = (req, res, next) => {
    const id = req.params.exerciseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Exercise.update({ _id: id }, { $set: updateOps })
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
exports.exercises_delete_exercise = (req, res, next) => {
    const id = req.params.exerciseId;
    Exercise.remove({ _id: id })
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