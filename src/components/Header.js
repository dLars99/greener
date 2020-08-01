/* This component renders the header for the app.
Parent module: Greener */

import React from "react"
import "./Header.css"
import { Link } from "react-router-dom"

const Header = (props) => {

    return (
        <>
            <header>
                <div className="title">
                    <h1>Grass is Greener</h1>
                    <Link to="/log">
                        View Log
                    </Link>
                </div>
                <div className="userLogo">
                    {sessionStorage.userName}
                    <div onClick={props.clearUser}>Logout</div>
                </div>
            </header>
        </>
    )
}

export default Header