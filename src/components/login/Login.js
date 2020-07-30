import React from "react"
import "./Login.css"
import Registration1 from "./Registration1"
import Registration2 from "./Registration2"
import Registration3 from "./Registration3"
import Registration4 from "./Registration4"
import Registration5 from "./Registration5"



const Login = props => {
    const beginRegistration = () => {
        const element = document.getElementById("registration1")
        element.scrollIntoView({behavior: "smooth"})
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
                <Registration1 />
            </section>
            <section id="registration2">
                <Registration2 />
            </section>
            <section id="registration3">
                <Registration3 />
            </section>
            {/* <section id="registration4">
                <Registration4 />
            </section>
            <section id="registration5">
                <Registration5 />
            </section> */}

        </form>

        </main>
        </>
    )
}

export default Login