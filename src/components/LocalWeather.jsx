// src/components/LocalWeather.jsx

import React, { useState, useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';

export const LocalWeather = () => {
    const [localData, setLocalData] = useState(null);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const API_KEY = "56608a5f542d57b91786b571e9c481c3";

    useEffect(() => {
        // --- Lógica actualizada para obtener ubicación y clima ---
        const fetchLocalData = async (lat, lon) => {
            try {
                // ---- NUEVO PASO 1: Geocodificación Inversa para obtener el nombre y el estado ----
                const geoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
                const geoResponse = await fetch(geoUrl);
                const geoData = await geoResponse.json();

                if (geoData.length === 0) {
                    throw new Error("No se pudo identificar la ubicación.");
                }

                const { name, country, state } = geoData[0];

                // ---- PASO 2: Obtener el clima como antes ----
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();

                // ---- NUEVO PASO 3: Combinar los datos ----
                const finalData = {
                    ...weatherData,
                    name: name,     // Usamos el nombre de la geocodificación (más preciso)
                    country: country,
                    state: state    // Añadimos el estado
                };

                setLocalData(finalData);
                
            } catch (fetchError) {
                setError("No se pudo obtener el clima local.");
                console.error(fetchError);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchLocalData(latitude, longitude);
                },
                () => {
                    setError("Permiso de ubicación denegado.");
                }
            );
        } else {
            setError("La geolocalización no es compatible con este navegador.");
        }

        // --- La lógica del reloj se mantiene igual ---
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };

    }, []);

    // --- El resto del componente se mantiene casi igual ---
    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('es-ES');
    };

    if (error) {
        return <div className="local-weather-bar error-bar">{error}</div>;
    }

    if (!localData) {
        return <div className="local-weather-bar">Obteniendo tu clima local...</div>;
    }

    return (
        <div className="local-weather-bar">
            <div className="local-weather-info">
                <img
                    src={`https://openweathermap.org/img/wn/${localData.weather[0].icon}.png`}
                    alt="Clima local"
                />
                <span>{Math.round(localData.main.temp)}°C</span>
                <MdLocationOn />
                {/* ---- MODIFICACIÓN FINAL: Mostramos el estado ---- */}
                <span>{localData.name}, {localData.state && `${localData.state}, `}{localData.country}</span>
            </div>
            <div className="local-time-info">
                <span className="current-date">{formatDate(currentTime)}</span>
                <span className="current-time">{formatTime(currentTime)}</span>
            </div>
        </div>
    );
};