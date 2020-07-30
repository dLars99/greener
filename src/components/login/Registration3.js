import React, { useState, useEffect } from "react"
import States from "../../modules/States"
import ClimateManager from "../../modules/ClimateManager"

const Login = props => {

    const [phz, setPhz] = useState([""])

    // Temporary
    const zip="37211"

    useEffect(() => {
        ClimateManager.getClimateZone(zip)
        .then((climateResponse) => setPhz(climateResponse))
    }, [])

    const toPartFour = () => {
        const element = document.getElementById("registration4")
        element.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
           <p>Your plant hardiness zone is:</p>
           <p className="phz">{phz.zone}</p>
           <button type="button" onClick={toPartFour}>Continue</button>
        </>
    )
}

export default Login