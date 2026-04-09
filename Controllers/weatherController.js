const axios = require('axios');

exports.getWeatherData = async (req, res) => {
    try {
        const { city, lat, lon } = req.query;
        const apiKey = process.env.WEATHER_API_KEY;
        let url;

        // 1. Determine URL based on whether user sent City or Coordinates
        if (lat && lon) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        } else if (city) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        } else {
            return res.status(400).json({ message: "Please provide a city or coordinates" });
        }

        // 2. Fetch data from OpenWeatherMap
        const response = await axios.get(url);
        const data = response.data;

        // 3. Format the response for your Farmer Dashboard
        const weatherSummary = {
            location: data.name,
            temp: `${Math.round(data.main.temp)}°C`,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed} m/s`,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        };

        res.status(200).json({
            status: 'success',
            data: weatherSummary
        });

    } catch (err) {
        res.status(err.response?.status || 500).json({ 
            message: "Weather data currently unavailable",
            error: err.message 
        });
    }
};