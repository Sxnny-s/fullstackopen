require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Contact = require('./models/contact')

const config = require('./utils/config')
const logger = require('./utils/logger')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


app.get('/api/people', (req,res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

app.get('/api/people/:id', (req, res,next) => {
  Contact.findById(req.params.id).then(contact => {
    if(contact) {
      res.json(contact)
    }else{
      res.status(400).end()
    }
  })
    .catch(err => next(err))

})

app.post('/api/people', (req,res,next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number
  })

  contact.save().then(savedContact => {
    res.json(savedContact)
  })
    .catch(err => next(err))
})

app.delete('/api/people/:id', (req,res,next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(response => {
      console.log(res)
      if(res){
        response.status(204).end()
      }else{
        response.status(400).json({ error: 'Contact not found' })
      }
    })
    .catch(err => {
      next(err)
      console.log('error')
    })
})

app.put('/api/people/:id', (req,res,next) => {
  const body = req.body

  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(req.params.id, contact, { number: body.number })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(err => next(err))
})




const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    console.error(err.message)
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

app.use(errorHandler)



const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})