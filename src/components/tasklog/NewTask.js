/* This component allows the user to create
a new entry for the log and save the entry
to the database */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"

const NewTask = (props) => {

    const [entry, setEntry] = useState({ date: "", length: "", direction: "", amount: "", notes: "" })
    const [newActivities, setNewActivities] = useState([])
    const [activities, setActivities] = useState([])
    const [mow, setMow] = useState(false)
    const [water, setWater] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleActivityChange = evt => {
        // Toggle additional fields for "mow"
        if (evt.target.value === "1") {
            setMow(!mow)
            entry.length=""
            entry.direction=""
        }
        // Toggle additional fields for "water"
        if (evt.target.value === "3") {
            setWater(!water)
            entry.amount=""
        }
        const checkedActivity = evt.target.value
        const activityList = newActivities
        if (evt.target.checked) {
            // If the box was checked, add activity to the array in state
            activityList.push(checkedActivity)
        } else {
            // If the box was unchecked, remove the activity from the array in state
            const index = activityList.indexOf(checkedActivity)
            if (index > -1) {
                activityList.splice(index, 1)
            }
        }
        setNewActivities(activityList)
    }

    const handleFieldChange = evt => {
        const updatedState = {...entry}
        updatedState[evt.target.name] = evt.target.value
        setEntry(updatedState)
    }

    const submitNewEvent = evt => {
        evt.preventDefault()
        setIsLoading(true)
        // Retrieve current user ID from session storage
        const currentUser = parseInt(sessionStorage.getItem("credentials"))
        // Construct and POST the main entry object
        const newEntry = {
            userId: currentUser,
            date: entry.date,
            length: entry.length,
            direction: entry.direction,
            amount: entry.amount,
            notes: entry.notes
        }
        DatabaseManager.addNew("entries", newEntry)
        .then(savedEntry => {
            //  Iterate through the entry's activities and post each to its own join table
            let promisedLogActivities = []
            newActivities.forEach(activity => {
                const newLogActivity = {
                    entryId: savedEntry.id,
                    activityId: parseInt(activity)
                }
                promisedLogActivities.push(DatabaseManager.addNew("logActivities", newLogActivity))
            })
            Promise.all(promisedLogActivities)
            .then(() => props.history.push("/log"))
        })
    }

    // Populate list of activities
    useEffect(() => {
        DatabaseManager.getAll("activities")
        .then(activitiesFromAPI => setActivities(activitiesFromAPI))
    }, [])

    return (
        <section>

            <div onClick={() => {props.history.goBack()}}>
                X
            </div>

            <form>
                <fieldset>
                    <h3>Activity</h3>
                    <p>Check all that apply</p>
                    {/* Populate activities list from database */}
                    {activities.map(activity => {
                        return <span key={activity.id}>
                            <input type="checkbox" id="activity" 
                            name={activity.name} value={activity.id}
                            onChange={handleActivityChange} />
                            <label htmlFor={activity.name}>{activity.name}</label>
                        </span>
                    })}
                    <input type="date" id="date" name="date" onChange={handleFieldChange}/>
                    <label htmlFor="date">Date Completed</label>
                </fieldset>
                {/* These fields only appear if the user checks the "mow" activity */}
                {mow &&
                    <fieldset className="mowProperties hidden">
                        <label htmlFor="length">Grass length before mowing</label>
                        <select name="length" id="length" name="length" onChange={handleFieldChange}>
                            <option defaultValue=""></option>
                            <option value="2.5">2.5"</option>
                            <option value="3">3"</option>
                            <option value="3.5">3.5"</option>
                            <option value="4">4"</option>
                            <option value="4.5">4.5"</option>
                            <option value="5">5"</option>
                            <option value="5.5">5.5"</option>
                            <option value="6">6"</option>
                            <option value="10">&gt; 6"</option>
                        </select>

                        <label htmlFor="horizontal">Horizontal</label>
                        <input type="radio" id="horizontal" name="direction" value="horizontal" checked={entry.direction === "horizontal"} onChange={handleFieldChange}/>
                        <label htmlFor="vertical">Vertical</label>
                        <input type="radio" id="vertical" name="direction" value="vertical" checked={entry.direction === "vertical"} onChange={handleFieldChange} />
                        <label htmlFor="diagonal">Diagonal</label>
                        <input type="radio" id="diagonal" name="direction" value="diagonal" checked={entry.direction === "diagonal"} onChange={handleFieldChange} />
                        <label htmlFor="other">Other</label>
                        <input type="radio" id="other" name="direction" value="other" checked={entry.direction === "other"} onChange={handleFieldChange} />
                    </fieldset>
                }
                {/* These fields only appear if the user selects the "water" activity */}
                {water &&
                    <fieldset className="waterProperties hidden">
                        <label htmlFor="water">Amount of water added</label>
                        <select name="water" id="water" name="water" onChange={handleFieldChange}>
                            <option value=""></option>
                            <option value=".25">.25"</option>
                            <option value=".5">.5"</option>
                            <option value=".75">.75"</option>
                            <option value="1">1.0"</option>
                            <option value="1.25">1.25"</option>
                            <option value="1.5">1.5"</option>
                            <option value="1.75">1.75"</option>
                            <option value="2">2"</option>
                            <option value="10">&gt; 2"</option>
                        </select>
                    </fieldset>
                }
                {/* The remaining fields are default */}
                <fieldset>
                    <label htmlFor="notes">Notes</label>
                    <textarea id="notes" name="notes" rows="4" cols="40" onChange={handleFieldChange} placeholder="Found rabbit hole" />
                </fieldset>
                <button type="button" onClick={submitNewEvent}>Complete Entry</button>
            </form>

        </section>
    )
}

export default NewTask