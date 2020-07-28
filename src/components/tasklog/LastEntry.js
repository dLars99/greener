/* This component will render the most
log entry on the dashboard 
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import LogCard from "./LogCard"

const LastEntry = (props) => {

    const [lastEntry, setLastEntry] = useState([])

    const getLastEntry = () => {
        // Get all the entries, then set state to the most recent entry
        DatabaseManager.getByUser("entries", sessionStorage.getItem("credentials"), "activities")
        .then(entriesFromAPI => setLastEntry(entriesFromAPI[entriesFromAPI.length - 1]))
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

