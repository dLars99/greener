import React from "react"

const Login = props => {

    return (
        <>
           <h4>Almost done!</h4>
           <label htmlFor="lotSize">Please enter the size of your lawn in square feet</label>
           <input type="text" id="lotSize" onChange={props.handleFieldChange} />

           <p>Not sure about your lawn size? Here's one way to estimate it:</p>
           <ol>
               <li>Open <a href="https://earth.google.com" target="_blank" rel="noopener noreferrer">Google Earth</a> and launch it.</li>
               <li>Use the search to find your address.</li>
               <li>Click on the ruler icon to "Measure distance and area."</li>
               <li>Click points at corners to outline your yard, making sure to finish by clicking the first point you added.</li>
               <li>Google Earth will give you the area. <strong>Default is in square meters.</strong> Make sure to change it to square feet.</li>
               <li>Type the number you get into the box above. That's all!</li>
           </ol>
           <button type="button" onClick={props.toPartFive}>Continue</button>
        </>
    )
}

export default Login