/* This component acts as the primary window for the app.
If the user is new or not logged in, they will see the login screen.
If the user is logged in, they will be taken to the Dashboard.
Parent: index */

import React, { useState } from "react"
import WindowViews from "./components/WindowViews"
import "./Greener.css"

const Greener = () => {

    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
    
    const [hasUser, setHasUser] = useState(isAuthenticated())

    const setUser = user => {
        sessionStorage.setItem("credentials", user.id)
        setHasUser(isAuthenticated())
    }

    const clearUser = () => {
        sessionStorage.clear()
        setHasUser(isAuthenticated())
    }

    return (
        <div className="content-window">    
            <WindowViews hasUser={hasUser} clearUser={clearUser} setUser={setUser}/>        
        </div>
    )

}
export default Greener