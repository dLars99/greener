/* This module contains all the fetch calls pertaining
to the external WeatherStack API */

// WeatherStack API URL
const url = "https://api.weatherstack.com"
const key = process.env.REACT_APP_WEATHERSTACK_KEY

// Fetch calls
export default {
    getCurrent(zip) {
        return fetch(`${url}/current?access_key=${key}&query=${zip}&units=f`).then(response => response.json())
    },
    getPrecipitation(zip, weekAgoDate, todayDate) {
        return fetch(`${url}/historical?access_key=${key}&query=${zip}&historical_date_start=${weekAgoDate}&historical_date_end=${todayDate}&units=f&hourly=1&interval=24`)
        .then(response => response.json())
    },
    getForecast(zip) {
        return fetch(`${url}/forecast?access_key=${key}&query=${zip}$forecast_days=5`.then(response => response.json()))
    }
}

