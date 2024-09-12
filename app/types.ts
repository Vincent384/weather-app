

type Weather = {
    id:number,
    main:string,
    description:string,
    icon:string
}

type MainTemp = {
    temp:number,
    temp_min:number,
    temp_max:number
}

type WeatherResponse = {
    weather:Weather[],
    main:MainTemp,
    timezone:number,
    id:number,
    name:string,
    cod:number
}

type ForecastWeather = {
    description:string
    icon:string
}

type ForecastMainTemp = {
    temp:number,
    temp_min:number,
    temp_max:number
}

type ForecastCity = {
    id:number,
    name:string
}

type ForecastList = {
    dt_txt:string,
    main:ForecastMainTemp
    weather:ForecastWeather[]
}

type ForecastWeatherResponse = {
    list:ForecastList[] 
    city:ForecastCity
}

type InputForm = {
    input: string
  }

  type TomorrowProps = {
    forcastWeather: ForecastWeatherResponse | null;
    toggleSpanBlock:boolean
  }
