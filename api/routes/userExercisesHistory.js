const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const ExercisesHistoryController = require('../controllers/userExercisesHistory');

// IMPORT USEREXERCISEHISTORYSCHEMA
const ExercisesHistory = require('../models/userExerciseHistory');

//GET all exercisesHistory
router.get('/', ExercisesHistoryController.exercisesHistory_get_all);

// GET MEAL EXERCISEHISTORYID
router.get('/:exercisesHistoryId', ExercisesHistoryController.exercisesHistory_get_exerciseHistory_exerciseHistoryId);

// GET A mealHistory where user.Id === id
router.get('/users/:userId', ExercisesHistoryController.exercisesHistory_get_exerciseHistory_userId);

//POST exercisesHistory
router.post('/', ExercisesHistoryController.exercisesHistory_post_exerciseHistory);

//PATCH 
router.patch("/:exercisesHistoryId", ExercisesHistoryController.exercisesHistory_patch_exerciseHistory);

// DELETE
router.delete("/:exercisesHistoryId", ExercisesHistoryController.exercisesHistory_delete_exerciseHistory);

module.exports = router;