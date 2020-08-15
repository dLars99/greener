/* This component handles the login and registration
functions for the website. The user must be registered
before accessing any other pages.
Parent: WindowViews.js */

import React, { useState, useEffect } from "react"
import "./Login.css"
import DatabaseManager from "../../modules/DatabaseManager"
import { VerifyUser, VerifyReg1, VerifyReg2, VerifyReg4 } from "../../modules/Validate"
import Registration1 from "./Registration1"
import Registration2 from "./Registration2"
import Registration3 from "./Registration3"
import Registration4 from "./Registration4"
import Registration5 from "./Registration5"
import { FirstSchedule } from "../../modules/FirstSchedule"
import { ArrowRightCircle } from "react-feather"

const Login = props => {

    const [userLogin, setUserLogin] = useState({})
    const [regForm, setRegForm] = useState({One: false, Two: false, Three: false, Four: false, Five: false})
    const [dbUsers, setDbUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const handleFieldChange = (evt) => {
        const stateToChange = {...userLogin}
        stateToChange[evt.target.id] = evt.target.value
        setUserLogin(stateToChange)
    }

    const signIn = evt => {
        evt.preventDefault()
        const loginInfo = {...userLogin}
        const verifiedUser = VerifyUser(loginInfo, dbUsers)
        if (typeof verifiedUser === "string") {
            alert(verifiedUser)
        } else if (typeof verifiedUser === "undefined") {
            alert("No match found. Please check your email and password or register")
        } else {
            props.setUser(verifiedUser)
            props.history.push("/")
        }
    }

    const revealMoreForm = (formSection) => {
        const updateForm = {...regForm}
        updateForm[formSection] = true
        setRegForm(updateForm)
        const element = document.getElementById(`registration${formSection}`)
        element.scrollIntoView({behavior: "smooth"})
    }

    const toPartTwo = () => {
        const verified = VerifyReg1(userLogin, dbUsers)
        if (verified === "") {
            revealMoreForm("Two")
        } else {
            alert(verified)
        }
    }

    const toPartThree = () => {
        const verified = VerifyReg2(userLogin)
        if (verified === "") {
            revealMoreForm("Three")
        } else {
            alert(verified)
        }
    }

    const toPartFour = (phz) => {
        let updatePHZ = {...userLogin, zone: phz}
        setUserLogin(updatePHZ)
        revealMoreForm("Four")
    }

    const toPartFive = () => {
        const verified = VerifyReg4(userLogin)
        if (verified === "") {
            revealMoreForm("Five")
        } else {
            alert(verified)
        }
    }

    const registerNewUser = evt => {
        evt.preventDefault()
        setIsLoading(true)
        const newUser = {
            name: userLogin.name,
            email: userLogin.newEmail,
            password: userLogin.newPassword,
            address: userLogin.address,
            city: userLogin.city,
            state: userLogin.state,
            zip: userLogin.zip,
            zone: userLogin.zone,
            lotSize: userLogin.lotSize
        }
        DatabaseManager.addNew("users", newUser)
        .then((savedUser) => {
            FirstSchedule(savedUser).then(() => {
                console.log("Then")
                props.setUser(savedUser)
                props.history.push("/")})   
        })
    }

    useEffect(() => {
        DatabaseManager.getAll("users")
        .then(usersFromAPI => {
            setDbUsers(usersFromAPI)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
        <main className="front--window">
            <section className="login">
                <h1>Grass is Greener</h1>
                <p className="tagline">Watch it grow!</p>
                <button className="registration--button" type="button" onClick={() => revealMoreForm("One")}>Create New Account</button>
                <form className="login--form" name="login">
                    <div className="login--fields">
                        <input type="email" id="email" autoComplete="username" placeholder="Email" onChange={handleFieldChange} />
                        <input type="password" id="password" autoComplete="password" placeholder="Password" onChange={handleFieldChange} />
                    </div>
                    <div className="login--button">
                        <ArrowRightCircle color="white" strokeWidth={1.5} size={42} fill="#3E7C07" onClick={signIn} />
                    </div>
                </form>
            </section>
        <form className="registration--form" name="registration">
            <div className="registration" id="registrationOne">
                {regForm.One ?
                    <Registration1 dbUsers={dbUsers} handleFieldChange={handleFieldChange} toPartTwo={toPartTwo} />
                : null}
            </div>
            <div className="registration" id="registrationTwo">
                {regForm.Two ?
                    <Registration2 handleFieldChange={handleFieldChange} toPartThree={toPartThree} />
                : null}
            </div>
            <div className="registration" id="registrationThree">
                {regForm.Three ?
                    <Registration3 revealMoreForm={revealMoreForm} toPartFour={toPartFour} zip={userLogin.zip} />
                : null}
            </div>
            <div className="registration" id="registrationFour">
                {regForm.Four ?
                    <Registration4 handleFieldChange={handleFieldChange} toPartFive={toPartFive} />
                : null}
            </div>
            <div className="registration" id="registrationFive">
                {regForm.Five ?
                <>
                    <Registration5 userLogin={userLogin} registerNewUser={registerNewUser} />
                    <button className="registration--button registration--submit" type="button" disabled={isLoading} onClick={registerNewUser}>Finish</button>
                </>
                : null}
            </div>

        </form>

        </main>
        </>
    )
}

export default Login