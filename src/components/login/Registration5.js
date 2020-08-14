/* This component registers the fifth 
user registration page, confirming all
the user registration data.
Parent: Login */

import React from "react"

const Login = props => {

    return (
        <>
            <div className="form--info form--page-5">  
                <h3>Please confirm your information below</h3>
                <div className="form--confirm">
                    <p>First Name: {props.userLogin.name}</p>
                    <p>Email: {props.userLogin.newEmail}</p>
                    <p>Address: {props.userLogin.address}</p>
                    <p>City: {props.userLogin.city}</p>
                    <p>Zip Code: {props.userLogin.zip}</p>
                    <p>Climate Zone: {props.userLogin.zone}</p>
                    <p>Lawn Size: {props.userLogin.lotSize}</p>
                </div>
            </div>
        </>
    )
}

export default Login