import { useState, useEffect } from "react"
import personService from "./services/persons"

import SearchFilter from "./components/SearchFilter"
import DisplayNames from "./components/DisplayNames"
import FillForm from "./components/FillForm"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")
  const [filter, setFilter] = useState("")
  const [notif, setNotif] = useState(null)

  const hook = () => {
    personService.getAll().then((initialList) => {
      setPersons(initialList)
    })
  }

  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const addDetails = (event) => {
    event.preventDefault()
    const nameObj = { name: newName, number: newNum }
    const dupli = persons.find((person) => person.name === newName)

    if (dupli) {
      const message = `${newName} already present, replace the old no. with the new one?`
      if (!window.confirm(message)) return

      personService
        .update(dupli.id, { ...dupli, number: newNum })
        .then((returnedObj) => {
          setPersons(
            persons.map((person) =>
              person.id === dupli.id ? returnedObj : person,
            ),
          )
          setNewName("")
          setNewNum("")
          setNotif({ text: `Updated ${newName}'s number`, type: "green" })
          setTimeout(() => {
            setNotif(null)
          }, 5000)
        })
        .catch(() => {
          const message = `${newName} was already deleted from the server so couldn't be updated`
          setNotif({ text: message, type: "red" })
          setTimeout(() => {
            setNotif(null)
          }, 5000)
          
          setPersons(persons.filter((p) => p.id !== dupli.id))
          setNewName("")
          setNewNum("")
        })
    } else {
      personService.create(nameObj).then((returnedObj) => {
        setPersons(persons.concat(returnedObj))
        setNewName("")
        setNewNum("")

        setNotif({ text: `Added ${newName} & their number`, type: "green" })
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
    }
  }

  const removeEntry = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id))
        const message = `${name} has been deleted from the server`
        setNotif({ text: message, type: "red" })
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
      .catch(() => {
        setPersons(persons.filter((p) => p.id !== id))
        const message = `${name} was already deleted from the server`
        setNotif({ text: message, type: "red" })
        setTimeout(() => {
          setNotif(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif} />
      <SearchFilter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <FillForm
        addDetails={addDetails}
        newName={newName}
        newNum={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
      />
      <h2>Numbers</h2>
      <DisplayNames
        persons={persons}
        filter={filter}
        removeEntry={removeEntry}
      />
    </div>
  )
}

export default App
