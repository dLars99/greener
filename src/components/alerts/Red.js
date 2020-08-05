/* This component renders each of the
"warning" alerts to the Dashboard
Parent: Alerts */

import React from "react"
import {XOctagon} from "react-feather"

const Red = (props) => {

    return (
        <div className="redAlert alert--box">
            <XOctagon color="white" strokeWidth={1.5} />{props.warning}
        </div>
    )
}

export default Red