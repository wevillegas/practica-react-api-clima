// src/components/ClimaResultado.jsx

import React from 'react';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { BsEye, BsSun } from 'react-icons/bs';

const getLocalTime = (timezoneOffset) => {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utcTime + (timezoneOffset * 1000));
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const ClimaResultado = ({ data, error }) => {
    if (error) {
        return <div className="weather-box result-box error-message">{error}</div>;
    }

    if (!data) {
        return (
            <div className="weather-box result-box">
                <p>Ingresa una ciudad para ver el clima.</p>
            </div>
        );
    }

    // ---- MODIFICACIÓN 3: Extraemos "state" de los props ----
    const { name, country, state, main, visibility, weather, wind, timezone, uvi } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    return (
        <div className="weather-box result-box">
            <div className="main-info">
                <h2>
                    {/* ---- MODIFICACIÓN 4: Mostramos el estado si existe ---- */}
                    {name}, {state && `${state}, `}{country}
                    <img
                        src={`https://flagcdn.com/w40/${country.toLowerCase()}.png`}
                        alt={`Bandera de ${country}`}
                        className="country-flag"
                    />
                </h2>
                <p className="local-time">Hora Local: {getLocalTime(timezone)}</p>
                <p className="temperature">{Math.round(temp)}°C</p>
                <div className="weather-condition">
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt="Icono del clima"
                    />
                    <p>{description}</p>
                </div>
            </div>

            <div className="details-grid">
                <div className="detail-item">
                    <WiStrongWind className="detail-icon" />
                    <div className="detail-text">
                        <strong>Viento</strong>
                        <p>{(wind.speed * 3.6).toFixed(1)} km/h</p>
                    </div>
                </div>
                <div className="detail-item">
                    <WiHumidity className="detail-icon" />
                    <div className="detail-text">
                        <strong>Humedad</strong>
                        <p>{humidity}%</p>
                    </div>
                </div>
                <div className="detail-item">
                    <BsEye className="detail-icon" />
                    <div className="detail-text">
                        <strong>Visibilidad</strong>
                        <p>{(visibility / 1000).toFixed(1)} km</p>
                    </div>
                </div>
                <div className="detail-item">
                    <BsSun className="detail-icon" />
                    <div className="detail-text">
                        <strong>Índice UV</strong>
                        <p>{uvi.toFixed(1)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};