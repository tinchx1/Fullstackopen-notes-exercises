import React, { useState, useEffect } from 'react'
import { PersonForm } from './components/PersonForm.jsx'
import { Filter } from './components/Filter.jsx'
import {
  getAll,
  create,
  deletePerson,
  update
} from './services/persons/numbers.jsx'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster, toast } from 'sonner'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'

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

  useEffect(() => {
    if (Message) {
      if (Message.includes('error') || Message.includes('failed')) {
        toast.error(Message)
      } else {
        toast(Message)
        console.log(Message)
      }
    }
  }, [Message])
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='p-10 lg:grid grid-cols-[600px,1fr]'>
        <aside>
          <nav className='flex items-center justify-center pt-10 pb-3'>
            <h2 className='text-5xl pr-4'>Phone Book</h2>
            <ModeToggle />
          </nav>
          <Filter text={textFiltered} handleFilter={handleFilter} />
          <h3 className='text-2xl'>Add a New Contact</h3>
          <PersonForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            newName={newName}
            newNumber={newNumber}
          />
        </aside>
        <main className='mt-15 mx-9'>
          <h2 className='text-center text-3xl mt-6'>Numbers</h2>
          <div>
            <header>
              <ul className='flex items-center justify-between border-y-4 border-y-s py-2 my-4 p-4'>
                <li>Name</li>
                <li>Number</li>
                <li>Delete</li>
              </ul>
            </header>
            {people.map((person) => (
              <div className='flex justify-between items-center p-3' key={person.name}>
                <p>{person.name}</p>
                <p>{person.number}</p>
                <Button onClick={() => handleDelete(person._id, person.name)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </main>

      </div>
      <Toaster position='bottom-center' />

    </ThemeProvider>
  )
}

export default App
