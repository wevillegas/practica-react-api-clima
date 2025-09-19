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
            // 1. Obtener coordenadas (lat, lon)
            const geoResponse = await fetch(`${urlBaseGeocoding}?q=${ciudad}&limit=1&appid=${API_KEY}`);
            const geoData = await geoResponse.json();

            if (geoData.length === 0) {
                throw new Error('Ciudad no encontrada. Por favor, intenta de nuevo.');
            }

            const { lat, lon, name, country } = geoData[0];

            // 2. Obtener los datos principales del clima con el endpoint /weather
            const weatherResponse = await fetch(`${urlBaseWeather}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
            const weatherData = await weatherResponse.json();

            // 3. Obtener el índice UV con el endpoint /uvi
            const uvResponse = await fetch(`${urlBaseUv}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const uvData = await uvResponse.json();

            // 4. Combinar toda la información en un solo objeto
            const finalData = {
                ...weatherData,
                name: name,
                country: country,
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