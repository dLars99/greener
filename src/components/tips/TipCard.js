/* This component renders individual tips from the tip
list to the DOM.
Parent: Tips */

import React from "react"

const TipCard = (props) => {

    return (
        <div className="tipCard">
            <p>{props.tip.description}</p>
        </div>
    )
}

export default TipCard