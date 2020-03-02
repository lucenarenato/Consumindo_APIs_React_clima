import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from "@material-ui/core";
import LoadingSpinner from "./LoadingSpinner";

import Weather from "./Weather";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);
    const [city, setCity] = useState("Eldoret");
    const [error, setError] = useState(null);
    const [currentWeather, setCurrentWeather] = useState({});
    const [forecast, setForecast] = useState([]);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

if (location == false) {
  return (
    <Fragment>
      Você precisa habilitar a localização no browser o/
    </Fragment>
  )
} else if (weather == false) {
    /*return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )*/
    return <LoadingSpinner />;
} else {
  return (
    <Fragment>
      <h2 class="weather-widget__city-name">Cidade: {weather['name']}</h2>
      <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
      <hr/>
      <ul>
        <li class="weather-widget__temperature">Temperatura atual: {weather['main']['temp']}°</li>
        <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
        <li>Temperatura minima: {weather['main']['temp_min']}°</li>
        <li>Pressão: {weather['main']['pressure']} hpa</li>
        <li>Umidade: {weather['main']['humidity']}%</li>
      </ul>
    </Fragment>
  );
}
}

export default App;
