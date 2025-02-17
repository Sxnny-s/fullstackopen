import { useState, useEffect} from 'react'
import axios from 'axios'
import peopleServices from './services/people'
import people from './services/people'


const Filter = ({value,onChange}) => {
   return <div>Filter Shown with <input value={value} onChange={onChange}/></div>
}

const PersonForm = ({onSubmit,nameVal,NumVal,nameFunc,numFunc}) => {
  return <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameVal} onChange={nameFunc} />
        </div>
        <div>
          Number: <input value={NumVal} onChange={numFunc}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form >

}

const Notification = ({message}) => {
  if(message === null) return null
  return (
    <div className='error'>
      {message}
    </div>
  )
}


const Persons = ({persons,newFilter,onClick}) => {

  return <ul>
          {persons.filter(people => people.name.toLowerCase().includes(newFilter.toLowerCase())).map((people) => 
            <li key={people.name}>
            {people.name} {people.number}
            <button  onClick={() => onClick(people.id,people.name)} >Delete</button>
            </li>
          )}   
      </ul>
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    peopleServices.getAll()
      .then(res => {
        setPersons(res.data)
      })
  }


  useEffect(hook, [])


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
      
      const existingPerson = persons.find(people => people.name === newName)
    
      if(confirm(`${existingPerson.name} is already added to the phone book, replace the old number with the new one?`)){
        const updatedPerson = {...existingPerson, number: newNumber}
        peopleServices.update(existingPerson.id,updatedPerson)
        .catch(err =>{
          setErrorMessage(`${existingPerson.name} has already beem removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          },3000)
          setPersons(persons.filter((people => people.name !== existingPerson.name)))
        });
          setPersons(persons.map(person =>
          person.id !== existingPerson.id ? person : updatedPerson
        ))
      }
    }else{
      peopleServices.create(newPerson)
      .then(res => {
        console.log(res)
      })
      setPersons(persons.concat(newPerson))
      
      setErrorMessage(`${newName} has been added`)
      
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
      setNewName('')
      setNewNumber('')
    }}
  }

  const removePerson = (id,name) => {
    if(confirm(`Delete ${name} ?`)){
      peopleServices.remove(id)
      setPersons(persons.filter(people => people.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter onChange={handleNewFilter} value={newFilter}/>
      <PersonForm onSubmit={addName} nameVal={newName} NumVal={newNumber} nameFunc={handleNewName} numFunc={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} onClick={removePerson} />
    </div>
  )
}

export default App