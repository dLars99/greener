/* This component calculates and renders the
amound of water the lawn has received in the past
seven days. It takes into account both the weather
precipitation and manual watering.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import WeatherManager from "../../modules/WeatherManager"
import DatabaseManager from "../../modules/DatabaseManager"

const Precipitation = (props) => {

    const [weather, setWeather] = useState({})
    const [totalWater, setTotalWater] = useState(0)

    const getWeather = () => {
        const userZip = sessionStorage.zip
        const today = Date.now()
        // Subtract (7 * 24 * 60 * 60 * 1000 = 604800000) to get 7 days ago
        const lastWeek = today - 604800000
        const startDate = convertDate(lastWeek)
        const endDate = convertDate(today)
        WeatherManager.getPrecipitation(userZip, startDate, endDate)
        .then(weatherFromAPI => setWeather(weatherFromAPI))
    }

    // Converts UNIX times from above to yyyy-dd-mm
    const convertDate = (dateNum) => {
        const UTCOffset = new Date(dateNum).getTimezoneOffset()
        // If this app were to ever go international, the next line would need to be refactored
        const offsetDate = new Date(dateNum - (UTCOffset * 60 * 1000))
        return offsetDate.toISOString().substring(0, 10)
    }

    useEffect(() => {
        getWeather()
    }, [])

    return (
        <p>Precipitation</p>
    )
}

export default Precipitation