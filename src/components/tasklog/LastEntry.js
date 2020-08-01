/* This component will render the most
log entry on the dashboard 
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import LogCard from "./LogCard"

const LastEntry = (props) => {

    const [lastEntry, setLastEntry] = useState([])

    useEffect(() => {
        setLastEntry(props.logEntries[props.logEntries.length - 1])
    }, [props.logEntries])

    return (
        <>
        <h3>Latest Log Entry</h3>
        {lastEntry
        ? <LogCard entry={lastEntry} {...props} />
        : <p>Create your first log entry now!</p>
        }
        </>
    )
}

export default LastEntry

