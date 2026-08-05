import { useState, useEffect} from "react"
import personService from "./services/persons"

import SearchFilter from "./components/SearchFilter"
import DisplayNames from "./components/DisplayNames"
import FillForm from "./components/FillForm"


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")
  const [filter, setFilter] = useState("")

  const hook = () => {
    personService
    .getAll()
    .then(initialList => {
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
      if(!window.confirm(`${newName} already present, replace the old no. with the new one?`)) return;
      personService
      .update(dupli.id, { ...dupli, number: newNum })
      .then(returnedObj => {
        setPersons(persons.map(person => 
          person.id === dupli.id? returnedObj : person
        ))
        setNewName("")
        setNewNum("")
      })

    }
    else {
      console.log("Starting post")
      personService
      .create(nameObj)
      .then(returnedObj => {
        console.log("Processing post")
        setPersons(persons.concat(returnedObj))
        setNewName("")
        setNewNum("")
      })
      console.log("Ending post")
    }
  }

  const removeEntry = (id, name) => {
    if(!window.confirm(`Delete ${name}?`)) return

    personService
    .remove(id)
    .then(() => {
      console.log("Processing delete")
      setPersons(persons.filter(p => p.id !== id))
      console.log("Deleted.")
    })
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <FillForm addDetails={addDetails} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/>
      <h2>Numbers</h2>
      <DisplayNames persons={persons} filter={filter} removeEntry={removeEntry}/>
    </div>
  )
}

export default App
