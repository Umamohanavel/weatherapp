const API_KEY = '687a5478531b4759b2d223eaa7c3b327';

const getFormattedWeatherData = async (city, units="metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    const data = await fetch(URL)
    .then((res)=> res.json())
    .then((data)=> data);
    const {weather,
         main: {temp, feels_like, temp_min, temp_max, pressure,humidity},
         wind: {speed},
         sys: {country},
         name,
        } = data;
        const {description, icon } = weather[0];
        return {
            description,
            icon,
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
            speed,
            country,
            name,
        };
};
export {getFormattedWeatherData};