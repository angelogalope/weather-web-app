import { useState } from 'react';
import './App.css';

function App() {
  const [place, setPlace] = useState("");
  const [weather, getWeather] = useState([]);
  
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-screen bg-[url('/images/bg-image.jpg')] bg-cover">
      <div className='flex gap-1 bg-black text-white bg-opacity-30 w-[352px] h-auto rounded-lg p-3 z-10'>
        <label>Search place: </label>
        <input 
          type="text" 
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className='w-[178px] text-sm outline-none border-b border-white bg-black bg-opacity-0'/>
        <button className='font-bold' onClick={getWeather}>Search</button>
      </div>

      {/* <img src="images/sunny-cloud.png" className='w-[232px] h-[232px] right-72 absolute z-0'/> */}
      <div className='flex flex-col bg-black text-white gap-3 bg-opacity-30 w-[352px] h-auto rounded-md p-5  z-10'>
        <div>
          <h1 className='text-2xl'>Today at <span className='text-4xl font-semibold'>Sibagat</span></h1>
          <h1>Country: Philippines</h1>
        </div>
        <div className='flex gap-2'>
          <div className='flex flex-col w-[162px] h-[162px] text-white bg-black bg-opacity-40 rounded-lg p-2'>
            <h1 className='text-5xl font-semibold'>32.20°</h1>
            <p>Sunny</p>
            <div className='flex flex-col items-end'>
              <img src="images/sunny.png" className='w-[72px] h-[72px]'/>
            </div>
          </div>
          <div className='flex flex-col items-start w-[162px] h-[162px] text-white bg-black bg-opacity-40 rounded-lg p-2'>
            <h1 className='text-xl font-semibold'>Coordinates</h1>
            <h1 className='flex flex-col items-end'>Longitude: <span>125.6975</span></h1>
            <h1 className='flex flex-col items-end'>Latitude: <span>8.8225</span></h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App