import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';
import humidity from '../images/humidity.png';
import pressure from '../images/pressure.png';
import wind from '../images/wind.png'

const api = '2526ba19602567ea3cd291343a428ac0'

const Weather = () => {
    const [search, setSearch] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const [exactName, setExactName] = useState('')

    const getWeather = async (e) => {
        if (e.key === "Enter" && search.length > 0) {
            try {
                // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${api}`)
                // const data = await response.json()

                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${api}`)
                const data = await response.data

                setWeatherData(data)

                setExactName(search.replace(/(^\w|\s\w)/g, m => m.toUpperCase()))
                // console.log(data, exactName)

            } catch (error) {
                setWeatherData({})
                // console.log(error)
            }
        }
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date()

    return (
        <div className="weather-div">
            <h1>Weather Report</h1>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={getWeather} />
            {
                weatherData && weatherData.name === exactName ?
                    <div className="weather-detail">
                        <h2>{weatherData.name},  <span style={{ fontSize: '20px' }}>{weatherData.sys.country}</span></h2>
                        <h3>{days[date.getDay()]} {date.getDate()}, {months[date.getMonth()]} {date.getUTCFullYear()}</h3>
                        <h1>{weatherData.main.temp} &deg;C </h1>

                        <div className="weather-main-icon">

                            <div className="weather-info">
                                <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="" />
                                <h3>{weatherData.weather[0].description}</h3>
                                <span>Temperature</span>
                            </div>

                            <div className="weather-info">
                                <img src={pressure} alt="error" className="icon-svg" />
                                <h3>{weatherData.main.pressure} Pa</h3>
                                <span>Pressure</span>
                            </div>

                            <div className="weather-info">
                                <img src={humidity} alt="error" className="icon-svg" />
                                <h3>{weatherData.main.humidity} rh</h3>
                                <span>Humidity</span>
                            </div>

                            <div className="weather-info">
                                <img src={wind} alt="error" className="icon-svg" />
                                <h3>{weatherData.wind.speed} mph</h3>
                                <span>Wind Speed</span>
                            </div>
                        </div>


                    </div> : null

            }
        </div>
    );
};

export default Weather;