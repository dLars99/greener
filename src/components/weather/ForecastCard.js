/* This component renders each individual
day's forecast inside the Forecast component.
Parent: Forecast */

import React from "react"

const ForecastCard = (props) => {

    return (
        <div className="forecast--card">
            {Object.keys(props.weather).length !== 0
            ? <>
                <h3 className="forecast--date">{props.weather.date.substring(5)}</h3>
                <div className="forecast--stats">
                    <div className="forecast--icon">
                        <img src={`${props.weather.day.condition.icon}`} alt={props.weather.day.condition.text} />
                    </div>
                    <div className="forecast--temp">
                        <h3>Hi {parseInt(props.weather.day.maxtemp_f)}&#176;</h3>
                        <h3>Lo {parseInt(props.weather.day.mintemp_f)}&#176;</h3>
                    </div>
                </div>
                <div className="forecast--condition">
                    <h4>{props.weather.day.condition.text}</h4>
                </div>
                <div className="forecast--health">
                    <p>Rain chance: {parseInt(props.weather.day.daily_chance_of_rain)}%</p>
                    <p>UV Index: {props.weather.day.uv}</p>
                </div>
                <div className="forecast--sun">
                    <p>Sunrise {props.weather.astro.sunrise}</p>
                    <p>Sunset {props.weather.astro.sunset}</p>
                </div>
            </>
            : <p>Loading Current Weather</p>
            }        
        </div>
    )

}

export default ForecastCard