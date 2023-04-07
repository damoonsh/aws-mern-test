const express = require('express');
const router = express.Router();

const { getGoals, deleteGoals, updateGoals, setGoals } = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals)

module.exports = router