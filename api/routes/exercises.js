const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const multer = require('multer');
const Exercise = require('../models/exercise');
const ExerciseController = require('../controllers/exercises');

// multer ustawienia zdjec - zapis
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage });

//GET ALL

router.get('/', ExerciseController.exercises_get_all);

// GET EXERCISE WHERE ID === EXERCISEID
router.get('/:exerciseId', ExerciseController.exercises_get_exercise);

//POST EXERCISE
router.post('/', upload.single('image'), ExerciseController.exercises_post_exercise);

//PATCH EXERCISE
router.patch('/:exerciseId', ExerciseController.exercises_patch_exercise);

// DELETE EXERCISE
router.delete('/:exerciseId', ExerciseController.exercises_delete_exercise);

module.exports = router;