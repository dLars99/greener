/* This component allows the user to create
a new entry for the log and save the entry
to the database */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import ImageManager from "../../modules/ImageManager"
import { Validate } from "../../modules/Validate"
import { XCircle } from "react-feather"
import "./NewTask.css"

const NewTask = (props) => {

    const [entry, setEntry] = useState({ date: "", length: "", direction: "", water: 0, notes: "", activities: [], picture: "" })
    const [newActivities, setNewActivities] = useState([])
    const [activities, setActivities] = useState([])
    const [mow, setMow] = useState(false)
    const [water, setWater] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
        const activityList = [...newActivities]
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
        setNewActivities(activityList)
        setEntry(updatedState)

    }

    const handleFieldChange = evt => {
        const updatedState = {...entry}
        updatedState[evt.target.name] = evt.target.value
        setEntry(updatedState)
    }

    const handleImage = async evt => {
        setIsLoading(true)
        const updatedState = {...entry}
        const files = evt.target.files
        ImageManager.uploadImage(files[0])
        .then((imgURL) => {
            updatedState.picture = imgURL
            setEntry(updatedState)
            setIsLoading(false)
        })
    }

    const submitNewEvent = evt => {
        evt.preventDefault()
        setIsLoading(true)
        // Retrieve current user ID from session storage
        const currentUser = parseInt(sessionStorage.getItem("credentials"))
        // Construct and POST the main entry object
        let newEntry = {
            userId: currentUser,
            date: entry.date,
            length: entry.length,
            direction: entry.direction,
            water: parseFloat(entry.water),
            notes: entry.notes,
            picture: entry.picture
        }
        const errorCheck = Validate(newEntry, newActivities)
        if (errorCheck !== "") {
            alert(errorCheck)
            setIsLoading(false)
        } else {
            DatabaseManager.addNew("entries", newEntry)
            .then(savedEntry => {
                //  Iterate through the entry's activities and post each to its own join table
                let promisedLogActivities = []
                newActivities.forEach(activity => {
                    const newLogActivity = {
                        entryId: savedEntry.id,
                        activityId: parseInt(activity)
                    }
                    promisedLogActivities.push(DatabaseManager.addNew("entries_activities", newLogActivity))
                })
                Promise.all(promisedLogActivities)
                .then(() => props.history.push("/log"))
            })
        }
    }

    // Populate list of activities
    useEffect(() => {
        DatabaseManager.getAll("activities")
        .then(activitiesFromAPI => setActivities(activitiesFromAPI))
    }, [])

    return (
        <section className="form">

        <XCircle className="close" color="#72A83D" strokeWidth={1} size={24} onClick={() => {props.history.goBack()}} />

            <form>
                <div className="form--header">
                    <h3>New Log Entry</h3>
                </div>
                <fieldset className="form--section">
                    <h4>Activity</h4>
                    <p>Check all that apply</p>
                    {/* Populate activities list from database */}
                    <div className="activity--checkboxes">
                        {activities.map(activity => {
                            return <div className="activity--selection" key={activity.id}>
                                <input type="checkbox" id="activity" 
                                name={activity.name} value={activity.id}
                                onChange={handleActivityChange} />
                                <label htmlFor={activity.name}>{activity.name}</label>
                            </div>
                        })}
                    </div>
                    <div className="form--date"> 
                        <label htmlFor="date">Date Completed</label>
                        <input type="date" id="date" name="date" onChange={handleFieldChange}/>
                    </div>
                </fieldset>
                {/* These fields only appear if the user checks the "mow" activity */}
                {mow &&
                    <fieldset className="form--section mowProperties">
                        <div className="mow--length">
                            <label htmlFor="length">Grass length before mowing</label>
                            <select name="length" id="length" onChange={handleFieldChange}>
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
                {/* These fields only appear if the user selects the "water" activity */}
                {water &&
                    <fieldset className="form--section waterProperties">
                        <div className="water--amount">
                            <label htmlFor="water">Amount of water added</label>
                            <select name="water" id="water" onChange={handleFieldChange}>
                                <option defaultValue=""></option>
                                <option value="0.25">.25"</option>
                                <option value="0.5">.5"</option>
                                <option value="0.75">.75"</option>
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
                {/* The remaining fields are default and optional to the user */}
                <fieldset className="form--section">
                    <div className="form--notes">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" name="notes" rows="4" cols="40" onChange={handleFieldChange} placeholder="Found rabbit hole" />
                    </div>
                    <div className="form--picture">
                        <label htmlFor="file">Picture</label>
                        <input type="file" id="file" placeholder="Image.jpg" onChange={handleImage}/>
                    </div>
                    <div className="form--imgPreview">
                        {entry.picture
                        ? <img src={entry.picture} alt="Preview" className="picture--upload" />
                        : null
                        }
                    </div>
                </fieldset>
                <button type="button" className="form--button" onClick={submitNewEvent} disabled={isLoading}>Complete Entry</button>
            </form>

        </section>
    )
}

export default NewTask