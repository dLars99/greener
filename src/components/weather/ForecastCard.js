/* This component renders each individual
day's forecast inside the Forecast component.
Parent: Forecast */

import React from "react"

const ForecastCard = (props) => {

    return (
        <div className="forecast--card">
            {Object.keys(props.weather).length !== 0
            ? <>
                <h3>Date</h3>
                <div className="forecast--stats">
                    <div className="forecast--desc">
                        <div className="forecast--icon">
                            <img src={`${props.weather.weather_icons}`} alt={props.weather.weather_descriptions} />
                        </div>
                        <h4>{props.weather.weather_descriptions}</h4>
                    </div>
                    <div className="forecast--temp">
                        <h3>{props.weather.hi}&#176;</h3>
                        <h3>{props.weather.lo}&#176;</h3>
                        <p>Feels like {props.weather.feelslike}&#176;</p>
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