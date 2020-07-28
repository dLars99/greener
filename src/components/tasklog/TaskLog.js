/* This component renders the user's logged activities
in summary form and presents the full list to the virtual
DOM.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DatabaseManager from "../../modules/DatabaseManager"
import LogCard from "./LogCard"
import LogSearch from "../search/LogSearch"
import "./TaskLog.css"

const TaskLog = (props) => {

    const [entries, setEntries] = useState([])
    const [searchFilter, setSearchFilter] = useState([])

    const getFullLog = () => {
        // Retrieve all entries for user with activities
        DatabaseManager.getByUser("entries", props.retrieveUser(), "activities")
        .then(entriesFromAPI => setEntries(entriesFromAPI))
    }

    useEffect(() => {
        getFullLog()
    }, [])

    return (
        <>
            <div className="log--top">
                <Link to="/">&lt; Back to Dashboard</Link>
                <button type="button" className="button" onClick={() => props.history.push("/log/new")}>+ New Entry</button>
            </div>
            <div className="log--filters">
                <LogSearch />
            </div>
            <div className="logList">
                {entries.map(entry => <LogCard key={entry.id} entry={entry} {...props} /> )}
            </div>
        </>
    )
}

export default TaskLog