import { useState } from 'react'
import { Search } from './components/Search'
import './App.css'


function App() {
  const [ciudades, setCiudades] = useState([])
  const [search, setSearch] = useState(' ')

  const takeApi = async (ciudad) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${ciudad}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ee49666199mshddfe0ec3e78793ep11d5aejsn81acd6240afa',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const newCity = result;
      setCiudades([newCity, ...ciudades])
    } catch (error) {
      console.error(error);
    }
  }

  const getCardHeadColor = (condition) => {
  const normalizedCondition = condition.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
    switch (normalizedCondition) {
      case 'sunny':
        return 'sunny';
      case 'cloudy':
        return 'cloudy';
      case 'rain':
        return 'rain';
      case 'light rain shower':
        return 'light rain shower';
      case 'clear':
        return 'clear';
      case 'partly cloudy':
        return 'partly cloudy';
      case 'fog':
        return 'fog';
      case 'heavy rain at times':
        return 'heavy rain at times';
      case 'overcast':
        return 'overcast';
      default:
        return '';
    }
  }

  return (
    <>
    <div className='Titulo'>
      <h1>Weather App</h1>
    </div>
      <div className="container">
        <header>
          <Search search={search} setSearch={setSearch} takeApi={takeApi} />
        </header>
        <main className="container-card">
          {ciudades.map((ciudad) => (
            <article className="card" key={ciudad.location.tz_id}>
              <div className={`card-head ${getCardHeadColor(ciudad.current.condition.text.toLowerCase())}`}>
                <div className="card-elements-icon">
                  <img src={`http:${ciudad.current.condition.icon}`} alt="icon weather api" />
                </div>
                <div className="card-data">
                  <p className="card-data-condition">{ciudad.current.condition.text}</p>
                  <p className="card-data-grados">{ciudad.current.temp_c}<spam>°</spam></p>
                  <p className="card-data-ciudad">{ciudad.location.name},{ciudad.location.region},{ciudad.location.country}</p>
                </div>
              </div>
              <div className="body-card">
                <p className="body-card-viento">
                  Viento: <span>{ciudad.current.wind_kph},{ciudad.current.wind_dir} km/h</span>
                </p>
                <p className="body-card-humedad">
                  Humedad: <span>{ciudad.current.humidity}%</span>
                </p>
                <p className="body-card-presion">
                  Presión atmosférica: <span>{ciudad.current.pressure_in}%</span>
                </p>
              </div>
            </article>
          ))}
        </main>
        <div></div>
      </div>
    </>
  )
}

export default App
