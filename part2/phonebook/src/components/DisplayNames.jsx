const DisplayNames = ({ persons, filter }) => {

  const newPersons = persons.filter((person)=> {
    const currName = person.name.toLowerCase()
    const filterVal = filter.toLowerCase()
    // return currName.startsWith(filterVal)
    return currName.includes(filterVal)
  })

  return newPersons.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  ))
}

export default DisplayNames