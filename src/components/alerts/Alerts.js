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
    
    const [redAlerts, setRedAlerts] = useState([])
    const [yellowAlerts, setYellowAlerts] = useState([])

    // Create an appropriate warning or alert based on the weather code. Red = current; yellow = forecast.
    const sortWeather = (warning) => {
        switch (warning.data) {
            case 1030:
            case 1063:
            case 1153:
                if (warning.condition === "yellow") {
                    return {condition: "yellow", message: "There is a possibility of rain today."}
                } else {
                    return {type: "red", message: "There is possible rain in your area."}
                }
            case 1087:
                if (warning.condition === "yellow") {
                    return {type: "yellow", message: "There is a possibility of storms today."}
                } else {
                    return {type: "red", message: "There are possible thunderstorms in your area."}
                }
            case 1180:
            case 1183:
            case 1189:
            case 1192:
            case 1195:
            case 1240:
            case 1243:
            case 1246:
                if (warning.condition === "yellow") {
                    return {type: "yellow", message: "There is rain in your area."}
                } else {
                    return {type: "red", message: "There is rain in your area."}
                }
            case 1273:
            case 1276:
            case 1279:
                if (warning.condition === "yellow") {
                    return {type: "yellow", message: "There are thunderstorms in your area."}
                } else {
                    return {type: "red", message: "There are thunderstorms in your area."}
                }
            default:
                return
        }
    }
    
    const sortAlerts = () => {
    
        // Categorize alerts
        if (props.alerts.length > 0) {
            let counter = 0
            const updateRed = [...redAlerts]
            const updateYellow = [...yellowAlerts]
            props.alerts.forEach(warning => {
                counter++
                switch (warning.type) {
                    case "heat":
                        updateRed.push({key: counter, message: "Dangerous heat today! Do your work in the morning or evening hours if possible."})
                        break
                        case "uv":
                            if (warning.data === "yellow") {
                                updateYellow.push({key: counter, message: "UV levels elevated. Take precautions and avoid peak hours if possible."})
                            } else if (warning.data === "red") {
                                updateRed.push({key: counter, message: "UV levels are high! Wear protective clothing and sunscreen and avoid peak daytime hours."})
                            }
                            break
                        case "weather":
                            const weatherAlert = sortWeather(warning)
                            if (weatherAlert) {
                                if (weatherAlert.type === "yellow") {
                                    updateYellow.push({key: counter, message: weatherAlert.message})
                                }
                            }
                                break
                        case "current":
                            updateYellow.push({key: counter, message: `It's time to ${warning.data}!`})
                            break
                        case "elapsed":
                            updateRed.push({key: counter, message: `${warning.data} is past due.`})
                            break
                        default:
                            // Do nothing if no match above
                            break             
                        }
            })
            setRedAlerts(updateRed)
            setYellowAlerts(updateYellow)
        }
    }

    useEffect (() => {
        sortAlerts()
        // eslint-disable-next-line
    }, [props.alerts])

    return (
        <>
            {redAlerts.map(red => <Red key={red.message} warning={red} {...props}/>)}
            {yellowAlerts.map(yellow => <Yellow key={yellow.message} warning={yellow} {...props}/>)}
        </>
    )
}

export default Alerts