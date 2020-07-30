import React from "react"
import States from "../../modules/States"

const Login = props => {

    return (
        <>
           <h4>Please confirm your information below</h4>
           <p>First Name:</p>
           <p>Email:</p>
           <p>Address:</p>
           <p>City:</p>
           <p>Zip Code:</p>
           <p>Climate Zone:</p>
           <p>Lawn Size:</p>
           <button type="button" onClick={props.registerNewUser}>Finish</button>
        </>
    )
}

export default Login