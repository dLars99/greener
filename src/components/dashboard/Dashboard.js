import React from "react"
import "./Dashboard.css"

const Dashboard = (props) => {

    return (
        <main className="dashboard">
            <div className="reminders">
                Reminders and alerts
            </div>
            <div className="main-actions">
                <div className="addNew">
                    Record a new log entry
                </div>
                <div className="currentWeather">
                    Current Weather
                </div>
                <div className="water">
                    Precipitation
                </div>
            </div>
            <div className="logEntries">
                <div className="lastEntry">
                    Last log entry
                </div>
                <div className="nextSchedule">
                    Next scheduled item
                </div>
            </div>
            <div className="randomTip">
                Random tip from database
            </div>
        </main>
    )
}

export default Dashboard