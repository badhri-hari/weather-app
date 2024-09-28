import axios from "axios";
import dotenv from "dotenv";

// Initialize the dotenv package.
dotenv.config();

const apiKey = process.env.WEATHER_API_KEY; // OpenWeatherMap API key.

// The function will handle POST requests to the "/students" endpoint.
export default async function handler(req, res) {
  // Check the request method.
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { placeName } = req.body; // User inputted place name.

  try {
    const geoResponse = await axios.get(
      // For converting place name to coordinates.
      `http://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=1&appid=${apiKey}`
    );

    if (geoResponse.data.length === 0) {
      return res.status(404).json({ error: "Location not found" }); // If coordinates of place not found.
    }

    const { lat, lon } = geoResponse.data[0]; // Latitude and longitude coordinates.

    const weatherResponse = await axios.get(
      // Fetching weather data for the coordinates.
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const { weather, main, wind } = weatherResponse.data; // Storing the response.

    const weatherData = {
      // Creating a JSON response object to send back to the frontend.
      description: weather[0].description, // Description of the current weather (ex. cloudy, clear skies).
      icon: weather[0].icon, // Weather icon which mirrors the description.
      temperature: main.temp, // Temperature of location.
      humidity: main.humidity, // Humidity at location.
      wind_speed: wind.speed, // Wind speed at location.
    };

    res.status(200).json(weatherData); // Send response back to the frontend.
  } catch (error) {
    // In case there is an error.
    console.error("Error fetching weather data:", error); // For debugging.
    if (error.response) {
      // The request was made and the server responded with a status code
      res
        .status(500)
        .json({ error: "Error fetching weather data from the server" });
    } else if (error.request) {
      // The request was made but no response was received
      res
        .status(500)
        .json({ error: "Unable to connect to the weather service" });
    } else {
      // Something happened in setting up the request that triggered an error
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}
