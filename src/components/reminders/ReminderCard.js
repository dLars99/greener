/* This component renders the individual
reminders in the user's schedule
Parent: Reminders */

import React from "react"
import { PlusCircle } from "react-feather"

const parseDate = (date) => {
    const dateMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dateWhole = new Date(`${date}T00:00:00`)
    const year = dateWhole.getFullYear()
    const month = dateWhole.getMonth()
    const day = dateWhole.getDate()
    return `${dateMonths[month]} ${day}, ${year}`   
}

const ReminderCard = (props) => {
    return (
        <div className="reminders--card">
            <div className="reminderCard--header">
                <h4>{props.reminder.activity.name}</h4>
                {props.current
                ? <PlusCircle className="reminder--button" color="#3E7C07" strokeWidth={1.5} size={36} onClick={() => props.history.push("/log/new")} />  
                : null
                }
            </div>
            <div className="reminderCard--date">
                <p>{parseDate(props.reminder.startDate)}</p>
                <p>to {parseDate(props.reminder.endDate)}</p>
            </div>
        </div>
    )
}

export default ReminderCard