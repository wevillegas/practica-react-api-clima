import { useState } from "react";

export function useClima() {
    const urlBase = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "56608a5f542d57b91786b571e9c481c3"; // Considera mover esto a un archivo .env

    const [ciudad, setCiudad] = useState("");
    const [dataClima, setDataClima] = useState(null);
    const [loading, setLoading] = useState(false); // Estado para la pantalla de carga
    const [error, setError] = useState(null);     // Estado para manejar errores

    const fetchClima = async () => {
        setLoading(true); // Inicia la carga
        setError(null);   // Limpia errores anteriores
        setDataClima(null); // Limpia datos anteriores al buscar de nuevo
        try {
            // Se añade &lang=es para que la descripción del clima venga en español
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}&lang=es`);
            const data = await response.json();

            if (data.cod !== 200) {
                // OpenWeatherMap devuelve un código de error si la ciudad no existe
                throw new Error(data.message || 'Ciudad no encontrada. Por favor, intenta de nuevo.');
            }
            setDataClima(data);
        } catch (error) {
            setError(error.message); // Captura el mensaje de error para mostrarlo
            console.error(`Ocurrió un problema: ${error}`);
        } finally {
            setLoading(false); // Termina la carga, tanto si tuvo éxito como si falló
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
