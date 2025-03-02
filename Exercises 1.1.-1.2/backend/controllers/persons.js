

const contactRouter = require('express').Router()
const Contact = require('../models/contact')


contactRouter.get('/', (req,res) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
})

contactRouter.get('/:id', (req, res,next) => {
  Contact.findById(req.params.id).then(contact => {
    if(contact) {
      res.json(contact)
    }else{
      res.status(400).end()
    }
  })
    .catch(err => next(err))

})

contactRouter.post('/', (req,res,next) => {
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

contactRouter.delete('/:id', (req,res,next) => {
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

contactRouter.put('/:id', (req,res,next) => {
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

module.exports = contactRouter