import { useState } from "react";

export function useClima() {
    const urlBase = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "56608a5f542d57b91786b571e9c481c3";

    const [ciudad, setCiudad] = useState("");
    const [dataClima, setDataClima] = useState(null);

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
            const data = await response.json();
            setDataClima(data);
            console.log(data);
        } catch (error) {
            console.log(`Ocurrió un problema :c ${error}`);
        }
    };

    return {
        ciudad,
        setCiudad,
        dataClima,
        fetchClima
    };
}
