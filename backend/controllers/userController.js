const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all fields')
    }

    // Check existence of the user
    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPass
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})

    // console.log(user.password, password)

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }

    res.json({msg: 'log'})
})

const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, 'abc123', {
        expiresIn: '30d'
    })
}

module.exports = {registerUser, loginUser, getMe}