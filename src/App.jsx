import React, { useState, useEffect } from 'react'

import './App.css'
import { Number } from './components/Number.jsx'
import { PersonForm } from './components/PersonForm.jsx'
import { Notification } from './components/Notification.jsx'
import { Filter } from './components/Filter.jsx'
import {
  getAll,
  create,
  deletePerson,
  update
} from './services/persons/numbers.jsx'
const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Message, setMessage] = useState(null)
  const [textFiltered, setTextFiltered] = useState('')
  useEffect(() => {
    getAll().then((people) => {
      setPeople(people)
    })
  }, [])

  const handleChange = (event, type) => {
    const value = event.target.value
    if (type === 'name') {
      setNewName(value)
    } else if (type === 'number') {
      setNewNumber(value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const isDuplicate = people.some((person) => person.name === newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (isDuplicate) {
      const duplicatePerson = people.find((person) => person.name === newName)
      const id = duplicatePerson._id
      if (
        window.confirm(
          `${newName} is already added to phone book, replace the old number with a new one?`
        )
      ) {
        update(id, newPerson)
          .then((returnedPerson) => {
            setPeople(
              people.map((person) =>
                person._id !== id ? person : returnedPerson
              )
            )
          })
          .catch(() => {
            setMessage('error')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        setMessage(`${newPerson.name} has been updated with ly`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } else {
      create(newPerson)
        .then((people) => {
          setPeople((prevpeople) => prevpeople.concat(people))
          setMessage(`${newPerson.name} has been added ly`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id).then((response) => {
        setPeople(response)
      })
    }
  }
  const handleFilter = (event) => {
    const searchText = event.target.value
    setTextFiltered(searchText)
  }
  useEffect(() => {
    if (!textFiltered) {
      getAll().then((people) => {
        setPeople(people)
      })
    }
    const filteredPeople = people.filter((person) => person.name.toLowerCase().includes(textFiltered.toLowerCase()))
    setPeople(filteredPeople)
  }, [textFiltered])

  return (
    <div>
      <h2>Phone book</h2>
      <h3>Filter</h3>
      <Filter text={textFiltered} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <Notification Message={Message} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {people.map((person) => (
        <div key={person.name}>
          <Number number={person.number} name={person.name} />
          <button onClick={() => handleDelete(person._id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
