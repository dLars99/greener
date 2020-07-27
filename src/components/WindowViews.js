/* This module routes the different paths to display within the main
window view once the user is logged in.
Parent: Greener */

import { Route, Redirect } from "react-router-dom"
import React from "react"
import Dashboard from "./dashboard/Dashboard"

import TaskLog from "./tasklog/TaskLog"
import NewTask from "./tasklog/NewTask"
import EntryDetail from "./tasklog/EntryDetail"
import EditEntry from "./tasklog/EditEntry"

const WindowViews = (props) => {

    // Pass parent functions to child components
    const hasUser = props.hasUser
    const retrieveUser = props.retrieveUser

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

            <Route
                exact path="/log"
                render={props => {
                    if (hasUser) {
                        return <TaskLog retrieveUser={retrieveUser} {...props} />
                    }
                }}
            />

            <Route
                path="/log/new"
                render={props => {
                    if (hasUser) {
                        return <NewTask retrieveUser={retrieveUser} {...props} />
                    }
                }}
            />

            <Route
                path="/log/:entryId(\d+)/details"
                render={props => {
                    if (hasUser) {
                        return <EntryDetail {...props} />
                    }
                }}
            />

            <Route
                path="/log/:entryId(\d+)/edit"
                render={props => {
                    if (hasUser) {
                        return <EditEntry {...props} />
                    }
                }}
            />
        </>
    )
}

export default WindowViews