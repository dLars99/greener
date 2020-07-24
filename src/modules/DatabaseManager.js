/* This module contains all the fetch calls pertaining
to the main application database json-server API */

// Database API URL
const url = "http://localhost:8088"

// Fetch calls
export default {

    getAll(table) {
        return fetch(`${url}/${table}`).then(response => response.json())
    },
    getByUser(table, id, embed) {
        return fetch(`${url}/${table}?userId=${id}&_embed=${embed}`).then(response => response.json())
    }
    
} 
