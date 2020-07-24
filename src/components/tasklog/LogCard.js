/* This component renders each individual entry
within the Log component */

import React from "react"

const LogCard = props => {

    return (
        <div className="card">
            <h3>Date</h3>
            <p>{props.entry.date}</p>
            <h3>Activities</h3>
            {props.entry.logActivities.map(activity => {
                // Conditional eliminates key error before data is pulled
                return (activity.id) ? <p key={activity.id}>{activity.name}</p> : null })
            }
            <h3>Notes</h3>
            <p>{props.entry.notes}</p>
            <p>View &gt;&gt;</p>
        </div>
    )
}

export default LogCard