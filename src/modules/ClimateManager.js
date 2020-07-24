/* This module contains the url and fetch call pertaining
to the Frostline API to look up USDA Plant Hardiness Zone data */

// Frostline API URL
const climateURL = "http://phzmapi.org"

// Fetch call
const getClimateZone = (zip) => {
    return fetch(`${url}/${zip}.json`).then(response => response.json)
}

