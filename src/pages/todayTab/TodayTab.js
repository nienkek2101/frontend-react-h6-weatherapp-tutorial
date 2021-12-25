import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from 'axios';
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

// const apiKey = '930a9b8f2616c3af1d16483406fd32b4';

function TodayTab({ coordinates }) {
	const [ weatherToday, setWeatherToday ] = useState({});
	const [error, toggleError] = useState(false);
	const [loading, toggleLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			toggleError(false);
			toggleLoading(true);
			try {
				const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${process.env.REACT_APP_API_KEY}`)
				setWeatherToday([
					result.data.hourly[3],
					result.data.hourly[5],
					result.data.hourly[7],
				]);
				console.log(result.data);
				console.log(weatherToday.length);
				console.log(result.data.hourly[0].weather[0].description);
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

	return(
		<div className="tab-wrapper">
			{!coordinates && !error &&
			<span className="no-forecast">Zoek eerst een locatie om het weer voor vandaag te bekijken</span>
			}
			<div className="chart">
				{Object.keys(weatherToday).length > 0 && weatherToday.map((weather) => {
					return <WeatherDetail
						key={weather.dt}
						temp={weather.temp}
						type={weather.weather[0].main}
						description={weather.weather[0].description}
						/>
				})}
			</div>
			<div className="legend">
				{Object.keys(weatherToday).length > 0 && weatherToday.map((weather) => {
					return <span key={`${weather.dt}-timestamp`}>{createTimeString(weather.dt)}</span>
				})}
			</div>
			{error && <span>Het ophalen van de voorspellingen is mislukt. Probeer het opnieuw</span>}
			{loading && <span>Loading...</span>}

		</div>
  );
};

export default TodayTab;
