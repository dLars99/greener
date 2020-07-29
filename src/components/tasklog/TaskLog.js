/* This component renders the user's logged activities
in summary form and presents the full list to the virtual
DOM.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DatabaseManager from "../../modules/DatabaseManager"
import LogCard from "./LogCard"
import SearchBox from "../search/SearchBox"
import { BuildSearchArray, filterByActivity } from "../search/SearchFilter"
import "./TaskLog.css"

const TaskLog = (props) => {

    const [entries, setEntries] = useState([])
    const [activities, setActivities] = useState([])
    const [filterActivities, setFilterActivities] = useState([])
    const [filteredEntries, setFilteredEntries] = useState([])

    const getFullLog = () => {
        // Retrieve all entries for user with activities
        DatabaseManager.getByUser("entries", props.retrieveUser(), "activities")
        .then(entriesFromAPI => {
            setEntries(entriesFromAPI)
            setFilteredEntries(entriesFromAPI)
        })
    }

    const getActivities = () => {
        // Retrive activities list for filter options
        DatabaseManager.getAll("activities")
        .then(activitiesFromAPI => setActivities(activitiesFromAPI))
    }

    const filterEntries = evt => {
        setFilterActivities(BuildSearchArray(filterActivities, evt))
        setFilteredEntries(filterByActivity(entries, filterActivities))
    }

    useEffect(() => {
        getFullLog()
        getActivities()
    }, [])

    return (
        <>
            <div className="log--top">
                <Link to="/">&lt; Back to Dashboard</Link>
                <button type="button" className="button" onClick={() => props.history.push("/log/new")}>+ New Entry</button>
            </div>
            <div className="log--filters">
                <SearchBox activities={activities} filterEntries={filterEntries} {...props}/>
            </div>
            <div className="logList">
                {filteredEntries.map(entry => <LogCard key={entry.id} entry={entry} {...props} /> )}
            </div>
        </>
    )
}

export default TaskLog