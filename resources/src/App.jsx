import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { IoSearch } from "react-icons/io5";

function App() {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState(null);
  
  const getWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/weather/${place}`);
      setWeather(response.data.weather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-screen bg-[url('/images/bg-image.jpg')] bg-cover">
      <div className='flex gap-1 bg-black text-white bg-opacity-30 w-[352px] h-auto rounded-lg p-3 z-10'>
        <input 
          placeholder='Search place'
          type="text" 
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className='w-full text-sm outline-none border-b border-white bg-black bg-opacity-0'/>
        <button className='font-bold' onClick={getWeather}><IoSearch /></button>
      </div>

      <div className='flex flex-col bg-black text-white gap-3 bg-opacity-30 w-[352px] h-auto rounded-md p-5  z-10'>
        <div>
          {weather && (
            <>
              <h1 className='text-2xl'>Today at <span className='text-4xl font-semibold'>{weather.name}</span></h1>
              <h1>Country: {weather.sys.country}</h1>
            </>
          )}
        </div>
        <div className='flex gap-2'>
          {weather && (
            <>
              <div className='flex flex-col w-[162px] h-[162px] text-white bg-black bg-opacity-40 rounded-lg p-2'>
                <h1 className='text-5xl font-semibold'>{weather.main.temp}°</h1>
                <p>{weather.weather[0].main}</p>
                <div className='flex flex-col items-end'>
                  <img src={`images/${weather.weather[0].icon}.png`} alt="weather-icon" className='w-[72px] h-[72px]'/>
                </div>
              </div>
              <div className='flex flex-col items-start w-[162px] h-[162px] text-white bg-black bg-opacity-40 rounded-lg p-2'>
                <h1 className='text-xl font-semibold'>Coordinates</h1>
                <h1 className='flex flex-col items-end'>Longitude: <span>{weather.coord.lon}</span></h1>
                <h1 className='flex flex-col items-end'>Latitude: <span>{weather.coord.lat}</span></h1>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
