import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

 const Weather = ()=>{
    
    const [data,setData] = useState({});
    const [city,setCity] = useState("");

    const handleEnter = async(e)=>{
      if(e.key === "Enter"){
        e.preventDefault();
        await getData();
        await setCity("");
      }
    }

    const  getData = async() =>{
    await axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbb20ad16f1fa337b2f3086d9f6e60a0`)
    //.then(response => setWeatherDeg(Math.round(response.data.main.temp-273) + " Degree"))
    .then((response) =>{
      setData(response.data);
      console.log(response.data);
    })
    .catch(error => console.log(error))
    }

  return(
    <div className="container">
        <div className="wrapper">
          <form className="form">
            <input 
            type="text" 
            id="cityInput" 
            placeholder="Enter a City" 
            value={city} 
            onKeyDown={handleEnter}
            onChange={(e) =>setCity(e.target.value)}  
            />
          </form>
          <div className="city-weather">
            <div className="primaries">
              <div className="location"><p>{data.name}</p></div>
              <div className="degree">{data.main ? <p>{Math.round(data.main.temp-273)}°C</p> : null}</div>
              <div className="condition">{data.main ? <p>{data.weather[0].main}</p> : null}</div>
            </div>
            <div className="others">
              <div className="humidity">
                <p>Humidity</p>
                {data.main ? <p> {data.main.humidity + "%"}</p> : null}
              </div>
              <div className = "wind">
                <p>Wind</p> 
                {data.main ? <p>{data.wind.speed} </p> : null}
              </div>
            </div>
          </div>
        </div>
    </div>
)
}
export default Weather;




/*
Instead of using the name of the location in the api I could show the corrected version of the input user entered as you can see below.

const [shownCity,setShownCity] = useState("");
await setShownCity(city.toLowerCase().split(" ").map((city) => city.charAt(0).toUpperCase() + city.slice(1)).join());  <div className="el1">Current City : {shownCity}</div>

*/

/*
  We can also set a button as below with handleClick function:

  const handleClick = async(e) =>{
      e.preventDefault();
      await getData();
      await setCity("");
    }
  
  <button 
  onClick={handleClick} 
  type="submit" 
  value="Submit"
  >
  Search
  /button>
*/