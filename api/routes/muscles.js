const express = require("express");
const router = express.Router();
const MuscleController = require('../controllers/muscles');

//GET ALL
router.get('/', MuscleController.muscles_get_all);

// GET MEAL WHERE ID === MEALID
router.get('/:mealId', MuscleController.muscles_get_muscle);

//POST MEAL
router.post('/', MuscleController.muscles_post_muscle);

// DELETE EXERCISE
router.delete('/:mealId', MuscleController.muscles_delete_muscle);

module.exports = router;