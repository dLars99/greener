import React from "react"

const Login = props => {

    return (
        <>
            <div className="form--page"> 
                <h2>Welcome to <br/>
                Grass is Greener!</h2>
                <p>Please register below to begin</p>
                <div className="form--row">
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
                <div className="form--row">
                    <button type="button" onClick={props.toPartTwo}>Continue</button>
                </div>
            </div>
        </>
    )
}

export default Login