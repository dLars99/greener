/* This component allows the user to create
a new entry for the log and save the entry
to the database */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"

const NewTask = (props) => {

    const [entry, setEntry] = useState({ name: "", date: "", length: "", direction: "", amount: "", activities: []})
    const [activities, setActivities] = useState([])
    const [mow, setMow] = useState("false")
    const [water, setWater] = useState("false")
    const [isLoading, setIsLoading] = useState("false")

    const handleActivityChange = evt => {
        // Trigger additional fields for "mow"
        if (evt.target.value === "1") {
            setMow(!mow)
        }
        // Trigger additional fields for "water"
        if (evt.target.value === "2") {
            setWater(!water)
        }
        const checkedActivity = evt.target.value
        const stateToChange = { ...entry}
        const activityList = stateToChange.activities
        if (evt.target.checked) {
            // If the box was checked, add activity to the array in state
            activityList.push(evt.target.value)
        } else {
            // If the box was unchecked, remove the activity from the array in state
            const index = activityList.indexOf(evt.target.value)
            if (index > -1) {
                activityList.splice(index, 1)
            }
        }
        setEntry(stateToChange)
    }

    const handleFieldChange = evt => {
        const updatedState = {...entry}
        updatedState[evt.target.id] = evt.target.value
        setEntry(updatedState)
    }

    const submitNewEvent = evt => {
        evt.preventDefault()
        console.log(entry)
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
                <input type="date" id="date" onChange={handleFieldChange}/>
                <label htmlFor="date">Date Completed</label>
                </fieldset>
                <fieldset className="mowProperties">

                </fieldset>
                <fieldset className="waterProperties">

                </fieldset>
                <fieldset>

                </fieldset>
                <button type="button" onClick={submitNewEvent}>Complete Entry</button>
            </form>

        </section>
    )
}

export default NewTask