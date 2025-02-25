const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(morgan('dev'))
app.use(express.json())





let people = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

function genID() {
    return Math.floor(Math.random() * 100).toString()
}

// const unknownEndpoint = (request, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/people', (req,res) => {
    res.json(people)
})
app.get('/api/people/:id', (req,res) => {
    const id = req.params.id
    res.json(people[id - 1])
})
app.delete('/api/people/:id', (req,res) => {
    const id = req.params.id
    people =  people.filter(people => people.id != id)

    res.status(204).end()
})

app.post('/api/people', (req,res) => {
    const body = req.body

   if(!body){
    return res.status(400).json({
        error: 'Content Missing'
    })
   }

    if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name and number are required' })
    }

    if (people.some(people => people.name === body.name)){
        return res.status(400).json({error: 'NO duplicates allowed'})
    }

   const newPerson = {
    name: body.name,
    number: body.number,
    id: genID()
   }

    people = people.concat(newPerson)
    res.json(newPerson) 
})



app.get('/info', (req,res) => {
    res.send(`<p>Phonebook has info for ${people.length} people <p/> 
        <br/>
        <p>${Date().toLocaleString()}</p>
        `)
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})