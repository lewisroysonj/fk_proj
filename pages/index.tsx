import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { count } from 'console'
import { useDispatch, useSelector } from 'react-redux'
import { cities, getCountries } from '@/state/countries/saga'
import { actions } from '@/state/countries/reducer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState({} as any)
  const [weatherDetails, setWeatherDetails] = useState({
    weather: {},
    main: {}
  } as any)

  const dispatch = useDispatch()
  const countries = getCountries()
  const getWeatherDetails = (city: any) => {
    axios.get(`https://api.openweathermap.org/data/2.5/group?id=${city.id}&units=metric&appid=6d4c202370ae8d7c76ee8edefc512a4f`).then((res) => {
      console.log(res)
      setWeatherDetails({
        weather: res.data.list[0].weather[0],
        main: res.data.list[0].main,
      })
    })
  }

  useEffect(() => {
    dispatch({
      type: actions.GET_COUNTRIES
    })
  }, [])

  useEffect(() => {
    if (selectedCity.id) {
      getWeatherDetails(selectedCity)
    }
  }, [selectedCity])

  return (
    <>
      <div>
        {countries.map((country: any) => {
          return (
            <button onClick={() => setSelectedCountry(country)} key={country}>{country}</button>
          )
        })}
      </div>
      <div>
        {
          selectedCountry && (
            <>
              <h2>Cities in the selected country</h2>
              {cities.filter((city) => city.country === selectedCountry).map(city => {
                return (
                  <button onClick={() => {
                    setSelectedCity(city)
                  }}>{city.name}</button>
                )
              })}
              {
                selectedCity.id && (
                  <div>
                    <h3>City Details</h3>
                    <ul>
                      <li>City Name: <span>{selectedCity.name}</span></li>
                      <li>City Location: <span>{selectedCity.coord?.lat} : {selectedCity.coord?.lon}</span></li>
                      <li>Country: <span>{selectedCity.country}</span></li>
                      <li>
                        Weather Details:
                        <div>
                          <p>Weather: {weatherDetails?.weather.main}</p>
                          <p>Description: {weatherDetails?.weather.description}</p>
                        </div>
                      </li>
                      <li>
                        Climate Conditions:
                        <div>
                          <p>Temperature: {weatherDetails?.main.temp || '-'} C</p>
                          <p>Description: {weatherDetails?.main.feels_like || '-'} C</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </>
  )
}
