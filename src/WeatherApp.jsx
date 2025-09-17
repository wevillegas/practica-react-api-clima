import { useClima } from "./hooks/useClima";

export const WeatherApp = () => {
  const { ciudad, setCiudad, dataClima, fetchClima } = useClima();
  const difKelvin = 273.15;

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  return (
    <div className="container">
      <h1>Aplicación del clima</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>

      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura: {parseInt(dataClima.main?.temp - difKelvin)}°C</p>
          <p>Condición meteorológica: {dataClima.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
            alt="icono clima"
          />
        </div>
      )}
    </div>
  );
};