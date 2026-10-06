const asyncHandler = require('express-async-handler');
const Activity = require('../models/Activity');

// Helper to get today's date string (YYYY-MM-DD) based on local timezone or UTC
const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

// @desc    Get today's activity
// @route   GET /api/activity/today
// @access  Private
const getTodayActivity = asyncHandler(async (req, res) => {
    const dateString = getTodayString();
    let activity = await Activity.findOne({ userId: req.user._id, dateString });

    if (!activity) {
        activity = await Activity.create({
            userId: req.user._id,
            dateString,
            steps: 0,
            water: 0,
            caloriesBurned: 0,
            workoutDuration: 0,
            distance: 0,
            workouts: []
        });
    }

    res.status(200).json(activity);
});

// @desc    Update today's activity (e.g. add steps, water)
// @route   PUT /api/activity/today
// @access  Private
const updateTodayActivity = asyncHandler(async (req, res) => {
    const dateString = getTodayString();
    let activity = await Activity.findOne({ userId: req.user._id, dateString });

    if (!activity) {
        activity = await Activity.create({
            userId: req.user._id,
            dateString,
            steps: 0,
            water: 0,
            caloriesBurned: 0,
            workoutDuration: 0,
            distance: 0,
            workouts: []
        });
    }

    activity.steps = req.body.steps !== undefined ? req.body.steps : activity.steps;
    activity.water = req.body.water !== undefined ? req.body.water : activity.water;
    activity.caloriesBurned = req.body.caloriesBurned !== undefined ? req.body.caloriesBurned : activity.caloriesBurned;
    activity.distance = req.body.distance !== undefined ? req.body.distance : activity.distance;

    const updatedActivity = await activity.save();
    res.status(200).json(updatedActivity);
});

// @desc    Add a workout
// @route   POST /api/activity/workout
// @access  Private
const addWorkout = asyncHandler(async (req, res) => {
    const dateString = getTodayString();
    let activity = await Activity.findOne({ userId: req.user._id, dateString });

    if (!activity) {
        activity = await Activity.create({
            userId: req.user._id,
            dateString,
            steps: 0,
            water: 0,
            caloriesBurned: 0,
            workoutDuration: 0,
            distance: 0,
            workouts: []
        });
    }

    const { type, duration, calories } = req.body;

    const newWorkout = { type, duration, calories };
    activity.workouts.push(newWorkout);
    
    // Update total workout duration and calories
    activity.workoutDuration += Number(duration);
    activity.caloriesBurned += Number(calories);

    const updatedActivity = await activity.save();
    res.status(201).json(updatedActivity);
});

// @desc    Get activity history
// @route   GET /api/activity/history
// @access  Private
const getActivityHistory = asyncHandler(async (req, res) => {
    const activities = await Activity.find({ userId: req.user._id }).sort({ dateString: -1 });
    res.status(200).json(activities);
});

module.exports = {
    getTodayActivity,
    updateTodayActivity,
    addWorkout,
    getActivityHistory
};
