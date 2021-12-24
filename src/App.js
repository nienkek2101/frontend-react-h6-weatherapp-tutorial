import React, {useState, useEffect, useContext} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import axios from 'axios';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import TodayTab from "./pages/todayTab/TodayTab";
import kelvinToCelsius from "./helpers/kelvinToCelsius";
import { TempContext } from "./context/TempProvider";



// const apiKey = '930a9b8f2616c3af1d16483406fd32b4'

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState('');
  const [error, toggleError] = useState(false);
  const { kelvinToMetric } = useContext(TempContext);

  useEffect(() => {
    // 1. we definiëren de functie

    async function fetchData() {
      toggleError(false);
      try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
        console.log(result.data);
        console.log(result.data.name);
        console.log(result.data.weather[0].description);
        console.log(result.data.main);
        console.log(result.data.main.temp);
        setWeatherData(result.data);

      } catch (e) {
        // de error wordt weergegeven in de console
        console.error(e);
        toggleError(true);
        setWeatherData('');
      }
    };
    // 2. we roepen de functie aan (als location is veranderd, maar niet als het een null/undefined/lege string is)
    if (location) {
      fetchData();
    }

    // 3. code wordt alleen afgevuurd als location veranderd
  }, [location]);

  return (
      <>
        <div className="weather-container">

          {/*HEADER -------------------- */}
          <div className="weather-header">
            <SearchBar setLocationHandler={setLocation}/>
            {error &&
            <span className="wrong-location-error">
                Oeps! Deze locatie bestaat niet
              </span>
            }

            <span className="location-details">
                {Object.keys(weatherData).length > 0 &&
                <>
                  <h2>{weatherData.weather[0].decription}</h2>
                  <h3>{weatherData.name}</h3>
                  <h1>{kelvinToMetric(weatherData.main.temp)}</h1>
                </>
                }
              {/*<button*/}
              {/*    type="button"*/}
              {/*    onClick={fetchData}*/}
              {/*>*/}
              {/*Haal data op!*/}
              {/*</button>*/}
            </span>
          </div>

          {/*CONTENT ------------------ */}
          <Router>
          <div className="weather-content">
            <TabBarMenu/>

            <div className="tab-wrapper">

                <Switch>
                  <Route path="/komende-week">
                    <ForecastTab coordinates={weatherData.coord}/>
                  </Route>
                  <Route path="/" exact>
                    <TodayTab coordinates={weatherData.coord}/>
                  </Route>
                </Switch>

            </div>
          </div>
          </Router>

          <MetricSlider/>
        </div>
      </>
  );
}

export default App;
