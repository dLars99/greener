/* This component renders the summary details
for an individual log entry
Parent: TaskLog, LastEntry */

import React from "react"

const LogCard = props => {

    // Consolidate activity list for display
    const activities = (props.entry.activities) ? props.entry.activities.map(activity => activity.name) : []
    const activityString = activities.join(", ")
    
    return (
        <div className="card">
            <div className="card--date">
                <p>{props.entry.date}</p>
            </div>
            <div className="card--activities">
                {activityString
                ? activityString
                : null}
            </div>
            <h3>Notes:</h3>
            <p>{props.entry.notes}</p>
            <p onClick={() => props.history.push(`/log/${props.entry.id}/details`, props.entry)}>View &gt;&gt;</p>
        </div>
    )
}

export default LogCard