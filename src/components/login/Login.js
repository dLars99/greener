import React, { useState, useEffect } from "react"
import "./Login.css"
import DatabaseManager from "../../modules/DatabaseManager"
import { VerifyUser } from "../../modules/Validate"
import Registration1 from "./Registration1"
import Registration2 from "./Registration2"
import Registration3 from "./Registration3"
import Registration4 from "./Registration4"
import Registration5 from "./Registration5"

const Login = props => {

    const [userLogin, setUserLogin] = useState({email: "", password: ""})
    // const [newUser, setNewUser] = useState({name: "", email: "", password: "", address: "", city: "", state: "", zip: "", zone: "", lawnSize: -1})
    const [regForm, setRegForm] = useState({one: false, two: false, three: false, four: false, five: false})
    const [dbUsers, setDbUsers] = useState([])

    const handleFieldChange = (evt) => {
        const stateToChange = {...userLogin}
        stateToChange[evt.target.id] = evt.target.value
        setUserLogin(stateToChange)
    }

    const signIn = evt => {
        evt.preventDefault()
        const loginInfo = {...userLogin}
        const verifiedUser = VerifyUser(loginInfo, dbUsers)
        console.log(typeof verifiedUser)
        if (typeof verifiedUser === "string") {
            alert(verifiedUser)
        } else if (typeof verifiedUser === "undefined") {
            alert("No match found. Please check your email and password or register")
        } else {
            console.log(verifiedUser)
            props.setUser(verifiedUser)
            props.history.push("/")
        }
    }

    const beginRegistration = () => {
        const updateForm = {...regForm}
        updateForm.one = true
        setRegForm(updateForm)
        const element = document.getElementById("registration1")
        element.scrollIntoView({behavior: "smooth"})
    }

    const registerNewUser = () => {
        console.log("Tada!!!")
    }

    useEffect(() => {
        DatabaseManager.getAll("users")
        .then(usersFromAPI => setDbUsers(usersFromAPI))
    }, [])

    return (
        <>
        <main className="front--window">

        <section className="login">
            <h1>Grass is<br/>
                Greener</h1>
            <button type="button" onClick={beginRegistration}>Create New Account</button>
            <form className="login--form" name="login">
                <div className="login--fields">
                    <input type="email" id="email" autoComplete="username" placeholder="Email" onChange={handleFieldChange} />
                    <input type="password" id="password" autoComplete="password" placeholder="Password" onChange={handleFieldChange} />
                </div>
                <button type="button" name="login" onClick={signIn}>-&gt;</button>
            </form>
        </section>
        <form name="registration">
            <section id="registration1">
                {regForm.one ?
                    <Registration1 />
                : null}
            </section>
            <section id="registration2">
                {regForm.two ?
                    <Registration2 />
                : null}
            </section>
            <section id="registration3">
                {regForm.three ?
                    <Registration3 />
                : null}
            </section>
            <section id="registration4">
                {regForm.four ?
                    <Registration4 />
                : null}
            </section>
            <section id="registration5">
                {regForm.five ?
                    <Registration5 registerNewUser={registerNewUser} />
                : null}
            </section>

        </form>

        </main>
        </>
    )
}

export default Login