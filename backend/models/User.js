const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    height: { type: Number },
    weight: { type: Number },
    fitnessGoal: { type: String, default: 'General Fitness' },
    goals: {
        steps: { type: Number, default: 10000 },
        water: { type: Number, default: 2.5 },
        calories: { type: Number, default: 2500 },
        workoutDuration: { type: Number, default: 60 } // in minutes
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
