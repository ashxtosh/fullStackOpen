import { useState, useEffect } from "react"
import axios from "axios"
const api_key = import.meta.env.VITE_API_KEY
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"

const DisplaySearch = ({ search, onChange }) => {
  return (
    <p>
      find countries: <input value={search} onChange={onChange} />
    </p>
  )
}

const DisplayCountry = ({ details }) => {
  if (!details) return <p>Loading details...</p>
  return (
    <>
      <h1>{details.name.common}</h1>
      <p>
        Capital {details.capital?.join(", ")} <br />
        Area {details.area}
      </p>
      {details.languages && (
        <>
          <h2>Languages</h2>
          <ul>
            {Object.values(details.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
        </>
      )}
      <img src={details.flags.png} alt={`flag of ${details.name.common}`} />

      <Weather latlng={details.capitalInfo?.latlng} capital={details.capital?.[0]}/>
    </>
  )
}

const DisplayCountries = ({ filteredCountries, details, setSelected }) => {
  if (filteredCountries.length > 10)
    return <p>Too many matches, specify more</p>

  if (filteredCountries.length === 0) return <p>No results.</p>

  if (details) return <DisplayCountry details={details} />

  return filteredCountries.map((c) => (
    <p key={c}>
      {c} <button onClick={() => setSelected(c)}>show</button>
    </p>
  ))
}

const Weather = ({ latlng, capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!latlng || latlng.length < 2) return

    const [lat, lon] = latlng
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`,
      )
      .then((response) => setWeather(response.data))
  }, [latlng])

  if (!weather) return <p>Loading weather...</p>

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  )
}

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState(null)
  const [details, setDetails] = useState(null)
  const [selected, setSelected] = useState(null)

  const filteredCountries = countries
    ? countries.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase()),
      )
    : []

  const match = filteredCountries.length === 1 ? filteredCountries[0] : null

  const target = selected || match

  const shownDetails = details && details.name.common === target ? details : null

  const hook1 = () => {
    axios.get(`${baseUrl}/all`).then((response) => {
      const names = response.data.map((c) => c.name.common)

      setCountries(names)
    })
  }
  useEffect(hook1, [])

  const hook2 = () => {
    if (target) {
      axios.get(`${baseUrl}/name/${target}`).then((response) => {
        setDetails(response.data)
      })
    }
  }

  useEffect(hook2, [target])

  if (!countries) return <p>Site loading...</p>

  const handleOnChange = (event) => {
    setSelected(null)
    setSearch(event.target.value)
  }

  console.log("countries:", { filteredCountries })
  return (
    <div>
      <DisplaySearch search={search} onChange={handleOnChange} />

      <DisplayCountries
        filteredCountries={filteredCountries}
        details={shownDetails}
        setSelected={setSelected}
      />
    </div>
  )
}

export default App
