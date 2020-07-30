import React, { useState, useEffect } from "react"
import "./Login.css"
import { VerifySignon } from "../../modules/Validate"
import Registration1 from "./Registration1"
import Registration2 from "./Registration2"
import Registration3 from "./Registration3"
import Registration4 from "./Registration4"
import Registration5 from "./Registration5"


const Login = props => {

    const [userLogin, setUserLogin] = useState({email: "", password: ""})
    const [newUser, setNewUser] = useState({name: "", email: "", password: "", address: "", city: "", state: "", zip: "", zone: "", lawnSize: -1})
    const [regForm1, setRegForm1] = useState(false)  
    const [regForm2, setRegForm2] = useState(false)  
    const [regForm3, setRegForm3] = useState(false)  
    const [regForm4, setRegForm4] = useState(false)  
    const [regForm5, setRegForm5] = useState(false)  

    const handleLoginChange = (evt) => {
        const stateToChange = {...userLogin}
        stateToChange[evt.target.id] = evt.target.value
        setUserLogin(stateToChange)
    }

    const signIn = () => {

    }

    const beginRegistration = () => {
        setRegForm1(true)
        const element = document.getElementById("registration1")
        element.scrollIntoView({behavior: "smooth"})
    }

    const registerNewUser = () => {
        console.log("Tada!!!")
    }

    return (
        <>
        <main className="front--window">

        <section className="login">
            <h1>Grass is<br/>
                Greener</h1>
            <button type="button" onClick={beginRegistration}>Create New Account</button>
            <form className="login--form" name="login">
                <div className="login--fields">
                    <input type="email" id="loginEmail" autoComplete="username" placeholder="Email"/>
                    <input type="password" id="loginPassword" autoComplete="password" placeholder="Password" />
                </div>
                <button type="button" name="login">-&gt;</button>
            </form>
        </section>
        <form name="registration">
            <section id="registration1">
                {regForm1 ?
                    <Registration1 />
                : null}
            </section>
            <section id="registration2">
                {regForm2 ?
                    <Registration2 />
                : null}
            </section>
            <section id="registration3">
                {regForm3 ?
                    <Registration3 />
                : null}
            </section>
            <section id="registration4">
                {regForm4 ?
                    <Registration4 />
                : null}
            </section>
            <section id="registration5">
                {regForm5 ?
                    <Registration5 registerNewUser={registerNewUser} />
                : null}
            </section>

        </form>

        </main>
        </>
    )
}

export default Login