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