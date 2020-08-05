/* This component displays the next
upcoming task in the dashboard.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DatabaseManager from "../../modules/DatabaseManager"
import { CheckElapsed, CheckForRecentEntry } from "../reminders/Schedulers"
import ReminderCard from "./ReminderCard"
import "./Reminders.css"

const NextReminder = (props) => {

    const [nextReminder, setNextReminder] = useState([])
    
    const getReminders = () => {
        DatabaseManager.getAndExpand("reminders", parseInt(sessionStorage.credentials), "activity")
        .then(remindersFromAPI => {
            checkSchedule(remindersFromAPI, props.logEntries)
        })
    }

    async function checkSchedule(remindersFromAPI, logEntries) {
        const scheduleUpdated = await CheckForRecentEntry(remindersFromAPI, logEntries)
        if (scheduleUpdated) {getReminders()}

        const scheduleOverdue = await CheckElapsed(remindersFromAPI)
        const sortedReminders = remindersFromAPI.sort((a, b) => new Date (a.startDate) - new Date(b.startDate))
        setNextReminder(sortedReminders[0])
        if (scheduleOverdue) {getReminders()}

    }

    useEffect(() => {
        getReminders()    
    }, [props.logEntries])

    return (
        <>
            <h3>Coming Up</h3>
            {nextReminder.length !== 0
                ? <ReminderCard reminder={nextReminder} {...props} />
                : null
            }
            <div className="currentWeather--link">
                <Link to="/reminders">View full schedule &gt;</Link>
            </div>

        </>
    )

}

export default NextReminder