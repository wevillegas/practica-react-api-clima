// 1. Leemos la clave de API desde las variables de entorno
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const GEO_URL = "https://api.openweathermap.org/geo/1.0";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Obtiene todos los datos del clima para una ciudad específica por su nombre.
 * Combina geocodificación, clima actual e índice UV.
 */
export const getWeatherByCity = async (city) => {
    // Geocodificación para obtener coordenadas y estado/provincia
    const geoResponse = await fetch(`${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`);
    const geoData = await geoResponse.json();
    if (geoData.length === 0) throw new Error('Ciudad no encontrada.');
    const { lat, lon, name, country, state } = geoData[0];

    // Usamos Promise.all para hacer las llamadas de clima y UV en paralelo (más eficiente)
    const [weatherResponse, uvResponse] = await Promise.all([
        fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`),
        fetch(`${WEATHER_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    ]);
    const weatherData = await weatherResponse.json();
    const uvData = await uvResponse.json();

    // Combinamos y devolvemos toda la información
    return { ...weatherData, name, country, state, uvi: uvData.value };
};

/**
 * Obtiene todos los datos del clima para unas coordenadas específicas (latitud, longitud).
 * Usado para el clima local del usuario.
 */
export const getWeatherByCoords = async (lat, lon) => {
    // Geocodificación Inversa para obtener nombre y estado
    const geoResponse = await fetch(`${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
    const geoData = await geoResponse.json();
    if (geoData.length === 0) throw new Error('Ubicación no encontrada.');
    const { name, country, state } = geoData[0];

    // Clima
    const weatherResponse = await fetch(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
    const weatherData = await weatherResponse.json();

    // Combinamos y devolvemos la información
    return { ...weatherData, name, country, state };
};