import React from "react"

const Login = props => {

    return (
        <>
           <h4>Please confirm your information below</h4>
           <p>First Name: {props.userLogin.name}</p>
           <p>Email: {props.userLogin.newEmail}</p>
           <p>Address: {props.userLogin.address}</p>
           <p>City: {props.userLogin.city}</p>
           <p>Zip Code: {props.userLogin.zip}</p>
           <p>Climate Zone: {props.userLogin.zone}</p>
           <p>Lawn Size: {props.userLogin.lotSize}</p>
        </>
    )
}

export default Login