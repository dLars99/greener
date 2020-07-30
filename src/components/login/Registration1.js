import React from "react"

const Login = props => {
    const toPartTwo = () => {
        const element = document.getElementById("registration2")
        element.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
            <h2>Welcome to <br/>
            Grass is Greener!</h2>
            <p>Please register below to begin</p>
            <input type="text" id="registerName" placeholder="Name" />
            <label htmlFor="registerName">Name</label>
            <input type="email" id="registerEmail" autoComplete="username" placeholder="Email" />
            <label htmlFor="registerEmail">Email</label>
            <input type="password" id="registerPassword" autoComplete="new-password" placeholder="password" />
            <label htmlFor="registerPassword">Password</label>
            <input type="password" id="registerConfirm" autoComplete="new-password" placeholder="password" />
            <label htmlFor="registerConfirm">Confirm Password</label>
            <button type="button" onClick={toPartTwo}>Continue</button>
        </>
    )
}

export default Login