/* This component renders the user's logged activities
in summary form and presents the full list to the virtual
DOM.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DatabaseManager from "../../modules/DatabaseManager"
import LogCard from "./LogCard"
import SearchBox from "../search/SearchBox"
import { BuildSearchArray, performFilter } from "../search/SearchFilter"
import "./TaskLog.css"

const TaskLog = (props) => {

    const [entries, setEntries] = useState([])
    const [activities, setActivities] = useState([])
    const [filterActivities, setFilterActivities] = useState([])
    const [searchDate, setSearchDate] = useState("")
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
        .then(activitiesFromAPI => {
            // Add checkbox boolean to object for search filters
            const activitiesWithCheck = activitiesFromAPI.map(activity => {
                return {...activity, checked: false}
            })
            setActivities(activitiesWithCheck)})
    }

    const filterEntries = evt => {

        if (evt.target.id === "activity") {
            const stateToUpdate = [...activities]
            const activityToUpdate = stateToUpdate.indexOf(stateToUpdate.find(activity => activity.id === parseInt(evt.target.value)))
            stateToUpdate[activityToUpdate].checked = !stateToUpdate[activityToUpdate].checked
            setActivities(stateToUpdate)
            setFilterActivities(BuildSearchArray([...filterActivities], evt))

        } else {
            // Date field has been altered
            setSearchDate(evt.target.value)
        }
        
    }

    const clearSearch = evt => {
        setSearchDate("")
        setFilterActivities([])
        let updateActivities = [...activities]
        updateActivities = updateActivities.map(activity => {
            return {...activity, checked: false}
        })
        setActivities(updateActivities)
        setFilteredEntries(performFilter(entries, filterActivities, searchDate))
    }

    useEffect(() => {
        getFullLog()
        getActivities()
    }, [])

    useEffect(() => {
        setFilteredEntries(performFilter(entries, filterActivities, searchDate))
    }, [searchDate, filterActivities])

    return (
        <>
            <div className="log--top">
                <Link to="/">&lt; Back to Dashboard</Link>
                <button type="button" className="button" onClick={() => props.history.push("/log/new")}>+ New Entry</button>
            </div>
            <div className="log--filters">
                <SearchBox activities={activities} filterEntries={filterEntries} clearSearch={clearSearch} {...props}/>
            </div>
            <div className="logList">
                {filteredEntries.map(entry => <LogCard key={entry.id} entry={entry} {...props} /> )}
            </div>
        </>
    )
}

export default TaskLog