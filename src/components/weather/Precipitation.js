/* This component calculates and renders the
amound of water the lawn has received in the past
seven days. It takes into account both the weather
precipitation and manual watering.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import WeatherManager from "../../modules/WeatherManager"
import { Droplet } from "react-feather"

const Precipitation = (props) => {

    const [totalWater, setTotalWater] = useState({rain: 0, added: 0, total: -1})

    const getWeather = () => {

        const userZip = sessionStorage.zip

        const todayUTC = new Date()
        const today = new Date(todayUTC.getTime() + todayUTC.getTimezoneOffset() * 60000)
        // Subtract (7 * 24 * 60 * 60 * 1000 = 604800000) to get last week's date
        const lastWeek = today - 604800000
        const startDate = convertDate(lastWeek)
        const endDate = convertDate(today)
        WeatherManager.getPrecipitation(userZip, startDate, endDate)
        .then(weatherFromAPI => addWater(weatherFromAPI, today, lastWeek))

    }

    // Converts UNIX times from above to yyyy-dd-mm
    const convertDate = (dateNum) => {

        const UTCOffset = new Date(dateNum).getTimezoneOffset()
        // If this app were to ever go international, the next line would need to be refactored for + or - UTC
        const offsetDate = new Date(dateNum - (UTCOffset * 60 * 1000))
        return offsetDate.toISOString().substring(0, 10)

    }

    const addWater = (weatherData, today, lastWeek) => {

        const weatherHistory = weatherData.forecast.forecastday

        // Convert API objects to an iterable array and total precipitation
        const rainfall = weatherHistory.reduce((acc, cur) => acc + cur.day.totalprecip_in, 0)
        // Find all recent log entries which add water and total water amounts
        const recentEntries = props.logEntries.filter(entry => new Date(entry.date).getTime() < today && new Date(entry.date).getTime() > lastWeek )
        const addedWater = parseInt(recentEntries.reduce((acc, cur) => acc + cur.water, 0))

        setTotalWater({
            rain: parseFloat(rainfall.toFixed(2)),
            added: parseFloat(addedWater.toFixed(2)),
            total: parseFloat((rainfall + addedWater).toFixed(2))
        })
        
    }

    useEffect(() => {
        getWeather()
    }, [props.logEntries])

    return (
        <>
            <h3>Past 7 Days</h3>
            <div className="water--total">
                {totalWater.total !== -1
                ?<p>{totalWater.total}"</p>
                : <p className="loading">Loading...</p>
                }
            </div>
            <p>Total water</p>
            {totalWater.total < 1
            ? <div className="water--add">
                {console.log(props.history)}
            <Droplet size={16} onClick={() => props.history.push("/log/new")} /> Add water!
            </div>
        : null}
        </>
    )
}

export default Precipitation