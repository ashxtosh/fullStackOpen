import { useState } from "react"
import SearchFilter from "./components/SearchFilter"

import DisplayNames from "./components/DisplayNames"
import FillForm from "./components/FillForm"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])

  const [newName, setNewName] = useState("")
  const [newNum, setNewNum] = useState("")
  const [filter, setFilter] = useState("")

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const addDetails = (event) => {
    event.preventDefault()
    const nameObj = { name: newName, number: newNum }
    // const duplicate = persons.find(person => person.name === newName)
    // if(duplicate) console.log("duplicate")
    const isDupli = persons.some((person) => person.name === newName)
    if (isDupli) alert(`${newName} is already present in phonebook`)
    else {
      setPersons(persons.concat(nameObj))
      setNewName("")
      setNewNum("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <FillForm addDetails={addDetails} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/>
      <h2>Numbers</h2>
      <DisplayNames persons={persons} filter={filter} />
    </div>
  )
}

export default App
