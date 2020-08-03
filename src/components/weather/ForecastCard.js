/* This component renders each individual
day's forecast inside the Forecast component.
Parent: Forecast */

import React from "react"

const ForecastCard = (props) => {

    return (
        <div className="forecast--card">
            {Object.keys(props.weather).length !== 0
            ? <>
                <h3>{props.weather.date}</h3>
                <div className="forecast--stats">
                    <div className="forecast--desc">
                        <div className="forecast--icon">
                            <img src={`${props.weather.day.condition.icon}`} alt={props.weather.day.condition.text} />
                        </div>
                        <h4>{props.weather.day.condition.text}</h4>
                    </div>
                    <div className="forecast--temp">
                        <h3>{parseInt(props.weather.day.maxtemp_f)}&#176;</h3>
                        <h3>{parseInt(props.weather.day.mintemp_f)}&#176;</h3>
                    </div>
                </div>
                <div className="forecast--health">
                    Percent change
                    UV
                </div>
                <div className="forecast--sun">
                    Sunrise
                    Sunset
                </div>
            </>
            : <p>Loading Current Weather</p>
            }        
        </div>
    )

}

export default ForecastCard