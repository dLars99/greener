/* This module contains all the fetch calls pertaining
to the external WeatherStack API */

// WeatherStack API URL, routed through thingproxy to prevent CORS error
const url = "https://thingproxy.freeboard.io/fetch/https://api.weatherapi.com/v1"
const key = process.env.REACT_APP_WEATHERAPI_KEY

// Fetch calls
export default {
    getPrecipitation(zip, weekAgoDate, todayDate) {
    return fetch(`${url}/history.json?key=${key}&q=${zip}&dt=${weekAgoDate}&end_dt=${todayDate}`)
        .then(response => response.json())
    },
    getForecast(zip, days) {
        return fetch(`${url}/forecast.json?key=${key}&q=${zip}&days=${days}`).then(response => response.json())
    }
}