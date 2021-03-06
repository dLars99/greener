/* This component renders the full list of
a users reminders for scheduled tasks.
Parent: WindowViews */

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DatabaseManager from "../../modules/DatabaseManager"
import { CheckFullYear, CheckElapsed, CheckForRecentEntry } from "../reminders/Schedulers"
import ReminderCard from "./ReminderCard"
import { ChevronsLeft } from "react-feather"
import "./Reminders.css"

const Reminders = (props) => {

    const [reminders, setReminders] = useState([])
    // const [entries, setEntries] = useState([])

    const getReminders = () => {
        DatabaseManager.getByUser("entries", parseInt(sessionStorage.credentials), "activities")
        .then((entriesFromAPI) => {
            DatabaseManager.getAndExpand("reminders", parseInt(sessionStorage.credentials), "activity")
            .then(remindersFromAPI => {
                checkSchedule(remindersFromAPI, entriesFromAPI)
            })
        })
    }

    async function checkSchedule(remindersFromAPI, entriesFromAPI) {
        const scheduleLength = await CheckFullYear(remindersFromAPI, entriesFromAPI)
        if (scheduleLength) {getReminders()}

        const scheduleUpdated = await CheckForRecentEntry(remindersFromAPI, entriesFromAPI)
        if (scheduleUpdated) {getReminders()}

        const scheduleOverdue = await CheckElapsed(remindersFromAPI)
        const sortedReminders = remindersFromAPI.sort((a, b) => new Date (a.startDate) - new Date(b.startDate))
        setReminders(sortedReminders)
        if (scheduleOverdue === true) {
            getReminders()}
    }

    useEffect(() => {
        getReminders()
        // eslint-disable-next-line
    }, [])

    return (
        <section className="reminders">
            <div className="reminders--top">
                <Link to="/" className="reminders--link">
                <ChevronsLeft color="#72A83D" strokeWidth={1} size={20}/>
                Back to Dashboard
                </Link>
            </div>

            <div className="reminders--header">
                <h3>Lawn Care Schedule</h3>
                <p>With recommended date range for completion</p>
            </div>
            <div className="reminders--list">
                {reminders.map(reminder => {
                    const current = new Date() > new Date(reminder.startDate)
                    return <ReminderCard key={reminder.id} reminder={reminder} current={current} {...props} />
                })}        
            </div>
        </section>
    )
}

export default Reminders