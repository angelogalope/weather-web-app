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

      if (response.data.weather) {
        setWeather(response.data.weather);
      } else {
        alert("Place not found");
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert("Error fetching weather data");
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
    backgroundImage: `url('${
      weather?.weather && Array.isArray(weather.weather) && weather.weather.length > 0
        ? backgroundImageMapping[weather.weather[0].icon] || defaultBackgroundImage
        : defaultBackgroundImage
    }')`,
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
    let audio;
  
    if (weather) {
      const soundFile = (
        weather?.weather &&
        Array.isArray(weather.weather) &&
        weather.weather.length > 0 &&
        weather.weather[0].icon
      )
        ? soundMapping[weather.weather[0].icon] || ""
        : "";
      audio = new Audio(soundFile);
      setBgSound(audio);
    }
  
    const handleEnded = () => {
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
    };
  
    if (audio) {
      audio.addEventListener('ended', handleEnded);
  
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
        audio.currentTime = 0;
      }
    };
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

  const getLocalDateTime = (timestamp, timezoneOffset) => {
    const utcTime = new Date(timestamp * 1000);
    const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
    
    const options = {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(localTime);
  };

  return (
    <div style={backgroundImageStyle} className="flex flex-col gap-2 items-center justify-center w-full h-screen bg-cover">
      <div className='flex items-center gap-1 bg-black text-white text-xl font-semibold bg-opacity-30 w-auto h-auto rounded-lg p-3 top-5 right-5 absolute z-10'>
        <Clock />
      </div>
      <div className='text-white text-center py-3 px-[332px] flex flex-col gap-2'>
        <h1 id='title' className='text-5xl font-black'>MelloWeather</h1>
        <p id='desc' className='text-sm font-normal'>Embark on a sensory journey with MelloWeather, a weather app that turns forecasts into a harmonious experience. Imagine your daily weather check accompanied by a carefully curated soundtrack that mirrors the mood of the skies.</p>
      </div>
      <div className='flex gap-1 bg-black text-white bg-opacity-30 w-[352px] h-auto rounded-lg p-3'>
        <input 
          placeholder='Search place'
          type="text" 
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              getWeather();
            }
          }}
          className='w-full text-sm outline-none border-b border-white bg-black bg-opacity-0'/>
        <button className='font-bold' type='submit' onClick={getWeather} ><IoSearch /></button>
      </div>

      
      {weather && weather.weather && Array.isArray(weather.weather) && weather.weather.length > 0 && (
        <div className='flex flex-col bg-black text-white gap-3 bg-opacity-30 w-[752px] h-auto rounded-lg p-5'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col'>
              <h1 className='text-3xl font-black'>{weather.name}</h1>
              <p>{weather.sys.country}</p>
            </div>
            <h1>{getLocalDateTime(weather.dt, weather.timezone)}</h1>
          </div>
          <div className='flex items-center justify-center gap-0'>
            <img
              src={weatherIconMapping[weather.weather[0].icon]}
              alt="weather-icon"
              className='w-[92px] h-[92px]'
            />
            <div className='flex flex-col items-center'>
              <h1 className='text-8xl'>{weather.main.temp}°</h1>
              <h1 className='text-2xl'>{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</h1>
            </div>
            <div className='flex flex-col items-start'>
              <div className='flex items-center gap-2'>
                <img src="images/wind.png" className='w-[32px] h-[32px]' />
                <p>{Math.ceil(weather.wind.speed*100)/100} mph</p>
              </div>
              <div className='flex items-center gap-2'>
                <img src="images/humidity.png" className='w-[32px] h-[32px]' />
                <p>{Math.ceil(weather.main.humidity*100)/100}%</p>
              </div>
            </div>
          </div>
          <div id='forecast' className='flex justify-center pt-10 gap-5'>
            <div className='flex flex-col items-center w-auto h-[132px] p-4 border border-gray-500 rounded-md justify-between'>
              <h1 className='font-semibold'>Today</h1>
              <h1 className='text-2xl font-semibold'>30.71°</h1>
              <h1>Clear Sky</h1>
            </div>
            <div className='flex flex-col items-center w-auto h-[132px] p-4 border border-gray-500 rounded-md justify-between'>
              <h1 className='font-semibold'>Today</h1>
              <h1 className='text-2xl font-semibold'>30.71°</h1>
              <h1>Clear Sky</h1>
            </div>
            <div className='flex flex-col items-center w-auto h-[132px] p-4 border border-gray-500 rounded-md justify-between'>
              <h1 className='font-semibold'>Today</h1>
              <h1 className='text-2xl font-semibold'>30.71°</h1>
              <h1>Clear Sky</h1>
            </div>
            <div className='flex flex-col items-center w-auto h-[132px] p-4 border border-gray-500 rounded-md justify-between'>
              <h1 className='font-semibold'>Today</h1>
              <h1 className='text-2xl font-semibold'>30.71°</h1>
              <h1>Clear Sky</h1>
            </div>
            <div className='flex flex-col items-center w-auto h-[132px] p-4 border border-gray-500 rounded-md justify-between'>
              <h1 className='font-semibold'>Today</h1>
              <h1 className='text-2xl font-semibold'>30.71°</h1>
              <h1>Clear Sky</h1>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default App;
