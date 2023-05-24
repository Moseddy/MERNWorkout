const {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
} = require('../controller/workoutContoller');

const express = require('express');

const router = express.Router();


router.get('/', getWorkouts);

router.post('/', createWorkout);

router.get('/:id', getWorkout);

router.patch('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);

module.exports = router;