/* This component displays the upcoming
weather forecast over six days.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import WeatherManager from "../../modules/WeatherManager"
import ForecastCard from "./ForecastCard"
import { ChevronsLeft, PlusCircle } from "react-feather"

const Forecast = (props) => {

    const [weather, setWeather] = useState({})

    const getWeather = () => {
        WeatherManager.getForecast()
    }
    
    // useEffect(() => {
    //     getWeather()
    // }, [])

    return (
        <>
            <section className="forecast">
            <div className="forecast--top">
                <Link to="/" className="forecast--link">
                <ChevronsLeft color="#72A83D" strokeWidth={1} size={20}/>
                Back to Dashboard
                </Link>
                <PlusCircle className="addNew" fill="#3E7C07" color="white" strokeWidth={1.5} size={72} onClick={() => props.history.push("/log/new")} />
            </div>

                <div className="forecast--header">
                    <h3>Weather Forecast</h3>
                </div>
                <div className="forecast--list">
                    <ForecastCard weather={weather} {...props} />
                </div>
            </section>
        </>
    )
}

export default Forecast