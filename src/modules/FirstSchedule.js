/* This component is called when a user first registers an account.
It will set up a schedule for common seasonal lawn care tasks. */

import DatabaseManager from "./DatabaseManager"

export function FirstSchedule(newUser) {

    const today = Date.now()
    const UTCOffset = new Date(today).getTimezoneOffset()
    // If this app were to ever go international, the next line would need to be refactored for + or - UTC
    const offsetDate = new Date(today - (UTCOffset * 60 * 1000))
    const todayDate = offsetDate.toISOString().substring(0, 10)
    // const todayDate = today.substring(0, 10)
    const currentYear = todayDate.substr(0, 4)
    const userId = newUser.id

    // Assign dethatch
    const dethatchYear = (new Date(`${currentYear}-03-15`) > today) ? currentYear : parseInt(currentYear) + 1
    const schedule = [{userId: userId, activityId: 6, startDate: `${dethatchYear}-03-15`, endDate: `${dethatchYear}-03-31`}]

    // Assign weed control
    const weedYear = (new Date(`${currentYear}-05-01`) > today) ? currentYear : parseInt(currentYear) + 1
    schedule.push({userId: userId, activityId: 5, startDate: `${weedYear}-05-01`, endDate: `${weedYear}-05-31` })

    // Assign aerate
    const aerateYear = (new Date(`${currentYear}-09-01`) > today) ? currentYear : parseInt(currentYear) + 1
    schedule.push({userId: userId, activityId: 8, startDate: `${aerateYear}-09-01`, endDate: `${aerateYear}-09-17`})

    // Assign seed x 2
    const seed1 = (new Date(`${currentYear}-03-15`) > today) ? currentYear : parseInt(currentYear) + 1  
    const seed2 = (new Date(`${currentYear}-09-01`) > today) ? currentYear : parseInt(currentYear) + 1
    schedule.push({userId: userId, activityId: 7, startDate: `${seed1}-03-15`, endDate: `${seed1}-03-31`},
        {userId: userId, activityId: 7, startDate: `${seed2}-09-01`, endDate: `${seed2}-09-15`}
    )

    // Assign fertilize x 3
    const fertilize1 = (new Date(`${currentYear}-04-01`) > today) ? currentYear : parseInt(currentYear) + 1
    const fertilize2 = (new Date(`${currentYear}-07-01`) > today) ? currentYear : parseInt(currentYear) + 1
    const fertilize3 = (new Date(`${currentYear}-10-01`) > today) ? currentYear : parseInt(currentYear) + 1
    schedule.push({userId: userId, activityId: 4, startDate: `${fertilize1}-04-01`, endDate: `${fertilize1}-04-30`}, 
        {userId: userId, activityId: 4, startDate: `${fertilize2}-07-01`, endDate: `${fertilize2}-07-31`},
        {userId: userId, activityId: 4, startDate: `${fertilize3}-10-01`, endDate: `${fertilize3}-10-31`}
    )

    const saveSchedule = async (schedule) => {
        for (const reminder of schedule) {
            await DatabaseManager.addNew("reminders", reminder)
        }
        return
    }

    return saveSchedule(schedule)

    // let savedSchedule = []
    // schedule.forEach(reminder => {
    //     savedSchedule.push(DatabaseManager.addNew("reminders", reminder))
    // })

    // return Promise.all(savedSchedule)

}
