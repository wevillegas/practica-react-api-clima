// src/components/Buscador.jsx
import React from 'react';

export const Buscador = ({ ciudad, setCiudad, onBuscar, loading }) => {

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.trim().length > 0) {
            onBuscar();
        }
    };

    return (
        <div className="weather-box search-box">
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
        </div>
    );
};