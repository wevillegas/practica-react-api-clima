// src/hooks/useClima.js

import { useState } from "react";

export function useClima() {
    const API_KEY = "56608a5f542d57b91786b571e9c481c3"; // Tu API Key
    const urlBaseGeocoding = "https://api.openweathermap.org/geo/1.0/direct";
    const urlBaseWeather = "https://api.openweathermap.org/data/2.5/weather";
    const urlBaseUv = "https://api.openweathermap.org/data/2.5/uvi";

    const [ciudad, setCiudad] = useState("");
    const [dataClima, setDataClima] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchClima = async () => {
        setLoading(true);
        setError(null);
        setDataClima(null);
        
        try {
            const geoResponse = await fetch(`${urlBaseGeocoding}?q=${ciudad}&limit=1&appid=${API_KEY}`);
            const geoData = await geoResponse.json();

            if (geoData.length === 0) {
                throw new Error('Ciudad no encontrada. Por favor, intenta de nuevo.');
            }

            // ---- MODIFICACIÓN 1: Extraemos "state" ----
            const { lat, lon, name, country, state } = geoData[0];

            const weatherResponse = await fetch(`${urlBaseWeather}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
            const weatherData = await weatherResponse.json();

            const uvResponse = await fetch(`${urlBaseUv}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const uvData = await uvResponse.json();

            const finalData = {
                ...weatherData,
                name: name,
                country: country,
                // ---- MODIFICACIÓN 2: Añadimos "state" al objeto final ----
                state: state, 
                uvi: uvData.value 
            };
            
            setDataClima(finalData);

        } catch (error) {
            setError(error.message);
            console.error(`Ocurrió un problema: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        ciudad,
        setCiudad,
        dataClima,
        loading,
        error,
        fetchClima
    };
}