/* This component displays the next
upcoming task in the dashboard.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import ReminderCard from "./ReminderCard"
import "./Reminders.css"

const NextReminder = (props) => {

    const [nextReminder, setNextReminder] = useState([])

    const getReminders = () => {
        DatabaseManager.getAndExpand("reminders", parseInt(sessionStorage.credentials), "activity")
        .then(remindersFromAPI => {
            const sortedReminders = remindersFromAPI.sort((a, b) => new Date (a.startDate) - new Date(b.startDate))
            setNextReminder(sortedReminders[0])
        })
    }

    useEffect(() => {
        getReminders()    
    }, [])

    return (
        <>
            <h3>Coming Up</h3>
            {nextReminder.length !== 0
                ? <ReminderCard reminder={nextReminder} {...props} />
                : null
            }
        </>
    )

}

export default NextReminder