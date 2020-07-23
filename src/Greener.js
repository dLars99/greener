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

    const clearUser = () => {
        sessionStorage.clear()
        setHasUser(isAuthenticated())
    }

    return (
        <>
            <div className="content-window">
                {hasUser &&  
                    <>
                        <Header clearUser={clearUser} />
                        <WindowViews hasUser={hasUser}/>
                        <Footer />
                    </>
                }
            </div>
        </>
    )

}
export default Greener