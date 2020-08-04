/* This module contains all the fetch calls pertaining
to the main application database json-server API */

// Database API URL
const url = "http://localhost:8088"

// Fetch calls
export default {

    getAll(table) {
        return fetch(`${url}/${table}`).then(response => response.json())
    },
    getByUser(table, id, include) {
        return fetch(`${url}/${table}?userId=${id}&include=${include}`).then(response => response.json())
    },
    getById(table, itemId, include) {
        return fetch(`${url}/${table}/${itemId}?include=${include}`).then(response => response.json())
    },
    getAndExpand(table, id, expand) {
        return fetch(`${url}/${table}?userId=${id}&expand=${expand}`).then(response => response.json())
    },
    getJoinTable(table, entryId, activityId) {
        return fetch(`${url}/${table}?entryId=${entryId}&activityId=${activityId}`).then(response => response.json())
    },
    addNew(table, newObject) {
        return fetch(`${url}/${table}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(response => response.json())
    },
    deleteObject(table, id) {
        return fetch(`${url}/${table}/${id}`, {
            method: "DELETE"
        })
    },
    updateObject(table, id, updatedObject) {
        return fetch(`${url}/${table}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObject)
        })
    }
} 
