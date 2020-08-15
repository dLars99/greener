/* This component displays the next
upcoming task in the dashboard.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import { CheckElapsed, CheckForRecentEntry } from "../reminders/Schedulers"
import ReminderCard from "./ReminderCard"
import { ChevronRight } from "react-feather"
import "./Reminders.css"

const NextReminder = (props) => {

    const [nextReminder, setNextReminder] = useState()
    
    const getReminders = () => {
        DatabaseManager.getAndExpand("reminders", parseInt(sessionStorage.credentials), "activity")
        .then(remindersFromAPI => {
            DatabaseManager.getByUser("entries", parseInt(sessionStorage.credentials), "activities")
            .then((entriesFromAPI) => { 
                checkSchedule(remindersFromAPI, entriesFromAPI)
            })
        })
    }

    async function checkSchedule(remindersFromAPI, entriesFromAPI) {

        const scheduleUpdated = await CheckForRecentEntry(remindersFromAPI, entriesFromAPI)
        if (scheduleUpdated) {
            getReminders()
            return}
        const scheduleOverdue = await CheckElapsed(remindersFromAPI)
        const sortedReminders = remindersFromAPI.sort((a, b) => new Date (a.startDate) - new Date(b.startDate))
        setNextReminder(sortedReminders[0])
        if (scheduleOverdue === true) {
            getReminders()
            return
        } else if (scheduleOverdue !== false) {
            scheduleOverdue.forEach(alert => {
                props.addAlert(alert)
            })
        } else if (new Date() > new Date(sortedReminders[0].startDate)) {
            props.addAlert([{type: "current", data: sortedReminders[0].activity.name}])
        }

    }

    useEffect(() => {
        getReminders()
        // eslint-disable-next-line  
    }, [])

    return (
        <>
            <h3>Coming Up</h3>
            {nextReminder
                ? <ReminderCard reminder={nextReminder} {...props} />
                : null
            }
            <div className="dashboard--viewMore">
                View full schedule
                <ChevronRight color="#72A83D" strokeWidth={1} size={20}/>
            </div>
        </>
    )

}

export default NextReminder