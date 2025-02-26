const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('tiny')); 
const cors = require('cors')
app.use(cors())

let people = [
    { id: 1, name: "Arto Hellas", number: "040-123456" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  ];

app.get('/', (req,res) => {
    res.json(people)
})

app.post('/', (req,res) => {
    const maxId = people.length > 0 ? Math.max(...people.map(person => person.id )) : 0
    const contact = req.body
    contact.id = maxId + 1
    people.concat(contact)
    console.log(contact)
    res.json(contact)

})


const PORT = process.env.PORT = 3000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)