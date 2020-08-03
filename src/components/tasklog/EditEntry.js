/* This component allows the user to edit
an individual entry from the log 
Parent: LogCard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import { Validate } from "../../modules/Validate"
import { XCircle } from "react-feather"
import "./NewTask.css"

const EditEntry = props => {

    const [entry, setEntry] = useState({})
    const [activities, setActivities] = useState([])
    const [newActivities, setNewActivities] = useState([])
    const [mow, setMow] = useState(false)
    const [water, setWater] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const handleActivityChange = evt => {
        const updatedState = {...entry}
        // Toggle additional fields for "mow"
        if (evt.target.value === "1") {
            setMow(!mow)
            updatedState.length=""
            updatedState.direction=""
        }
        // Toggle additional fields for "water"
        if (evt.target.value === "3") {
            setWater(!water)
            updatedState.amount=""
        }
        const checkedActivity = evt.target.value
        const activityList = newActivities
        if (evt.target.checked) {
            // If the box was checked, add activity ID to the array in state
            activityList.push(parseInt(checkedActivity))
        } else {
            // If the box was unchecked, remove the activity ID from the array in state
            const index = activityList.indexOf(parseInt(checkedActivity))
            if (index > -1) {
                activityList.splice(index, 1)
            }
        }
        setNewActivities(activityList)
        setEntry(updatedState)
    }

    const handleFieldChange = evt => {
        const updatedState = {...entry}
        updatedState[evt.target.name] = evt.target.value
        setEntry(updatedState)
    }

    useEffect(() => {
        // First, retrieve the relevant entry
        DatabaseManager.getById("entries", props.match.params.entryId, "activities")
        .then(entryFromAPI => {
            // Get array of IDs for the edited entry
            const currentActivityIds = entryFromAPI.activities.map(activity => activity.id)
            // Check for "Mow"
            if (currentActivityIds.includes(1)) {setMow(true)}
            // Check for "Water"
            if (currentActivityIds.includes(3)) {setWater(true)}
            setNewActivities(currentActivityIds)
            setEntry(entryFromAPI)
            // Then, pull the master list of activities
            DatabaseManager.getAll("activities")
            .then(activitiesList => {
                setActivities(activitiesList)
                setIsLoading(false)})
        })
    }, [props.match.params.entryId])
    
    const submitEditedEvent = evt => {
        evt.preventDefault()
        setIsLoading(true)
        // Construct and PUT the edited object
        const newEntry = {
            id: entry.id,
            userId: entry.userId,
            date: entry.date,
            length: entry.length,
            direction: entry.direction,
            water: parseInt(entry.water),
            notes: entry.notes
        }
        const errorCheck = Validate(newEntry, newActivities)
        if (errorCheck !== "") {
            alert(errorCheck)
            setIsLoading(false)
        } else {
            DatabaseManager.updateObject("entries", entry.id, newEntry)
            .then(savedEntry => {
                // Find the differences between the old entry's activities and the updated entry's activities
                // By default, if both sets contain the same id, no change is made to that join table
                const entriesToAdd = newActivities.filter(item => !entry.activities.some(activity => activity.id === item))
                const entriesToDelete = entry.activities.filter(item => !newActivities.includes(item.id))
                let promisedLogActivities = []
                entriesToAdd.forEach(activity => {
                    // If the activity did not exist on the old entry, create a new join table
                    const newLogActivity = {
                        entryId: entry.id,
                        activityId: parseInt(activity)
                    }
                    promisedLogActivities.push(DatabaseManager.addNew("entries_activities", newLogActivity)) 
                })
                entriesToDelete.forEach(activity => {
                    // If the activity was present before but not on the updated entry, delete its join table
                    promisedLogActivities.push(DatabaseManager.getJoinTable("entries_activities", entry.id, activity.id)
                    .then(joinTables => {
                        joinTables.forEach(joinTable => {
                            console.log(joinTable)
                            DatabaseManager.deleteObject("entries_activities", joinTable.id)
                        })
                    }))
                })
                Promise.all(promisedLogActivities)
                .then(() => props.history.push("/log"))
            })
        }
    }

    return (
        <section className="form">

        <XCircle className="close" color="#72A83D" strokeWidth={1} size={24} onClick={() => {props.history.goBack()}} />

        <form>
            <div className="form--header">
                <h3>Edit Log Entry</h3>
            </div>

            <fieldset className="form--section">
                <h4>Activity</h4>
                <p>Check all that apply</p>
                {/* Populate activities list from database, checking activities that are part of the current entry */}
                <div className="activity--checkboxes">
                    {activities.map(activity => {
                        return <span key={activity.id}>
                            <input type="checkbox" id="activity" 
                            name={activity.name} value={activity.id} checked={newActivities.includes(activity.id)}
                            onChange={handleActivityChange} />
                            <label htmlFor={activity.name}>{activity.name}</label>
                        </span>
                    })}
                </div>
                <div className="form--date"> 
                    <input type="date" id="date" name="date" onChange={handleFieldChange} defaultValue={entry.date} />
                    <label htmlFor="date">Date Completed</label>
                </div>
            </fieldset>
            {/* These fields only appear if the user checks the "mow" activity */}
            {mow &&
                <fieldset className="form--section" className="mowProperties">
                    <div className="mow--length">
                        <label htmlFor="length">Grass length before mowing</label>
                        <select name="length" id="length" onChange={handleFieldChange} value={entry.length}>
                            <option defaultValue=""></option>
                            <option value="2.5">2.5"</option>
                            <option value="3">3"</option>
                            <option value="3.5">3.5"</option>
                            <option value="4">4"</option>
                            <option value="4.5">4.5"</option>
                            <option value="5">5"</option>
                            <option value="5.5">5.5"</option>
                            <option value="6">6"</option>
                            <option value="7">&gt; 6"</option>
                        </select>
                    </div>

                    <div className="form--mowDirection">
                            <div className="directions--mainRow">
                                <div className="form--directionRadio">
                                    <label htmlFor="horizontal">
                                        <input type="radio" id="horizontal" name="direction" value="horizontal" checked={entry.direction === "horizontal"} onChange={handleFieldChange}/>
                                        Horizontal <img src={require("../../images/horizontal.jpg")} alt="Horizontal mow" ></img>
                                    </label>
                                </div>
                                <div className="form--directionRadio">
                                    <label htmlFor="vertical">
                                        <input type="radio" id="vertical" name="direction" value="vertical" checked={entry.direction === "vertical"} onChange={handleFieldChange} />
                                        Vertical <img src={require("../../images/vertical.jpg")} alt="Vertical mow" ></img> 
                                     </label>
                                </div>
                                <div className="form--directionRadio">
                                    <label htmlFor="diagonal">
                                        <input type="radio" id="diagonal" name="direction" value="diagonal" checked={entry.direction === "diagonal"} onChange={handleFieldChange} />
                                        Diagonal
                                        <img src={require("../../images/diagonal.jpg")} alt="Diagonal mow" ></img>
                                    </label>
                                </div>
                            </div>
                            <div className="form--radioOther">
                                <input type="radio" id="other" name="direction" value="other" checked={entry.direction === "other"} onChange={handleFieldChange} />
                                <label htmlFor="other">Other</label>
                            </div>
                        </div>
                </fieldset>
            }
            {/* These fields only appear if the user checks the "water" activity */}
            {water &&
                <fieldset className="form--section" className="waterProperties hidden">
                    <div className="water--amount">
                        <label htmlFor="water">Amount of water added</label>
                        <select name="water" id="water" onChange={handleFieldChange} value={entry.water}>
                            <option value=""></option>
                            <option value=".25">.25"</option>
                            <option value=".5">.5"</option>
                            <option value=".75">.75"</option>
                            <option value="1">1.0"</option>
                            <option value="1.25">1.25"</option>
                            <option value="1.5">1.5"</option>
                            <option value="1.75">1.75"</option>
                            <option value="2">2"</option>
                            <option value="2.5">&gt; 2"</option>
                        </select>
                    </div>
                </fieldset>
            }
            {/* The remaining fields are default */}
            <fieldset className="form--section">
                <div className="form--notes">
                    <label htmlFor="notes">Notes</label>
                    <textarea id="notes" name="notes" rows="4" cols="40" onChange={handleFieldChange} value={entry.notes} />
                </div>
            </fieldset>
            <button type="button" className="form--button" disabled={isLoading} onClick={submitEditedEvent}>Update Entry</button>
        </form>

    </section>
    )
}

export default EditEntry