import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DatabaseManager from "../../modules/DatabaseManager"
import "./TaskLog.css"

const TaskLog = (props) => {

    const [entries, setEntries] = useState([])

    const getFullLog = () => {
        // First, get all entries for the user
        DatabaseManager.getByUser("entries", props.retrieveUser(), "logActivities")
        .then(entriesFromAPI => {
            setEntries(entriesFromAPI)
            // Then, pull the master list of activities
            DatabaseManager.getAll("activities")
            .then(activitiesList => {
                // Now, integrate the two lists, replacing the activity IDs in the entry with activity details
                const entriesWithActivities = entriesFromAPI.map(entry => {
                    return {...entry, logActivities: entry.logActivities.map(uniqueActivity => {
                        return activitiesList.find(activity => uniqueActivity.activityId === activity.id)
                    })}
                })
                console.log(entriesWithActivities)
                setEntries(entriesWithActivities)
            })
        })
    }

    useEffect(() => {
        getFullLog()
    }, [])

    return (
        <>
            <div className="log--top">
                <Link to="/dashboard">&lt; Back to Dashboard</Link>
                <button type="button" className="button" onClick={() => props.history.push("/log/new")}>+ New Entry</button>
            </div>
            <div className="log--filters">
                Search functions go here
            </div>
            <div className="logList">

            </div>
        </>
    )
}

export default TaskLog