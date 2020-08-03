/* This component renders the details for an
individual entry from the log selected by the user
Parent: LogCard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import "./EntryDetail.css"

const TaskLog = (props) => {
    
    const [mow, setMow] = useState(false)
    const [water, setWater] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Entry information from LocationCard in the log
    const currentEntry = props.location.state

    // Consolidate activity list for display
    const activities = (currentEntry.activities) ? currentEntry.activities.map(activity => activity.name) : []
    const activityString = activities.join(", ")
    

    const handleDelete = id => {
        
        if (window.confirm("This will permanently delete this entry")) {
            setIsLoading(true)
            DatabaseManager.deleteObject("entries", id)
            .then(() => props.history.push("/log"))
        }
    }

    useEffect(() => {
        const mowExists = currentEntry.activities.some(activity => activity.name === "Mow")
        setMow(mowExists)
        const waterExists = currentEntry.activities.some(activity => activity.name === "Water")
        setWater(waterExists)
        setIsLoading(false)
    }, [])

    return (
        <article className="detail">

            <div className="close" onClick={() => {props.history.goBack()}}>
                &times;
            </div>

            <div className="card--detail">
                <h3 className="detail--date">Date</h3>
                <p>{currentEntry.date}</p>
                <h3>Activities</h3>
                <div className="card--activities">
                    <p>{activityString}</p>
                </div>
                {mow &&
                <>
                    <h3>Grass Length before Mow</h3>
                    <p>{currentEntry.length}"</p>
                    <h3>Mow Direction</h3>
                    <p>{currentEntry.direction}</p>
                </>
                }
                {water &&
                <>
                    <h3>Water Amount</h3>
                    <p>{currentEntry.water}</p>
                </>
                }
                <h3>Notes</h3>
                {currentEntry.notes !== ""
                ? <p>{currentEntry.notes}</p>
                : <p>None</p>
            }   
            </div>

            <div className="detail--buttonList">
                <button type="button" className="detail--button" disabled={isLoading} onClick={() => props.history.push(`/log/${currentEntry.id}/edit`)}>Edit Entry</button>
                <button type="button" className="detail--button" disabled={isLoading} onClick={() => handleDelete(currentEntry.id)}>Delete Entry</button>
            </div>

        </article>
    )
}

export default TaskLog