// src/WeatherApp.jsx

import React, { useCallback, useMemo } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import ReactAnimatedWeather from 'react-animated-weather';

import { useClima } from "./hooks/useClima";
import { Buscador } from './components/Buscador';
import { ClimaResultado } from './components/ClimaResultado';

import './styles/weatherStyles.css';
import { rainOptions, snowOptions, clearOptions, cloudsOptions, defaultOptions } from './particles-config';

// Mapeo de condiciones climáticas a los iconos de la animación
const weatherIconMapping = {
  'Thunderstorm': 'RAIN',
  'Drizzle': 'RAIN',
  'Rain': 'RAIN',
  'Snow': 'SNOW',
  'Clear': 'CLEAR_DAY',
  'Clouds': 'CLOUDY',
  'Mist': 'FOG',
  'Smoke': 'FOG',
  'Haze': 'FOG',
  'Dust': 'FOG',
  'Fog': 'FOG',
  'Sand': 'FOG',
  'Ash': 'FOG',
  'Squall': 'WIND',
  'Tornado': 'WIND'
};

export const WeatherApp = () => {
  const { ciudad, setCiudad, dataClima, loading, error, fetchClima } = useClima();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useMemo(() => {
    if (!dataClima) return defaultOptions;
    // CORRECCIÓN: Leemos desde dataClima.weather[0].main
    const weatherMain = dataClima.weather[0].main;
    switch (weatherMain) {
      case 'Rain': case 'Drizzle': case 'Thunderstorm': return rainOptions;
      case 'Snow': return snowOptions;
      case 'Clear': return clearOptions;
      case 'Clouds': return cloudsOptions;
      default: return defaultOptions;
    }
  }, [dataClima]);

  const animatedIcon = useMemo(() => {
    if (!dataClima) return 'CLEAR_DAY'; // Icono por defecto
    // CORRECCIÓN: Misma corrección aquí
    const weatherMain = dataClima.weather[0].main;
    return weatherIconMapping[weatherMain] || 'CLEAR_DAY';
  }, [dataClima]);

  return (
    <div className="app-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />

      {dataClima && (
        <div className="weather-animation-container">
          <ReactAnimatedWeather
            icon={animatedIcon}
            color={'white'}
            size={80}
            animate={true}
          />
        </div>
      )}

      <div className="content-wrapper">
        <Buscador
          ciudad={ciudad}
          setCiudad={setCiudad}
          onBuscar={fetchClima}
          loading={loading}
        />
        <ClimaResultado data={dataClima} error={error} />
      </div>
    </div>
  );
};