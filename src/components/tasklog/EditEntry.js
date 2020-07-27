/* This component allows the user to edit
an individual entry from the log */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"

const EditEntry = props => {

    const [entry, setEntry] = useState({})
    const [activities, setActivities] = useState([])
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
        const activityList = updatedState.logActivities
        if (evt.target.checked) {
            // If the box was checked, add activity to the array in state
            activityList.push(parseInt(checkedActivity))
        } else {
            // If the box was unchecked, remove the activity from the array in state
            const index = activityList.indexOf(parseInt(checkedActivity))
            if (index > -1) {
                activityList.splice(index, 1)
            }
        }
        updatedState.logActivities = activityList
        setEntry(updatedState)
    }

    const handleFieldChange = evt => {
        const updatedState = {...entry}
        updatedState[evt.target.name] = evt.target.value
        setEntry(updatedState)
    }

    useEffect(() => {
        // First, retrieve the relevant entry
        DatabaseManager.getById("entries", props.match.params.entryId)
        .then(entryFromAPI => {
            // Check for "Mow"
            if (entryFromAPI.logActivities.includes(1)) {setMow(true)}
            // Check for "Water"
            if (entryFromAPI.logActivities.includes(3)) {setWater(true)}
            setEntry(entryFromAPI)
            // Then, pull the master list of activities
            DatabaseManager.getAll("activities")
            .then(activitiesList => setActivities(activitiesList))
        })
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
                {console.log(entry.logActivities)}
                {activities.map(activity => {
                    return <span key={activity.id}>
                        <input type="checkbox" id="activity" 
                        name={activity.name} value={activity.id}  checked={entry.logActivities.includes(activity.id)}
                        onChange={handleActivityChange} />
                        <label htmlFor={activity.name}>{activity.name}</label>
                    </span>
                })}
                <input type="date" id="date" name="date" onChange={handleFieldChange} value={entry.date} />
                <label htmlFor="date">Date Completed</label>
            </fieldset>
            {/* These fields only appear if the user checks the "mow" activity */}
            {mow &&
                <fieldset className="mowProperties hidden">
                    <label htmlFor="length">Grass length before mowing</label>
                    <select name="length" id="length" name="length" onChange={handleFieldChange} value={entry.length}>
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
                    <select name="water" id="water" name="water" onChange={handleFieldChange} value={entry.amount}>
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
                <textarea id="notes" name="notes" rows="4" cols="40" onChange={handleFieldChange} value={entry.notes} />
            </fieldset>
            {/* <button type="button" onClick={submitNewEvent}>Complete Entry</button> */}
        </form>

    </section>
    )
}

export default EditEntry