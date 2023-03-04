const asyncHandler = require('express-async-handler');


const getGoals = asyncHandler( async (req, res) => {
    res.status(200).json({message: 'Get Goals'})
})

const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update goal ${req.params.id}`})
})

const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'Set Goal'})
})

const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: `delete goal ${req.params.id}`})
})

module.exports = { getGoals, deleteGoals, updateGoals, setGoals }