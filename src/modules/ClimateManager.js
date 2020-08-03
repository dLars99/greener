/* This module contains the url and fetch call pertaining
to the Frostline API to look up USDA Plant Hardiness Zone data */

// Frostline API URL, routed through thingproxy to prevent CORS error
const climateURL = "https://thingproxy.freeboard.io/fetch/http://phzmapi.org"

// Fetch call
export default {

    getClimateZone (zip) {
        return fetch(`${climateURL}/${zip}.json`).then(response => response.json())
    }
    
}

