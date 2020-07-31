import React from "react"

const Login = props => {

    return (
        <>
            <h2>Welcome to <br/>
            Grass is Greener!</h2>
            <p>Please register below to begin</p>
            <input type="text" id="name" placeholder="Name" onChange={props.handleFieldChange} />
            <label htmlFor="name">Name</label>
            <input type="email" id="newEmail" autoComplete="username" placeholder="Email" onChange={props.handleFieldChange} />
            <label htmlFor="email">Email</label>
            <input type="password" id="newPassword" autoComplete="new-password" placeholder="password" onChange={props.handleFieldChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="confirm" autoComplete="new-password" placeholder="password" onChange={props.handleFieldChange} />
            <label htmlFor="confirm">Confirm Password</label>
            <button type="button" onClick={props.toPartTwo}>Continue</button>
        </>
    )
}

export default Login