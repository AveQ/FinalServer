const Muscle = require('../models/muscles');
const mongoose = require('mongoose');

// GET ALL
exports.muscles_get_all = (req, res, next) => {
    Muscle
        .find()
        .exec()
        .then(docs => {
            const respone = {
                count: docs.length,
                muscles: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        dbName: doc.dbName,
                        description: doc.description,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/muscles/' + doc._id
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

// GET MUSCLE
exports.muscles_get_muscle = (req, res, next) => {
    const id = req.params.exerciseId;
    Muscle.findById(id)
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

// POST MUSCLE
exports.muscles_post_muscle = (req, res, next) => {
    const muscle = new Muscle({
        _id: new mongoose.Types.ObjectId(),
        dbName: req.body.dbName,
        name: req.body.name,
        description: req.body.description
    });
    muscle.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created muscle succesfully',
            createdExercise: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
}

//DELETE
exports.muscles_delete_muscle = (req, res, next) => {
    const id = req.params.exerciseId;
    Muscle.remove({ _id: id })
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