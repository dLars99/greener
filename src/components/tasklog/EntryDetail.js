/* This component renders the details for an
individual entry from the log selected by the user
Parent: LogCard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"

const TaskLog = (props) => {
    
    const [mow, setMow] = useState(false)
    const [water, setWater] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Entry information from LocationCard in the log
    const currentEntry = props.location.state

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
        <article>

            <div onClick={() => props.history.goBack()}>
                X
            </div>

            <div className="card--detail">
                <h3>Date</h3>
                <p>{currentEntry.date}</p>
                <h3>Activities</h3>
                {currentEntry.activities.map(activity => {
                    // Conditional eliminates key error before data is pulled
                    return (activity.id) ? <p key={activity.id}>{activity.name}</p> : null })
                }
                {mow &&
                <>
                    <h3>Grass Length before Mow</h3>
                    <p>{currentEntry.length}</p>
                    <h3>Mow Direction</h3>
                    <p>{currentEntry.direction}</p>
                </>
                }
                {water &&
                <>
                    <h3>Water Amount</h3>
                    <p>{currentEntry.amount}</p>
                </>
                }
                <h3>Notes</h3>
                <p>{currentEntry.notes}</p>
            </div>

            <button type="button" disabled={isLoading} onClick={() => props.history.push(`/log/${currentEntry.id}/edit`)}>Edit Entry</button>
            <button type="button" disabled={isLoading} onClick={() => handleDelete(currentEntry.id)}>Delete Entry</button>

        </article>
    )
}

export default TaskLog