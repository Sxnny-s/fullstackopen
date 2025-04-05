const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


userRouter.post('/', async (req,res) => {

    const {username ,name ,password} = req.body

    if(username.length < 3 || password.length < 3){
        res.status(400).json({error: 'username and password must be 3 characters long'})
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = userRouter