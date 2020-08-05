import DatabaseManager from "../../modules/DatabaseManager"
import { convertDate } from "../../modules/Helpers"

// Check activity categories one-by-one to make sure the correct number of reminders exists for the full year
export function CheckFullYear(reminders) {
    DatabaseManager.getAll("activities").then(activitiesList => {
        const activitiesToAdd = activitiesList.filter(activity => {
            const reminderCount = reminders.reduce((count, cur) => {
                if (cur.activityId === activity.id) {
                    count++
                }
                return count
            }, 0)
        return reminderCount < activity.repeat
        })
        // Sort by date, newest on top
        const sortedReminders = reminders.sort((a, b) => new Date(b.date) - new Date(a.date))
        let isUpdated = false
        let savedActivities = []
        // Set date for next occurrence of needed activities and save to database
        activitiesToAdd.forEach(activity => {
            console.log(activity)
            const lastReminder = sortedReminders.find(reminder => reminder.activityId = activity.id)
            console.log(lastReminder)
            // Add the interval number of days to the last occurrence to get the new date
            let newDate = new Date(`${lastReminder.startDate}T00:00:00`).getTime() + (86400000 * activity.interval)
            let dateString = convertDate(newDate)
            console.log(dateString)
            const thisYear = new Date().getFullYear()
            if (newDate > new Date(`11/01/${parseInt(thisYear)}`).getTime() && newDate < new Date(`03/15/${parseInt(thisYear + 1)}`).getTime()) {
                dateString = `${parseInt(thisYear + 1)}-${activity.firstAnnualDate}`
            } else {
                dateString = convertDate(newDate)
            }
            // Add days to newDate to get window end date
            const newEndDate = convertDate(new Date(`${dateString}T00:00:00`).getTime() + (86400000 * activity.window))
            const activityToSave = { userId: parseInt(sessionStorage.credentials), activityId: activity.id, startDate: dateString, endDate: newEndDate  } 
            savedActivities.push(DatabaseManager.addNew("reminders", activityToSave))
            isUpdated = true
        })
        
        return Promise.all(savedActivities).then(() => isUpdated)
    })

}

export function CheckElapsed(reminders) {

    const elapsedReminders = reminders.filter(reminder => new Date() > new Date(reminder.endDate))

    let deleted = false
    let remindersToDelete = []
    elapsedReminders.forEach(reminder => {
        if (window.confirm(`The window to ${reminder.activity.name} has passed! Do you want to remove it from your list?`)) {
            remindersToDelete.push(DatabaseManager.deleteObject("reminders", reminder.id))
            deleted = true
        } else {
            deleted = [{type: "elapsed", condition: "red", data: reminder.activity.name}]
        }
    })
    return Promise.all(remindersToDelete).then(() => deleted)

}

export function CheckForRecentEntry(reminders, entries) {
    let isRecent = false
    const recent = reminders.filter(reminder => 
        entries.some(entry => new Date(entry.date) >= new Date(reminder.startDate) && entry.activities.some(activity => activity.id === reminder.activityId))
    )
    let remindersToDelete = []

    if (recent.length > 0) {
        recent.forEach(reminder => {
            remindersToDelete.push(DatabaseManager.deleteObject("reminders", reminder.id))
        })
        isRecent = true
    }

    return Promise.all(remindersToDelete).then(() => isRecent)
    
}