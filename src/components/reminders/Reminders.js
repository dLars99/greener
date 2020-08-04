/* This component renders the full list of
a users reminders for scheduled tasks.
Parent: WindowViews */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import ReminderCard from "./ReminderCard"
import "./Reminders.css"

const Reminders = (props) => {

    const [reminders, setReminders] = useState([])

    const getReminders = () => {
        DatabaseManager.getAndExpand("reminders", parseInt(sessionStorage.credentials), "activity")
        .then(remindersFromAPI => {
            const sortedReminders = remindersFromAPI.sort((a, b) => new Date (a.startDate) - new Date(b.startDate))
            setReminders(sortedReminders)
        })
    }

    useEffect(() => {
        getReminders()    
    }, [])

    return (
        <section className="reminders">
            <div className="reminders--header">
                <h3>Lawn Care Schedule</h3>
                <p>Scheduled based on recommended lawn care practices</p>
            </div>
            <div className="reminders--list">
                {reminders.map(reminder => <ReminderCard key={reminder.id} reminder={reminder} {...props} /> )}
            </div>
        </section>
    )
}

export default Reminders