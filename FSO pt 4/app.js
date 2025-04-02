const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')


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
app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.tokenExtractor, blogRouter)
app.use('/api/users', usersRouter)

module.exports = app