/* This component renders a predefined list of tips
and tricks from the database, as a reference for the
user.
Parent: WindowViews */

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import DatabaseManager from "../../modules/DatabaseManager"
import { ChevronsLeft } from "react-feather"
import TipCard from "./TipCard"
import "./Tips.css"

const Tips = (props) => {

    const [tips, setTips] = useState([])

    const getTips = () => {
        DatabaseManager.getAll("tips").then((tipsFromAPI => setTips(tipsFromAPI)))
    }

    useEffect(() => {
        getTips()
    }, [])

    return (
        <section className="tips">
            <div className="tips--top">
                <Link to="/" className="log--link">
                    <ChevronsLeft color="#72A83D" strokeWidth={1} size={20}/>
                    Back to Dashboard
                </Link>
            </div>
            <div className="tips--header">
                <h3>Tips and Tricks</h3>
                <p>for a healthier lawn</p>
            </div>
            <div className="tipList">
                {tips.map(tip => <TipCard key={tip.id} tip={tip} /> )}
            </div>
        </section>
    )
}

export default Tips