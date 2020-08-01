/* This component render the current weather information
to be displayed on the dashboard
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import WeatherManager from "../../modules/WeatherManager"
import { Link } from "react-router-dom"

const CurrentWeather = () => {

    const [weather, setWeather] = useState({})
    
    const getCurrentWeather = () => {
        const userZip = sessionStorage.zip
        WeatherManager.getCurrent(userZip)
        .then(weatherFromAPI => setWeather(weatherFromAPI.current))
    }

    useEffect(() => {
        getCurrentWeather()
    }, [])

    return (
        <>
        {Object.keys(weather).length !== 0
        ? <>
            <h3>Right Now</h3>
            <div className="currentWeather--desc">
                <h4>{weather.weather_descriptions}</h4>
            </div>
            <div className="currentWeather--stats">
                <div className="currentWeather--icon">
                    <img src={`${weather.weather_icons}`} alt={weather.weather_descriptions} />
                </div>
                <div className="currentWeather--temp">
                    <h3>{weather.temperature}&#176;</h3>
                    <p>Feels like {weather.feelslike}&#176;</p>
                </div>
            </div>
            <div className="currentWeather--link">
                <Link to="/forecast">Full forecast &gt;</Link>
            </div>
        </>
        : <p>Loading Current Weather</p>
        }
        </>
    )

}

export default CurrentWeather