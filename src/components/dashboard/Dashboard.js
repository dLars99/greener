import React from "react"
import CurrentWeather from "../weather/CurrentWeather"
import LastEntry from "../tasklog/LastEntry"
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
                    <button type="button" className="button" onClick={() => props.history.push("/log/new")}>+ New Entry</button>
                </div>
                <div className="currentWeather">
                    <CurrentWeather />
                </div>
                <div className="water">
                    Precipitation
                </div>
            </div>
            <div className="logEntries">
                <div className="lastEntry">
                    <LastEntry {...props} />
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