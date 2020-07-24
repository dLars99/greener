/* This component acts as the primary window for the app.
If the user is new or not logged in, they will see the login screen.
If the user is logged in, they will be taken to the Dashboard.
Parent: index */

import React, { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import WindowViews from "./components/WindowViews"
import "./Greener.css"

const Greener = () => {

    // TEMPORARY CREDS -- DELETE ONCE REGISTRATION/LOGIN IS FUNCTIONAL
    sessionStorage.setItem("credentials", 1)

    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
    
    const [hasUser, setHasUser] = useState(isAuthenticated())

    const setUser = user => {
        sessionStorage.setItem("credentials", user.id)
    }

    const retrieveUser = () => {
        return sessionStorage.getItem("credentials")
    }

    const clearUser = () => {
        sessionStorage.clear()
        setHasUser(isAuthenticated())
    }

    return (
            <div className="content-window">
            {hasUser &&  
                <>
                    <Header clearUser={clearUser} />
                    <WindowViews hasUser={hasUser} retrieveUser={retrieveUser} />
                    <Footer />
                </>
            }
        </div>
    )

}
export default Greener