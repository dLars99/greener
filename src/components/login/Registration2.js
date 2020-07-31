/* This component registers the second 
user registration page, for the user's
address information.
Parent: Login */

import React from "react"
import States from "../../modules/States"

const Login = props => {

    return (
        <>
            <div className="form--page">            
                <div className="form--row">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Address" onChange={props.handleFieldChange} />
                </div>
                <div className="form--row">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="City" onChange={props.handleFieldChange} />
                </div>

                <div className="form--row">
                    <label htmlFor="state">State</label>
                    <select id="state" onChange={props.handleFieldChange}>
                        <option defaultValue=""></option>
                        {States.map(state => {
                            return <option key={state.abbreviation} value={state.abbreviation}>
                                {state.name}
                            </option>
                        })}
                    </select>
                </div>
                <div className="form--row">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" id="zip" placeholder="00000" onChange={props.handleFieldChange} />
                </div>
                <div className="buttonDiv">
                    <button type="button" onClick={props.toPartThree}>Continue</button>
                </div>
            </div>
        </>
    )
}

export default Login