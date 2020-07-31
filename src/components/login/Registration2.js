import React from "react"
import States from "../../modules/States"

const Login = props => {

    return (
        <>
           <input type="text" id="address" placeholder="Address" onChange={props.handleFieldChange} />
           <label htmlFor="address">Address</label>
           <input type="text" id="city" placeholder="City" onChange={props.handleFieldChange} />
           <label htmlFor="city">City</label>
           <select id="state" onChange={props.handleFieldChange}>
                <option defaultValue=""></option>
                {States.map(state => {
                    return <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                    </option>
                })}
        </select>
           <input type="text" id="zip" placeholder="00000" onChange={props.handleFieldChange} />
           <label htmlFor="zip">Zip</label>
           <button type="button" onClick={props.toPartThree}>Continue</button>
        </>
    )
}

export default Login