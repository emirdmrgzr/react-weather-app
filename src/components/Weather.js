import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

 const Weather = ()=>{
    const [city,setCity] = useState("");
    const [shownCity,setShownCity] = useState("");
    const [weatherDeg,setWeatherDeg] = useState(0);
    const handleChange = (e)=>{
      setCity(e.target.value);
    }
    const handleClick = async(e) =>{
      e.preventDefault();
      await getData();
      await setShownCity(city);
    }

    const  getData = async() =>{
    await axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbb20ad16f1fa337b2f3086d9f6e60a0`)
    .then(response => setWeatherDeg(Math.round(response.data.main.temp-273) + " Degree"))
    .catch(error => console.log(error))
    }
  return(
    <div className="container">
        <div className="wrapper">
          <h1 className="page-header">SIMPLE WEATHER APP</h1>
          <form className="form">
            <input type="text" id="cityInput" placeholder="Enter a City" value={city} onChange={(e) =>setCity(e.target.value)}  />
            <button onClick={handleClick} type="submit" value="Submit">Search</button>
          </form>
          <div className="city-weather">
          <div className="el1">Current City : {shownCity}</div>
          <div className="el2">Current Weather  : {weatherDeg}</div>
          </div>
        </div>
    </div>
)
}
export default Weather;