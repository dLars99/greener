/* This component render the current weather information
to be displayed on the dashboard
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import WeatherManager from "../../modules/WeatherManager"
import { Link } from "react-router-dom"

const CurrentWeather = (props) => {

    const [weather, setWeather] = useState({})
    
    const getCurrentWeather = () => {
        WeatherManager.getForecast(sessionStorage.zip, 1)
        .then(weatherFromAPI => {
            setWeather(weatherFromAPI.current)
            sendAlerts(weatherFromAPI)
        })
    }

    const sendAlerts = (weatherData) => {
        // Alert for high heat
        console.log(weatherData)
        if (weatherData.forecast.forecastday[0].day.maxtemp_f > 90 || weatherData.current.feelslike_f > 90) {
            props.addAlert({type: "heat", condition: "red"})
        }
        
        // Warning/alert for UV
        if (weatherData.forecast.forecastday[0].day.uv >= 3 && weatherData.forecast.forecastday[0].day.uv < 6) {
            props.addAlert({type: "uv", condition: "yellow"})
        } else if (weatherData.forecast.forecastday[0].day.uv > 6) {
            props.addAlert({type: "uv", condition: "red"})
        }
        // Alert for current weather conditions
        props.addAlert({type: weatherData.current.condition.code, condition: "red"})

        // Warning for predicted weather
        props.addAlert({type: weatherData.forecast.forecastday[0].day.condition.code, condition: "yellow"})

    }

    useEffect(() => {
        getCurrentWeather()
    }, [])

    return (
        <>
        {Object.keys(weather).length !== 0
        ? <>
            <h3>Right Now</h3>
            <div className="currentWeather--stats">
                <div className="currentWeather--desc">
                    <div className="currentWeather--icon">
                        <img src={`${weather.condition.icon}`} alt={weather.condition.text} />
                    </div>
                    <h4>{weather.condition.text}</h4>
                </div>
                <div className="currentWeather--temp">
                    <h3>{parseInt(weather.temp_f)}&#176;</h3>
                    <p>Feels like {parseInt(weather.feelslike_f)}&#176;</p>
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