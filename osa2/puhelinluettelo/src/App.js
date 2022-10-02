import { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [actionType, setActionType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const isInPhonebook = persons.find(({ name }) => name === newName)
    
    if (!isInPhonebook) {
      personService
        .create(nameObject)
        .then(newNote => {
          setPersons(persons.concat(newNote))
          setNewName('')
          setNewNumber('')
          setActionMessage(
            `Added ${nameObject.name} to the phonebook`
          )
          setActionType('success')
          setTimeout(() => {
            setActionMessage(null)
            setActionType(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${nameObject.name} is already added to the phonebook, replace the old number with a new one`)) {
        const alreadyInPhonebook = persons.filter(person => person.name === nameObject.name)
        const id = alreadyInPhonebook[0].id

        personService
          .update(id, nameObject)
          .then(updatedEntry => {
            setPersons(persons.map(person => person.id !== id ? person: updatedEntry))
            setActionMessage(
              `Number of ${nameObject.name} was updated successfully`
            )
            setActionType('success')
            setTimeout(() => {
              setActionMessage(null)
              setActionType(null)
            }, 5000)
          })
          .catch(error => {
            setActionMessage(
              `Information of ${nameObject.name} has already been deleted from server`
            )
            setActionType('error')
            setTimeout(() => {
              setActionMessage(null)
              setActionType(null)
            }, 5000)
          })
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const deletePerson = id => {
    const toBeDeleted = persons.filter(person => person.id === id)[0]
    if (window.confirm(`Delete ${toBeDeleted.name}`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setActionMessage(
            `Deleted ${toBeDeleted.name} from the phonebook successfully`
          )
          setActionType('success')
          setTimeout(() => {
            setActionMessage(null)
            setActionType(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={actionMessage} type={actionType}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Phonebook persons={persons} newFilter={newFilter} handleClick={deletePerson}/>
    </div>
  )
}

export default App
