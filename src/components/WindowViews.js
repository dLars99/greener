/* This module routes the different paths to display within the main
window view once the user is logged in.
Parent: Greener */

import { Route, Redirect } from "react-router-dom"
import React from "react"
import Dashboard from "./dashboard/Dashboard.js"

const WindowViews = (props) => {
    const hasUser = props.hasUser

    return (
        <>
            <Route 
                exact path="/"
                render={props => {
                    if (hasUser) {
                        return <Dashboard {...props} />
                    }
                }}
            />
        </>
    )
}

export default WindowViews