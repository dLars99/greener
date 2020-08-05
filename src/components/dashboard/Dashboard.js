import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import Alerts from "../alerts/Alerts"
import CurrentWeather from "../weather/CurrentWeather"
import Precipitation from "../weather/Precipitation"
import LastEntry from "../tasklog/LastEntry"
import NextReminder from "../reminders/NextReminder"
import RandomTip from "../tips/RandomTip"
import { PlusCircle } from "react-feather"
import "./Dashboard.css"

const Dashboard = (props) => {

    const [logEntries, setLogEntries] = useState([])
    const [alerts, setAlerts] = useState([])

    // Retrieve log entries for use by the LastEntry and Precipitation components
    const getLogEntries = () => {
        DatabaseManager.getByUser("entries", sessionStorage.getItem("credentials"), "activities")
        .then(entriesFromAPI => setLogEntries(entriesFromAPI))
    }

    const addAlert = (componentAlert) => {
        let updatedAlerts = [...alerts]
        updatedAlerts.push(componentAlert)
        setAlerts(updatedAlerts)
    }

    useEffect(() => {
        getLogEntries()
    }, [])

    return (
        <main className="dashboard">
            <div className="alerts">
                {alerts.length !== 0
                 ? alerts.map(warning => <Alerts key={alerts.indexOf(warning)} warning={warning} /> )
                : null
                }
            </div>
            <PlusCircle className="addNew" fill="#3E7C07" color="white" strokeWidth={1.5} size={72} onClick={() => props.history.push("/log/new")} />

            <div className="main-actions">
                <div className="dashboard--block currentWeather">
                    <CurrentWeather addAlert={addAlert} />
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
                    ? <NextReminder logEntries={logEntries} addAlert={addAlert} {...props} />
                    : null}
                </div>
            </div>
            <div className="dashboard--block randomTip">
                <RandomTip {...props} />
            </div>
        </main>
    )
}

export default Dashboard