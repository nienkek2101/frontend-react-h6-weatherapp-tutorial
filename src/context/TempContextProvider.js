import React, { createContext, useState } from "react";
import kelvinToCelsius from "../helpers/kelvinToCelsius";
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";

export const TempContext = createContext(null);

function TempContextProvider({ children }) {
    // hier komt straks de state waarin de context-data plaatsen
    const [ selectedMetric, toggleSelectedMetric ] = useState('celcius');
    // console.log(selectedMetric);


    function toggleTemp() {
        if (selectedMetric === 'celcius') {
            toggleSelectedMetric('fahrenheit');
        } else {
            toggleSelectedMetric('celcius');
        }
    }

    function kelvinToMetric(kelvin) {
        if (selectedMetric === 'celcius') {
            return kelvinToCelsius(kelvin);
        } else {
            return kelvinToFahrenheit(kelvin);
        }
    }

    const data = {
        toggleTemp: toggleTemp,
        kelvinToMetric: kelvinToMetric,
        // kelvinToMetric: selectedMetric === 'celcius' ? kelvinToCelsius : kelvinToFahrenheit,
    }

    return (
        <TempContext.Provider
            value={data}>
            {/*hier komt het component waar we onze eigen provider omheen wikkelen*/}
            {children}
        </TempContext.Provider>
    )
}

export default TempContextProvider;