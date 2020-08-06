/* This component renders the details for an
individual entry from the log selected by the user
Parent: LogCard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import { XCircle, Edit, Trash2 } from "react-feather"

import "./EntryDetail.css"

const TaskLog = (props) => {
    
    const [mow, setMow] = useState(false)
    const [water, setWater] = useState(false)

    // Entry information from LocationCard in the log
    const currentEntry = props.location.state

    // Consolidate activity list for display
    const activities = (currentEntry.activities) ? currentEntry.activities.map(activity => activity.name) : []
    const activityString = activities.join(", ")
    

    const handleDelete = id => {
        
        if (window.confirm("This will permanently delete this entry")) {
            DatabaseManager.deleteObject("entries", id)
            .then(() => props.history.push("/log"))
        }
    }

    useEffect(() => {
        const mowExists = currentEntry.activities.some(activity => activity.name === "Mow")
        setMow(mowExists)
        const waterExists = currentEntry.activities.some(activity => activity.name === "Water")
        setWater(waterExists)
    }, [])

    return (
        <article className="detail">

            <XCircle className="close" color="#72A83D" strokeWidth={1} size={24} onClick={() => {props.history.goBack()}} />

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
                {currentEntry.picture !== ""
                ? <div className="entry--picture">
                    <img className="entry--img" src={currentEntry.picture} alt={`Picture from ${currentEntry.date}`} />
                </div>
                : null
                } 
            </div>

            <div className="detail--buttonList">
                <Edit color="#72A83D" strokeWidth={1} size={36} onClick={() => props.history.push(`/log/${currentEntry.id}/edit`)} />
                <Trash2 color="#72A83D" strokeWidth={1} size={36} onClick={() => handleDelete(currentEntry.id)} />
            </div>

        </article>
    )
}

export default TaskLog