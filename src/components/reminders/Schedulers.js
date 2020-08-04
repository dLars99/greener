import DatabaseManager from "../../modules/DatabaseManager"

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
        // Find date to add activity and save to database
    })
}

export function CheckElapsed(reminders) {

    const elapsedEntries = reminders.map(reminder => new Date() > new Date(reminder.endDate))

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

    return Promise.all(remindersToDelete).then(() => isRecent)
    
}