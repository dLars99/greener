/* This component displays the upcoming
weather forecast over six days.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import WeatherManager from "../../modules/WeatherManager"

const Forecast = () => {

    const [weather, setWeather] = useState({})

    const getWeather = () => {
        WeatherManager.getForecast()
    }
    
    useEffect(() => {
        getWeather()
    }, [])
}