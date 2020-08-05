/* This component retrieves a random tip from the database
and renders it for display on the Dashboard.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import TipCard from "./TipCard"

const RandomTip = (props) => {

    const [randomTip, setRandomTip] = useState({})

    const getRandomTip = () => {
        DatabaseManager.getRandom("tips")
        .then((tip) => setRandomTip(tip))
    }

    useEffect(() => {
        getRandomTip()
    }, [])

    return (
        <>
            <h3>Latest Log Entry</h3>
            <TipCard key={randomTip.id} tip={randomTip} />
        </>
    )
}

export default RandomTip