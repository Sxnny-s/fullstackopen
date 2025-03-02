require('dotenv').config()
const mongoose = require('mongoose')
const config = require('../utils/config')




const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number : {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        // This regex allows common phone number formats
        const phoneRegex = /^(?:\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/
        return phoneRegex.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})




module.exports = mongoose.model('Contact', phoneBookSchema)