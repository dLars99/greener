/* This component renders reminders, warnings,
and alerts to the top of the dashboard.
Alert content is received from the CurrentWeather
and NextReminder components.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import Yellow from "./Yellow"
import Red from "./Red"
import "./Alerts.js"

const Alerts = (props) => {

    // Categorize alerts
    let yellowAlerts = []
    let redAlerts = []

    return (
        <>
            {yellowAlerts.map(yellow => <Yellow key={key} alert={yellow} {...props}/>)}
            {redAlerts.map(red => <Red key={redAlerts.indexOf(red) + 1} alert={red} {...props}/>)}
        </>
    )
}

export default Alerts