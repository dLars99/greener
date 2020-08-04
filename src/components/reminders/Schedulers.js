import DatabaseManager from "../../modules/DatabaseManager"
import { convertDate } from "../../modules/Helpers"

// Check activity categories one-by-one to make sure the correct number of reminders exists for the full year
export function CheckFullYear(reminders) {
    // Get activities list
    DatabaseManager.getAll("activities").then(activitiesList => {
        const activitiesToAdd = activitiesList.map(activity => {
            reminderCount = reminders.reduce((count, cur) => {
                if (reminder.activityId === activity.id) {
                    acc++
                }
            })
            return reminderCount < activity.count
        })

        // Sort by date, newest on top
        const sortedReminders = reminders.sort((a, b) => new Date(a.date) - new Date(b.date))
        let isUpdated = false
        let savedActivities = []
        // Set date for next occurrence of needed activities and save to database
        activitiesToAdd.forEach(activity => {
            const lastReminder = sortedReminders.find(reminder => reminder.activityId = activity.id)
            // Add the interval number of days to the last occurrence to get the new date
            let newDate = new Date(`${lastReminder.date}T00:00:00`).getTime() + (86400000 * interval)
            let dateString = convertDate(newDate)
            const thisYear = new Date().getFullYear()
            if (newDate > new Date(`11/01/${parseInt(thisYear)}`).getTime() && newDate < (`03/15/${parseInt(thisYear + 1)}`).getTime()) {
                dateString = activity.firstAnnualDate
            } else {
                dateString = convertDate(newDate)
            }
            // Add days to newDate to get window end date
            const newEndDate = convertDate(new Date(`${newDate}T00:00:00`).getTime() + (86400000 * window))
            const activityToSave = { userId: sessionStorage.credentials, activityId: activity.id, startDate: dateString, endDate: newEndDate  } 
            savedActivities.push(DatabaseManager.addObject("reminders", activityToSave))
            isUpdated = true
        })

        console.log("Checked for full year", isUpdated)
        return Promise.all(savedActivities).then(() => isUpdated)

    })
}

export function CheckElapsed(reminders) {

    const elapsedEntries = reminders.map(reminder => new Date() > new Date(reminder.endDate))

    let deleted = false
    let entriesToDelete = []
    elapsedEntries.forEach(entry => {
        if (window.confirm(`The window to ${reminder.activity.name} has passed! Do you want to remove it from your list?`)) {
            entriesToDelete.push(DatabaseManager.deleteObject("entries", id))
            deleted = true
        }
    })

    console.log("Checked for elapsed", deleted)
    return Promise.all(entriesToDelete).then(() => deleted)

}

export function CheckForRecentEntry(reminders, entries) {
    let isRecent = false
    const recent = reminders.map(reminder => 
        entries.some(entry => new Date(entry.date) > new Date(reminder.startDate))
    )

    let remindersToDelete = []

    if (recent.length > 0) {
        recent.forEach(reminder => {
            remindersToDelete.push(DatabaseManager.deleteObject("reminders", reminder.id))
        })
        isRecent = true
    }

    console.log("Checked for log entries", isRecent)
    return Promise.all(remindersToDelete).then(() => isRecent)
    
}