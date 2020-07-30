/* This module routes the different paths to display within the main
window view once the user is logged in.
Parent: Greener */

import { Route, Redirect } from "react-router-dom"
import React from "react"

import Dashboard from "./dashboard/Dashboard"
import Login from "./login/Login"
import Header from "./Header"
import Footer from "./Footer"
import TaskLog from "./tasklog/TaskLog"
import NewTask from "./tasklog/NewTask"
import EntryDetail from "./tasklog/EntryDetail"
import EditEntry from "./tasklog/EditEntry"

const WindowViews = (props) => {

    // Pass parent functions to child components
    const hasUser = props.hasUser
    const clearUser=props.clearUser
    const setUser=props.setUser

    return (
        <>
            <Header clearUser={clearUser} />

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

            <Footer />

        </>
    )
}

export default WindowViews