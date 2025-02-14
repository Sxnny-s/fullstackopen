import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const handleNewName = (e) => {
    setNewName(e.target.value)
    
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNewFilter = (e) => {
    setNewFilter(e.target.value)
    
  }


 
  const addName = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber}
    {if(persons.some(people => people.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }}
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter Shown with<input value={newFilter} onChange={handleNewFilter}/></div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form >
      <h2>Numbers</h2>
      <ul>
          {persons.filter(people => people.name.toLowerCase().includes(newFilter.toLowerCase())).map((people) => 
            <li key={people.name}>{people.name} {people.number}</li>
          )}
      </ul>
  
    </div>
  )
}

export default App