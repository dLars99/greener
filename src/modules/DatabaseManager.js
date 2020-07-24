/* This module contains all the fetch calls pertaining
to the main application database json-server API */

// Database API URL
const url = "http://localhost:8088"

// Fetch calls
const getAll = (table) => {
    return fetch(`${url}/${table}`).then(response => response.json())
}

