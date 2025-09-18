// Ruta: src/WeatherApp.jsx

import React, { useCallback, useMemo } from 'react'; // Eliminamos useState y useEffect que ya no se usan para esto
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Carga la versión ligera del motor
import { useClima } from "./hooks/useClima";
import './styles/weatherStyles.css';

// Importamos todas nuestras configuraciones (esto no cambia)
import { rainOptions, snowOptions, clearOptions, cloudsOptions, defaultOptions } from './particles-config';

export const WeatherApp = () => {
  const { ciudad, setCiudad, dataClima, loading, error, fetchClima } = useClima();
  const difKelvin = 273.15;

  // NUEVO: Esta es la forma correcta y más simple de inicializar el motor.
  // Usamos useCallback para que esta función no se recree en cada render, optimizando el rendimiento.
  const particlesInit = useCallback(async (engine) => {
    // Aquí le decimos a tsParticles que cargue el preset "slim"
    await loadSlim(engine);
  }, []);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.trim().length > 0) fetchClima();
  };

  // Esto se queda igual. Sigue siendo la forma óptima de elegir las opciones.
  const particlesOptions = useMemo(() => {
    if (!dataClima) return defaultOptions;

    const weatherMain = dataClima.weather[0].main;
    switch (weatherMain) {
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        return rainOptions;
      case 'Snow':
        return snowOptions;
      case 'Clear':
        return clearOptions;
      case 'Clouds':
        return cloudsOptions;
      default:
        return defaultOptions;
    }
  }, [dataClima]);


  return (
    <div className="app-container">
      {/* CORREGIDO: Pasamos la función 'particlesInit' a la prop 'init' del componente */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />

      <div className="weather-box">
        <h1>Buscador de Clima</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad}
            placeholder="Escribe una ciudad"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        
        {dataClima && (
          <div className="weather-info">
            <h2>
              {dataClima.name}, {dataClima.sys.country}
              <img
                src={`https://flagcdn.com/w40/${dataClima.sys.country.toLowerCase()}.png`}
                alt={`Bandera de ${dataClima.sys.country}`}
                className="country-flag"
              />
            </h2>
            <p className="temperature">
              {Math.round(dataClima.main?.temp - difKelvin)}°C
            </p>
            <div className="weather-condition">
              <img
                src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
                alt="Icono del clima"
              />
              <p>{dataClima.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};