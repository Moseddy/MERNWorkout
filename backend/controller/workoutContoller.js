const Workout = require('../model/workoutModel');
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    if(!workouts){
        return res.status(400).json({error: "No workout"})
    }

    return res.status(200).json(workouts)
}

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    try {
        const workout = await Workout.create({
            title, reps, load
        })
        if(!workout){
            return res.status(400).json({ error: "Could not create workout"})
        }

        return res.status(200).json({ workout });

    }catch (error){
        return res.status(400).json({error: "Workout could not be created"})
    }
}

const getWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ error: "Id passed is not valid"})
    }
    try {
        const workout = await Workout.findById(id);
        if(!workout) {
            return res.status(400).json({ error: "No such workout "})
        }

        return res.status(200).json({ workout })
    } catch (error){
        return res.status(400).json({error: error.message})
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Id passed is not valid"})
    }

    try {
        const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body })
        if(!workout){
            return res.status(400).json({ error: "No such workout"})
        }

        return res.status(200).json({ workout })
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Id passed is not valid "})
    }

    try {
        const workout = await Workout.findOneAndDelete({ _id: id})
        if(!workout){
            return res.status(400).json({error: "No such workout"})
        }

        return res.status(200).json({workout})
    } catch (error){
        return res.status(400).json({error: error.message});
    }
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}