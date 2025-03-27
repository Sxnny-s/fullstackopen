const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB')
})
.catch(error => {
    logger.error('error connecting to MongoDB', error.message)
})

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

module.exports = app