/* This component retrieves a random tip from the database
and renders it for display on the Dashboard.
Parent: Dashboard */

import React, { useState, useEffect } from "react"
import DatabaseManager from "../../modules/DatabaseManager"
import TipCard from "./TipCard"
import { ChevronRight } from "react-feather"

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
            <h3>Random Tip</h3>
            <TipCard key={randomTip.id} tip={randomTip} />
            <div className="dashboard--viewMore">
                View all tips and tricks
                <ChevronRight color="#72A83D" strokeWidth={1} size={20}/>
            </div>
        </>
    )
}

export default RandomTip