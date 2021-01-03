const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const MealController = require('../controllers/meals');
const Meal = require("../models/meal");

//GET ALL
router.get('/', MealController.meals_get_all);

// GET MEAL WHERE ID === MEALID
router.get('/:mealId', MealController.meals_get_meal);

//POST MEAL
router.post('/', MealController.meals_post_meal);

//PATCH EXERCISE
router.patch('/:mealId', MealController.meals_patch_meal);

// DELETE EXERCISE
router.delete('/:mealId', MealController.meals_delete_meal);

module.exports = router;