/* This component renders the individual
reminders in the user's schedule
Parent: Reminders */

import React from "react"

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
            </div>
            <div className="reminderCard--date">
                <p>{parseDate(props.reminder.startDate)}</p>
                <p>to {parseDate(props.reminder.endDate)}</p>
            </div>
        </div>
    )
}

export default ReminderCard