import { useState } from "react";
import { getWeatherByCity } from "../services/weatherService"; // <-- IMPORTAR

export function useClima() {
    const [ciudad, setCiudad] = useState("");
    const [dataClima, setDataClima] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchClima = async () => {
        setLoading(true);
        setError(null);
        setDataClima(null);
        try {
            const finalData = await getWeatherByCity(ciudad);
            setDataClima(finalData);
        } catch (error) {
            setError(error.message);
            console.error(`Ocurrió un problema: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return { ciudad, setCiudad, dataClima, loading, error, fetchClima };
}