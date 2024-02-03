import { useEffect, useState } from "react";
import weatherBg from './picture/weather.png';
import Descriptions from "./Descriptions";
import freezeBg from "./picture/freeze.jpg"
import sunBg from "./picture/sun.jpg"


import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city,setCity] = useState("paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric")
  const [bg, setBg] = useState(freezeBg)

  useEffect(() => {
    const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units);
    setWeather(data);
    //dynamic bg
    const threshold = units === 'metric' ? 20 : 60;
    if(data.temp <= threshold)
      setBg(freezeBg)
    else 
      setBg(sunBg)
    };
    fetchWeatherData();
  }, [units, city]);

  const handleUnitsCheck = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(0);
    console.log(currentUnit);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "F" : "C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if(e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur()
    }
  }
  
  return (
    <div className="App" style={{backgroundImage: `url(${bg})`, backgroundRepeat:"no-repeat", backgroundSize:"100% 100%"}}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
              <div className="section section__inputs"> 
                <input 
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city" 
                  placeholder="Enter city.."
                  />
                <button onClick={(e) => handleUnitsCheck(e)}>F</button>
              </div>
            <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src= {weatherBg} alt="weather.png" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} ${units === "metric" ? "C" : "F"}`}</h1>
            </div>
          </div>
          {/* bottom description */}
          <Descriptions 
            weather= {weather}
            units = {units}
           />
         </div>
          )
        }  
      </div>
    </div>
  );
}

export default App;
