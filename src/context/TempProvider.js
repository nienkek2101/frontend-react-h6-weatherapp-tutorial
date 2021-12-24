import React, { createContext, useState } from "react";
import kelvinToCelsius from "../helpers/kelvinToCelsius";
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";

export const TempContext = createContext(null);

function TempContextProvider({ children }) {
    // hier komt straks de state waarin de context-data plaatsen
    const [ selectedMetric, toggleSelectedMetric ] = useState('celcius')

    function toggleTemp() {
        if (selectedMetric === 'celcius') {
            toggleSelectedMetric('fahrenheit');
        } else {
            toggleSelectedMetric('celcius');
        }
    }

    return (
        <TempContext.Provider value={{
            toggleTemp: toggleTemp,
            kelvinToMetric: selectedMetric === 'celsius' ? kelvinToCelsius : kelvinToFahrenheit,
        }}>
            {/*hier komt het component waar we onze eigen provider omheen wikkelen*/}
            {children}
        </TempContext.Provider>
    )
}

export default TempContextProvider;