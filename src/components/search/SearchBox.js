/* This component renders the filter options for the main
log page, and returns the user-selected search components
to the task log.
Parent: TaskLog */

import React from "react"

const SearchBox = props => {

    return (
        <>
        <h4>Filter by Activity</h4>
        <div className="search--activities">    
            {props.activities ? props.activities.map(activity => {
                return <div className="search--checkbox" key={activity.id}>
                <input type="checkbox" id="activity" 
                name={activity.name} value={activity.id} checked={activity.checked}
                onChange={props.filterEntries} />
                <label htmlFor={activity.name}>{activity.name}</label>
            </div>
            })
            : null}
        </div>
        <div className="search--bottom">
            <div className="search--date">
                <label htmlFor="date">Search by Date</label>
                <input type="date" id="date" onChange={props.filterEntries}/>
            </div>
            <div className="search--clear" onClick={props.clearSearch}>Clear All Filters</div>
        </div>
        </>
    )
}

export default SearchBox