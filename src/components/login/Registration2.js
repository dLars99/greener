import React from "react"
import States from "../../modules/States"

const Login = props => {
    const toPartThree = () => {
        const element = document.getElementById("registration3")
        element.scrollIntoView({behavior: "smooth"})
    }

    return (
        <>
           <input type="text" id="RegisterAddress" placeholder="Address" />
           <label htmlFor="registerAddress">Address</label>
           <select id="state">
                {States.map(state => {
                    return <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                    </option>
                })}
        </select>
           <input type="text" id="RegisterZip" placeholder="00000" />
           <label htmlFor="registerZip">Zip</label>
           <button type="button" onClick={toPartThree}>Continue</button>
        </>
    )
}

export default Login