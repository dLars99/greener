/* This component renders each of the
"caution" alerts to the Dashboard
Parent: Alerts */

import React from "react"
import { AlertTriangle } from "react-feather"

const Yellow = (props) => {

    return (
        <div className="yellowAlert alert--box">
            <AlertTriangle color="orange" strokeWidth={1.5} />{props.warning.message}
        </div>
    )
}

export default Yellow