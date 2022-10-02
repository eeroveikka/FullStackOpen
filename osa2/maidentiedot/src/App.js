import axios from "axios";
import { useState, useEffect } from 'react'

const Country = (props) => {
  const country = props.country
  const [weatherInfo, setWeatherInfo] = useState({main: {temp: 0}, wind: {speed: 0}})
  const [weatherIcon, setWeatherIcon] = useState("")
  const api_key = process.env.REACT_APP_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeatherInfo(response.data)
        setWeatherIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      })
  }, [])

  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((value) => 
          <li key={value}>{value}</li>)
        }
      </ul>
      <img src={country.flags.png} alt={""}/>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weatherInfo.main.temp} Celsius</p>
      <img src={weatherIcon} alt={""}/>
      <p>wind {weatherInfo.wind.speed} m/s</p>
    </div>
  )
}

const ShowCountryButton = (props) => {
  return(
    <button onClick={props.handleClick}>
      show
    </button>
  )
}

const CountryControl = (props) => {

  const getFiltered = (countries, filter) => {
    return(
      countries.filter((country) => country.name.common.toUpperCase().includes(filter.toUpperCase()))
    )
  }

  const countries = getFiltered(props.countries, props.filter)

  if (props.showCountry !== -1) {
    return(
      <div>
        <Country country={countries[props.showCountry]}/>
      </div>
    )
  } else {
    if (countries.length === 1) {
      return(
        <div>
          <Country country={countries[0]}/>
        </div>
      )
    } else if (countries.length === 0) {
      return(
        <div>
          No countries, expand filter
        </div>
      )
    } else if (countries.length > 1 && countries.length <= 10) {
      return(
        <div>
          {countries.map((country, index) => 
            <p key={country.name.common}>{country.name.common}
              <ShowCountryButton handleClick={() => props.handleClick(index)}/>
            </p>
          )}
        </div>
      )
    }
  }

  return(
    <div>
      Too many countries, specify another filter
    </div>
  )

}


const App = () => {
  const [filter, setFilter] = useState('')
  const [showCountry, setShowCountry] = useState(-1)
  const [countryInfo, setCountryInfo] = useState([])
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowCountry(-1)
  }

  const handleClick = index => {
    setShowCountry(index)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryInfo(response.data)
      })
  }, [])

  return(
    <div>
      <form>
        <div>
          filter countries with
          <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <CountryControl
        countries={countryInfo}
        filter={filter}
        showCountry={showCountry}
        handleClick={handleClick}
      />
    </div>
  )
}

export default App;
