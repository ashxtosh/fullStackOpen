const FillForm = ({
  addDetails,
  newName,
  newNum,
  handleNameChange,
  handleNumChange,
}) => {
  return (
    <form onSubmit={addDetails}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={handleNumChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default FillForm
