const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., Running, Walking
    duration: { type: Number, required: true }, // minutes
    calories: { type: Number, required: true },
    time: { type: Date, default: Date.now }
});

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateString: { type: String, required: true }, // Format: YYYY-MM-DD
    steps: { type: Number, default: 0 },
    water: { type: Number, default: 0 }, // in liters
    caloriesBurned: { type: Number, default: 0 },
    workoutDuration: { type: Number, default: 0 }, // total minutes from workouts
    distance: { type: Number, default: 0 }, // in km
    workouts: [workoutSchema]
}, { timestamps: true });

// Ensure one activity record per user per day
activitySchema.index({ userId: 1, dateString: 1 }, { unique: true });

module.exports = mongoose.model('Activity', activitySchema);
