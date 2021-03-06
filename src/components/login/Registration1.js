/* This component registers the first 
user registration page, for the user's
name and login information.
Parent: Login */

import React from "react"
import { ArrowDownCircle } from "react-feather"

const Login = props => {

    return (
        <>
            <fieldset className="form--page form--page-1"> 
                <h2>Welcome to <br/>
                Grass is Greener!</h2>
                <p>Let's start with the basics.</p>
                <div className="form--row form--row-first">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Name" onChange={props.handleFieldChange} />
                </div>
                <div className="form--row">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="newEmail" autoComplete="username" placeholder="Email" onChange={props.handleFieldChange} />
                </div>
                <div className="form--row">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="newPassword" autoComplete="new-password" placeholder="Password" onChange={props.handleFieldChange} />
                </div>
                <div className="form--row">
                    <label htmlFor="confirm">Confirm</label>
                    <input type="password" id="confirm" autoComplete="new-password" placeholder="Confirm Password" onChange={props.handleFieldChange} />
                </div>
                <div className="buttonDiv">
                    <ArrowDownCircle color="white" strokeWidth={1.5} size={48} fill="#3E7C07" onClick={props.toPartTwo} />
                </div>
            </fieldset>
        </>
    )
}

export default Login