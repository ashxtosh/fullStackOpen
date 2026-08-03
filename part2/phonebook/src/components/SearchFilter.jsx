const SearchFilter = ({ filter, setFilter }) => {
  return (
    <>
      Filter shown with:{" "}
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </>
  )
}

export default SearchFilter
