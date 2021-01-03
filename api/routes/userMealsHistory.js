const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const MealHistoryController = require('../controllers/userMealsHistory');
// IMPORT 
const MealHistory = require('../models/userMealHistory');

//GET ALL
router.get('/', MealHistoryController.mealHistoryController_get_all);

// GET MEAL - USERID
router.get('/users/:userId', MealHistoryController.mealHistoryController_get_history_userId);

// GET MEAL - HISTORYID
router.get('/meals/:historyId', MealHistoryController.mealHistoryController_get_history_historyId);

//POST MEALHISTORY
router.post('/', MealHistoryController.mealHistoryController_post);

//PATCH 
router.patch('/:mealUserId', MealHistoryController.mealHistoryController_patch);

// DELETE
router.delete('/:exercisesHistoryId', MealHistoryController.mealHistoryController_delete);


module.exports = router;