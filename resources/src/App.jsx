import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { IoSearch } from "react-icons/io5";
import Clock from './components/Clock';

import defaultBgImage from '/images/bg-image.jpg';
import bgClearSky from '/images/bgClearSky.png';
import bgClearSkyNight from '/images/bgClearSkyNight.png';
import bgRain from '/images/bgRain.png';
import bgShowerRain from '/images/bgShowerRain.png';
import bgThunderstorm from '/images/bgThunderstorm.png';
import bgSnow from '/images/bgSnow.png';
import bgFog from '/images/bgFog.png';

import clearSkyMusic from '/bg-music/clearSkyMusic.MP3?url';
import clearSkyMusicNight from '/bg-music/clearSkyMusicNight.MP3?url';
import rainMusic from '/bg-music/rainMusic.MP3?url';
import thunderstormMusic from '/bg-music/thunderstormMusic.MP3?url';
import snowMusic from '/bg-music/snowMusic.MP3?url';

import clearSky from '/images/clear-sky.png';
import clearSkyNight from '/images/clear-skyNight.png';
import fewClouds from '/images/few-clouds.png';
import fewCloudsNight from '/images/few-cloudsNight.png';
import scatteredClouds from '/images/scattered-clouds.png';
import brokenClouds from '/images/broken-clouds.png';
import showerRain from '/images/shower-rain.png';
import showerRainNight from '/images/shower-rainNight.png';
import rain from '/images/rain.png';
import thunderstorm from '/images/thunderstorm.png';
import snow from '/images/snow.png';
import fog from '/images/fog.png';

function App() {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState(null);
  const [bgSound, setBgSound] = useState(null);
  
  const getWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/weather/${place}`);
      setWeather(response.data.weather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const defaultBackgroundImage = defaultBgImage;

  const backgroundImageMapping = {
    "01d": bgClearSky,
    "02d": defaultBgImage,
    "03d": defaultBgImage,
    "04d": defaultBgImage,
    "09d": bgShowerRain,
    "10d": bgRain,
    "11d": bgThunderstorm,
    "13d": bgSnow,
    "50d": bgFog,
    
    "01n": bgClearSkyNight,
    "02n": bgClearSkyNight,
    "03n": bgClearSkyNight,
    "04n": bgClearSkyNight,
    "09n": bgShowerRain,
    "10n": bgRain,
    "11n": bgThunderstorm,
    "13n": bgSnow,
    "50n": bgFog,
  }

  const backgroundImageStyle = {
    backgroundImage: `url('${backgroundImageMapping[weather?.weather[0]?.icon] || defaultBackgroundImage}')`,
  };

  const soundMapping = {
    "01d": clearSkyMusic,
    "02d": clearSkyMusic,
    "03d": clearSkyMusic,
    "04d": clearSkyMusic,
    "09d": rainMusic,
    "10d": rainMusic,
    "11d": thunderstormMusic,
    "13d": snowMusic,
    "50d": clearSkyMusic,
    
    "01n": clearSkyMusicNight,
    "02n": clearSkyMusicNight,
    "03n": clearSkyMusicNight,
    "04n": clearSkyMusicNight,
    "09n": rainMusic,
    "10n": rainMusic,
    "11n": thunderstormMusic,
    "13n": snowMusic,
    "50n": clearSkyMusicNight,
  }

  useEffect(() => {
    if(weather) {
        const soundFile = soundMapping[weather?.weather[0]?.icon] || clearSkyMusic; // Provide a default music file
        const audio = new Audio(soundFile);
        setBgSound(audio);
    }
  }, [weather]);

  useEffect(() => {
    if (bgSound) {
      bgSound.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  
    return () => {
      if (bgSound) {
        bgSound.pause();
        bgSound.currentTime = 0;
      }
    };
  }, [bgSound]);

  // const backgroundImageStyle = {
  //   backgroundImage: `url('defaultBackgroundImage')`,
  // };

  const weatherIconMapping = {
    "01d": clearSky,
    "02d": fewClouds,
    "03d": scatteredClouds,
    "04d": brokenClouds,
    "09d": showerRain,
    "10d": rain,
    "11d": thunderstorm,
    "13d": snow,
    "50d": fog,
    
    "01n": clearSkyNight,
    "02n": fewCloudsNight,
    "03n": scatteredClouds,
    "04n": brokenClouds,
    "09n": showerRainNight,
    "10n": rain,
    "11n": thunderstorm,
    "13n": snow,
    "50n": fog,
  };

  return (
    <div style={backgroundImageStyle} className="flex flex-col gap-2 items-center justify-center w-full h-screen bg-cover">
      <div className='flex items-center gap-1 bg-black text-white text-xl font-semibold bg-opacity-30 w-auto h-auto rounded-lg p-3 top-5 right-5 absolute z-10'>
        <Clock />
      </div>
      <div className='flex gap-1 bg-black text-white bg-opacity-30 w-[352px] h-auto rounded-lg absolute top-5 p-3 z-10'>
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
                <img
                  src={weatherIconMapping[weather.weather[0].icon]}
                  alt="weather-icon"
                  className='w-[72px] h-[72px]'
                />
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
