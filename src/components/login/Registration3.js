import React, { useState, useEffect } from "react"
import ClimateManager from "../../modules/ClimateManager"

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
                <button type="button" onClick={() => props.toPartFour(phz.zone)}>Continue</button>
            </div>
        </>
    )
}

export default Login