import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import CurrentWeather from "../weather/CurrentWeather"
import Precipitation from "../weather/Precipitation"
import LastEntry from "../tasklog/LastEntry"
import NextReminder from "../reminders/NextReminder"
import { PlusCircle } from "react-feather"
import "./Dashboard.css"

const Dashboard = (props) => {

    const [logEntries, setLogEntries] = useState([])

    // Retrieve log entries for use by the LastEntry and Precipitation components
    const getLogEntries = () => {
        DatabaseManager.getByUser("entries", sessionStorage.getItem("credentials"), "activities")
        .then(entriesFromAPI => setLogEntries(entriesFromAPI))
    }

    useEffect(() => {
        getLogEntries()
    }, [])

    return (
        <main className="dashboard">
            <div className="alerts">
                Reminders and alerts
            </div>
            <PlusCircle className="addNew" fill="#3E7C07" color="white" strokeWidth={1.5} size={72} onClick={() => props.history.push("/log/new")} />

            <div className="main-actions">
                <div className="dashboard--block currentWeather">
                    <CurrentWeather />
                </div>
                <div className="dashboard--block water">
                    {logEntries 
                    ? <Precipitation logEntries={logEntries} />
                    : null}
                </div>
            </div>
            <div className="logEntries">
                <div className="dashboard--block lastEntry">
                    <LastEntry logEntries={logEntries} {...props} />
                </div>
                <div className="dashboard--block nextSchedule">
                    {logEntries
                    ? <NextReminder logEntries={logEntries} {...props} />
                    : null}
                </div>
            </div>
            <div className="dashboard--block randomTip">
                Random tip from database
            </div>
        </main>
    )
}

export default Dashboard