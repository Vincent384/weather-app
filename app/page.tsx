'use client'
import { Thermometer, ThermometerSnowflake, ThermometerSun } from 'lucide-react'
import React, { useState } from 'react'
import { Tomorrow } from './component/Tomorrow'
import { ThirdDay } from './component/ThirdDay'
import { ForthDay } from './component/ForthDay'
import { FithDay } from './component/FithDay'



const Home = () => {

  
  const defaultFormData: InputForm = {
    input: ''
  }

  const [form, setForm] = useState<InputForm>(defaultFormData)
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [forcastWeather, setForcastWeather] = useState<ForecastWeatherResponse | null>(null)
  const [toggleSpanBlock, setToggleSpanBlock] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)

  async function getForcastData(city: string) {
    setForcastWeather(null)
    try {
      const res = await fetch(`/api/forecast?q=${city}`, {
        headers: {
          type: 'application/json'
        }
      })
      if (!res.ok) {
        console.error(res.status)
        return
      }

      const data = await res.json()
      setForcastWeather(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getData(city: string) {
    setWeather(null)
    try {
      const res = await fetch(`/api/weather?q=${city}`, {
        headers: {
          type: 'application/json'
        }
      })

      if (!res.ok) {
        console.error(res.status)
        return
      }

      const data = await res.json()
      setWeather(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function onSumbit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await getData(form.input)
    await getForcastData(form.input)
    setForm({ input: '' }) 
    setToggleSpanBlock(true)
  }

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function toggleDayHandler(){
    setToggle((prev) => !prev)
  }

  const findDay = forcastWeather?.list.filter((day) => {
    const todaysDate = new Date().getDate()
    const dayOfForecast = new Date(day.dt_txt).getDate()
    return dayOfForecast === todaysDate
  })



  const todaysDate = new Date();

  const year = todaysDate.getFullYear()
  const month = String(todaysDate.getMonth() + 1).padStart(2, '0')
  const day = String(todaysDate.getDate()).padStart(2, '0')
  
  const noCity = form.input === '' && !weather
  const invalidCity = form.input !== '' && !weather

  return (
    <div className='h-screen bg-emerald-900 overflow-auto pb-10'>
      <form onSubmit={onSumbit} className='flex py-5 bg-slate-500 justify-center items-center text-center'>
        <input name='input' value={form.input} onChange={onChangeHandler} className='p-2 mr-2 rounded-lg' type="text" />
        <button className='bg-green-800 text-white rounded-lg py-2 px-4 text-center'>Kolla Väder</button>
      </form>
      <div>
        {
          weather && (
            <div className=''>
              <div className='flex flex-col gap-3 justify-center items-center pt-10'>
                <h1 className='text-3xl text-white font-bold'>{weather.name}</h1>
                <h2 className='text-white flex justify-center items-center'>Temperatur &nbsp; <span className='font-bold text-xl text-white'>{weather.main.temp}</span>&nbsp; <Thermometer /></h2>
                <h3 className='text-white flex justify-center items-center'>Minimum temperatur &nbsp; <span className='font-bold text-xl text-white'>{weather.main.temp_min}</span>&nbsp;<ThermometerSnowflake /></h3>
                <h3 className='text-white flex justify-center items-center'>Max temperatur &nbsp; <span className='font-bold text-xl text-white'>{weather.main.temp_max}</span>&nbsp;<ThermometerSun /></h3>
                <h4 className='text-white'><span>{weather.weather[0].description}</span></h4>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="w-20 h-20"
                />
              </div>
            </div>
          )
        }
{toggleSpanBlock && (
        findDay && findDay.length > 0 && toggle ? (
          <div className='p-5 overflow-x-auto'>

            
          
        
                  <span className='text-white font-bold text-xl flex justify-center
                  items-center m-5 border-2 p-5 bg-black
                    cursor-pointer' onClick={toggleDayHandler}>{`${year}-${month}-${day}`}</span>
        
            {findDay.map((weather, index) => {
              const time = weather.dt_txt.split(" ")[1];
              
              return (
                <div key={index} className='grid grid-cols-4 text-center animate-slideDown'>
                  <h1 className='text-black font-bold border flex justify-center items-center bg-white rounded-full'>{time}</h1> 
                  <h2 className='text-white flex flex-col items-center justify-center'>Temp &nbsp; <span className=' font-bold text-xs text-white'>{weather.main.temp}</span>&nbsp; <Thermometer /></h2>
                  <h3 className='text-white flex flex-col items-center justify-center '>Min &nbsp; <span className='font-bold text-xs text-white'>{weather.main.temp_min}</span>&nbsp;<ThermometerSnowflake /></h3>
                  <h3 className='text-white flex flex-col items-center justify-center'>Max &nbsp; <span className='font-bold text-xs text-white'>{weather.main.temp_max}</span>&nbsp;<ThermometerSun /></h3>
                  <h4 className='text-white flex flex-col items-center justify-center'><span className=''>{weather.weather[0].description}</span></h4>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    className="w-20 h-20"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <span className='text-white font-bold text-xl flex justify-center items-center m-5 border-2 p-5 bg-black cursor-pointer' onClick={toggleDayHandler}>
            {`${year}-${month}-${day}`}
          </span>
        )
)
}
  <Tomorrow forcastWeather={forcastWeather} toggleSpanBlock={toggleSpanBlock}/>
  <ThirdDay forcastWeather={forcastWeather} toggleSpanBlock={toggleSpanBlock}/>
  <ForthDay forcastWeather={forcastWeather} toggleSpanBlock={toggleSpanBlock}/>
  <FithDay forcastWeather={forcastWeather} toggleSpanBlock={toggleSpanBlock}/>
        {
          noCity && (
            <div className='flex justify-center items-center mt-10'>
              <h1 className='font-bold text-white text-lg'>No city selected</h1>
            </div>
          )
        }
        {
          invalidCity && (
            <div className='flex justify-center items-center mt-10'>
              <h1 className='font-bold text-white text-lg'>{`City ${form.input} not found`}</h1>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home
