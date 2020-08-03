/* This component is called when a user first registers an account.
It will set up a schedule for common seasonal lawn care tasks. */

import DatabaseManager from "./DatabaseManager"

export function FirstSchedule() {

    const today = Date.now()
    const UTCOffset = new Date(today).getTimezoneOffset()
    // If this app were to ever go international, the next line would need to be refactored for + or - UTC
    const offsetDate = new Date(today - (UTCOffset * 60 * 1000))
    const todayDate = offsetDate.toISOString().substring(0, 10)
    // const todayDate = today.substring(0, 10)
    const currentYear = todayDate.substr(0, 4)
    const userId = parseInt(sessionStorage.credentials)

    // Assign dethatch
    const dethatchDate = (new Date(`${currentYear}-03-15`) > today) ? `${currentYear}-03-15` : `${parseInt(currentYear) + 1}-03-15`
    const schedule = [{userid: userId, activityId: 6, date: dethatchDate }]

    // Assign weed control
    const weedDate = (new Date(`$userid: userId,currentYear}-05-01`) > today) ? `${currentYear}-05-01` : `${parseInt(currentYear) + 1}-05-01`
    schedule.push({userid: userId, activityId: 5, date: weedDate })

    // Assign aerate
    const aerateDate = (new Date(`${currentYear}-09-01`) > today) ? `${currentYear}-09-01` : `${parseInt(currentYear) + 1}-09-01`
    schedule.push({userid: userId, activityId: 8, date: aerateDate })

    // Assign seed x 2
    const seed1 = (new Date(`${currentYear}-03-15`) > today) ? `${currentYear}-03-15` : `${parseInt(currentYear) + 1}-03-15`  
    const seed2 = (new Date(`${currentYear}-09-01`) > today) ? `${currentYear}-09-01` : `${parseInt(currentYear) + 1}-09-01`
    schedule.push({userid: userId, activityId: 6, date: seed1}, {userid: userId, activityId: 6, date: seed2})

    // Assign fertilize x 3
    const fertilize1 = (new Date(`${currentYear}-04-01`) > today) ? `${currentYear}-04-01` : `${parseInt(currentYear) + 1}-04-01`
    const fertilize2 = (new Date(`${currentYear}-07-01`) > today) ? `${currentYear}-07-01` : `${parseInt(currentYear) + 1}-07-01`
    const fertilize3 = (new Date(`${currentYear}-10-01`) > today) ? `${currentYear}-10-01` : `${parseInt(currentYear) + 1}-10-01`
    schedule.push({userid: userId, activityId: 4, date: fertilize1}, {userid: userId, activityId: 4, date: fertilize2}, {userid: userId, activityId: 4, date: fertilize3})

    let savedSchedule = []
    schedule.forEach(reminder => {
        savedSchedule.push(DatabaseManager.addNew("reminders", reminder))
    })

    return Promise.all(savedSchedule)

}
