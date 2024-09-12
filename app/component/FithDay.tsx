'use client'
import { Thermometer, ThermometerSnowflake, ThermometerSun } from 'lucide-react'
import React, { useState } from 'react'

export const FithDay: React.FC<TomorrowProps> = ({ forcastWeather,toggleSpanBlock }) => {
    const today = new Date()
    const tomorrowDate = new Date(today)
    tomorrowDate.setDate(today.getDate() + 4)
    const tomorrowDay = tomorrowDate.getDate()
    const tomorrowsMonth = tomorrowDate.getMonth()
    const tomorrowYear = tomorrowDate.getFullYear()

    const [tomorrowToggle, setTomorrowToggle] = useState<boolean>(false)


    function toggleDayHandler(){
        setTomorrowToggle((prev) => !prev)
      }
    
      const tomorrowsDay = forcastWeather?.list.filter((day) => {
        const forecastDate = new Date(day.dt_txt)
        return forecastDate.getDate() === tomorrowDay &&
        forecastDate.getMonth() === tomorrowsMonth &&
        forecastDate.getFullYear() === tomorrowYear
      })

    const todaysDate = new Date();

      const year = tomorrowDate.getFullYear()
      const month = String(tomorrowDate.getMonth() + 4).padStart(2, '0')
      const day = String(tomorrowDate.getDate()).padStart(2, '0')

      console.log(day)
  return (
    <div>{

      toggleSpanBlock && (
              tomorrowsDay && tomorrowsDay.length > 0 && tomorrowToggle ? (
                <div className='p-5 overflow-x-auto'>
                  <span className='text-white font-bold text-xl flex justify-center items-center m-5 border-2 p-5
                  bg-black cursor-pointer' onClick={toggleDayHandler}>{`${year}-${month}-${day}`}</span>
                  {tomorrowsDay.map((weather, index) => {
                    const time = weather.dt_txt.split(" ")[1];
            
                    return (
                        <div key={index} className='grid grid-cols-4 text-center animate-slideDown my-2'>
                        <h1 className='text-black font-bold border flex justify-center items-center bg-white rounded-full'>{time}</h1> {/* Display only the time */}
                        <h2 className='text-white flex flex-col items-center justify-center'>Temp &nbsp; <span className=' font-bold text-xs text-white'>{weather.main.temp}</span>&nbsp; <Thermometer /></h2>
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

      }</div>
  )
}
