import React, {useState, useEffect, useContext} from 'react';
import './ForecastTab.css';
import axios from 'axios';
import kelvinToCelsius from "../../helpers/kelvinToCelsius";
import createDateString from "../../helpers/createDateString";
import { TempContext } from "../../context/TempProvider";



// const apiKey = '930a9b8f2616c3af1d16483406fd32b4'

function ForecastTab({ coordinates }) {
    const [forecasts, setForecasts] = useState([]);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const { kelvinToMetric } = useContext(TempContext);

    useEffect(() => {
        async function fetchData() {
            toggleError(false);
            toggleLoading(true);
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
                // zorg dat je eerst de juiste data logt, dus dat je weet waar welke data staat in het object.
                setForecasts(result.data.daily.slice(1, 6));
                console.log(forecasts);
            } catch(e) {
                console.error(e);
                toggleError(true);
            }
            toggleLoading(false);
        };
        if (coordinates) {
            fetchData();
        }
    }, [coordinates]);

    return (
        <div className="tab-wrapper">
            {forecasts.length === 0 && !error &&
                <span className="no-forecast">Zoek eerst een locatie om het weer voor deze week te bekijken</span>
            }
            {loading && <span>Loading...</span>}
            {error && <span>Er is iets misgegaan met het ophalen van de data</span>}
        {forecasts && forecasts.map((day) => {
            return (
                <article className="forecast-day" key={day.dt}>
                    <p className="day-description">
                        {createDateString(day.dt)}
                    </p>

                    <section className="forecast-weather">
                        <span>
                            {kelvinToMetric(day.temp.day)}
                        </span>
                        <span className="weather-description">
                            {/*{day.weather[0].description}*/}
                        </span>
                    </section>
                </article>

            )
            })}
        </div>
        //     <article className="forecast-day">
        //         <p className="day-description">
        //             Maandag
        //         </p>
        //
        //         <section className="forecast-weather">
        //     <span>
        //       12&deg; C
        //     </span>
        //             <span className="weather-description">
        //       Licht Bewolkt
        //     </span>
        //         </section>
        //     </article>
        //
        //     <article className="forecast-day">
        //         <p className="day-description">
        //             Maandag
        //         </p>
        //
        //         <section className="forecast-weather">
        //     <span>
        //       12&deg; C
        //     </span>
        //             <span className="weather-description">
        //       Licht Bewolkt
        //     </span>
        //         </section>
        //     </article>
        //
        //     <article className="forecast-day">
        //         <p className="day-description">
        //             Maandag
        //         </p>
        //
        //         <section className="forecast-weather">
        //     <span>
        //       12&deg; C
        //     </span>
        //             <span className="weather-description">
        //       Licht Bewolkt
        //     </span>
        //         </section>
        //     </article>
        //
        //     <article className="forecast-day">
        //         <p className="day-description">
        //             Maandag
        //         </p>
        //
        //         <section className="forecast-weather">
        //     <span>
        //       12&deg; C
        //     </span>
        //             <span className="weather-description">
        //       Licht Bewolkt
        //     </span>
        //         </section>
        //     </article>
        //
        //     <article className="forecast-day">
        //         <p className="day-description">
        //             Maandag
        //         </p>
        //
        //         <section className="forecast-weather">
        //     <span>
        //       12&deg; C
        //     </span>
        //             <span className="weather-description">
        //       Licht Bewolkt
        //     </span>
        //         </section>
        //     </article>
    );
};

export default ForecastTab;
