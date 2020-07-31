/* This module contains all the fetch calls pertaining
to the external WeatherStack API */

// WeatherStack API URL
const url = "https://api.weatherstack.com"
const key = process.env.REACT_APP_WEATHERSTACK_KEY

// Fetch calls
export default {
    getCurrent(zip) {
        return fetch(`${url}/current?access_key=${key}&query=${zip}&units=f`).then(response => response.json())
    }
}

