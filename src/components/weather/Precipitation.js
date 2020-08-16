/* This component calculates and renders the
amound of water the lawn has received in the past
seven days. It takes into account both the weather
precipitation and manual watering.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import WeatherManager from "../../modules/WeatherManager"
import { convertDate } from "../../modules/Helpers"
import { Droplet } from "react-feather"
import Gauge from "./Gauge"

const Precipitation = (props) => {

    const [totalWater, setTotalWater] = useState(-1)
    const [waterPercent, setWaterPercent] = useState(0)

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

    const addWater = (weatherData, today, lastWeek) => {

        const weatherHistory = weatherData.forecast.forecastday
        // Convert API objects to an iterable array and total precipitation
        const rainfall = weatherHistory.reduce((acc, cur) => acc + cur.day.totalprecip_in, 0)
  
        // Find all recent log entries which add water and total water amounts
        const recentEntries = props.logEntries.filter(entry => new Date(entry.date).getTime() < today && new Date(entry.date).getTime() > lastWeek )
        const addedWater = recentEntries.reduce((acc, cur) => acc + cur.water, 0)

        const totalWater = parseFloat((rainfall + addedWater).toFixed(2))
        setTotalWater(totalWater)

        const percent = (totalWater / 1 >= 1.0 ) ? 100 : (totalWater / 1.0) * 100
        setWaterPercent(percent)
        
    }

    useEffect(() => {
        getWeather()
        // eslint-disable-next-line
    }, [props.logEntries])

    return (
        <>
            <h3>Past 7 Days</h3>
            <div className="water--total">
                {totalWater !== -1
                ?   <Gauge
                    style={{ margin: '0 auto 0 auto' }}
                    radius={50}
                    value={waterPercent}
                    displayValue={totalWater}
                    />
                : <p className="loading">Loading...</p>
                }
            </div>
            <p>Total water</p>
            {totalWater < 1
            ?   <div className="water--add">
                    <Droplet size={16} color="#126C64" fill="#126C64" onClick={() => props.history.push("/log/new")} /> Add water!
                </div>
            : null}
        </>
    )
}

export default Precipitation