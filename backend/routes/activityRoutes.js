const express = require('express');
const router = express.Router();
const { getTodayActivity, updateTodayActivity, addWorkout, getActivityHistory } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.route('/today').get(protect, getTodayActivity).put(protect, updateTodayActivity);
router.post('/workout', protect, addWorkout);
router.get('/history', protect, getActivityHistory);

module.exports = router;
