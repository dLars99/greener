/* This component will render the most
log entry on the dashboard 
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import LogCard from "./LogCard"

const LastEntry = (props) => {

    const [lastEntry, setLastEntry] = useState([])

    const getLastEntry = () => {
        // First, get all entries for the user
        DatabaseManager.getByUser("entries", sessionStorage.getItem("credentials"))
        .then(entriesFromAPI => {
            // Then, pull the master list of activities
            DatabaseManager.getAll("activities")
            .then(activitiesList => {
                // Now, integrate the two lists, replacing the activity IDs in the entry with activity details
                const entriesWithActivities = entriesFromAPI.map(entry => {
                    return {...entry, logActivities: entry.logActivities.map(uniqueActivity => {
                        return activitiesList.find(activity => uniqueActivity === activity.id)
                    })}
                })
                setLastEntry(entriesWithActivities[entriesWithActivities.length - 1])
            })
        })
    }

    useEffect(() => {
        getLastEntry()
    }, [])

    return (
        <>
        <h3>Latest Log Entry</h3>
        <LogCard entry={lastEntry} {...props} />
        </>
    )
}

export default LastEntry

