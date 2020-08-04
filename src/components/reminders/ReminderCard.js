/* This component renders the individual
reminders in the user's schedule
Parent: Reminders */

import React from "react"

const ReminderCard = (props) => {
    return (
        <div className="reminders--card">
            <div className="reminderCard--header">
                {props.reminder.activity.name}
            </div>
            <div className="reminderCard--date">
                {props.reminder.startDate} to {props.reminder.endDate}
            </div>
        </div>
    )
}

export default ReminderCard