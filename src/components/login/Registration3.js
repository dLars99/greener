/* This component registers the third 
user registration page, using the phzmap API to
pull the user's USDA Plant Hardiness Zone by zip code.
Parent: Login */

import React, { useState, useEffect } from "react"
import ClimateManager from "../../modules/ClimateManager"
import { ArrowDownCircle } from "react-feather"

const Login = props => {

    const [phz, setPhz] = useState([""])

    useEffect(() => {
        ClimateManager.getClimateZone(props.zip)
        .then((climateResponse) => setPhz(climateResponse))
    }, [props.zip])

    return (
        <>
            <div className="form--page">
                {phz.zone
                ? <>
                    <p>Your plant hardiness zone is:</p>
                    <p className="phz">{phz.zone}</p>
                </>
                : <>
                    <p>We're sorry.</p>
                    <p>We could not find the plant hardiness zone for your zip code.</p>
                </> }
                <div className="buttonDiv">
                    <ArrowDownCircle color="white" strokeWidth={1.5} size={36} onClick={() => props.toPartFour(phz.zone)} />
                </div>
            </div>
        </>
    )
}

export default Login