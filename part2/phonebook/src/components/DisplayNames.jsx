const DisplayNames = ({ persons, filter, removeEntry }) => {

  const newPersons = persons.filter((person)=> {
    const currName = person.name.toLowerCase()
    const filterVal = filter.toLowerCase()
    // return currName.startsWith(filterVal)
    return currName.includes(filterVal)
  })

  return newPersons.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={() => removeEntry(person.id, person.name)} >Delete</button>
    </p>
  ))
}

export default DisplayNames