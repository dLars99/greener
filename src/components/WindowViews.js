/* This module routes the different paths to display within the main
window view once the user is logged in.
Parent: Greener */

import { Route, Redirect } from "react-router-dom"
import React from "react"

import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"
import Header from "./Header"
import TaskLog from "./tasklog/TaskLog"
import NewTask from "./tasklog/NewTask"
import EntryDetail from "./tasklog/EntryDetail"
import EditEntry from "./tasklog/EditEntry"
import Forecast from "./weather/Forecast"
import Reminders from "./reminders/Reminders"
import Tips from "./tips/Tips"

const WindowViews = (props) => {

    // Pass parent functions to child components
    const hasUser = props.hasUser
    const clearUser=props.clearUser
    const setUser=props.setUser

    return (
        <>
            {hasUser
            ? <Header clearUser={clearUser} />
            : null
            }

            <Route 
                exact path="/"
                render={props => {
                    if (hasUser) {
                        return <Dashboard {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                path="/login"
                render={props => {
                    if (!hasUser) {
                        return <Login setUser={setUser} {...props} />
                    } else {
                        return <Redirect to="/" />
                    }
                }}
            />

            <Route
                exact path="/log"
                render={props => {
                    if (hasUser) {
                        return <TaskLog {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                path="/log/new"
                render={props => {
                    if (hasUser) {
                        return <NewTask {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                path="/log/:entryId(\d+)/details"
                render={props => {
                    if (hasUser) {
                        return <EntryDetail {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                path="/log/:entryId(\d+)/edit"
                render={props => {
                    if (hasUser) {
                        return <EditEntry {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                path="/forecast"
                render={props => {
                    if (hasUser) {
                        return <Forecast {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                path="/reminders"
                render={props => {
                    if (hasUser) {
                        return <Reminders {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

            <Route
                path="/tips"
                render={props => {
                    if (hasUser) {
                        return <Tips {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }}
            />

        </>
    )
}

export default WindowViews