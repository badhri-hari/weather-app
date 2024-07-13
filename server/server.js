// Import statements.
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Initalize the dotenv package.

// Initalize Express application server.
const app = express();
app.use(express.json());

app.use(cors()); // Use the cors package to permit requests from the frontend.

const apiKey = process.env.WEATHER_API_KEY; // OpenWeatherMap API key.

// Function to run at this route.
app.post("/weather", async (req, res) => {
  const { placeName } = req.body; // User inputted place name.

  try {
    const geoResponse = await axios.get( // For converting place name to coordinates.
      `http://api.openweathermap.org/geo/1.0/direct?q=${placeName}&limit=1&appid=${apiKey}`
    );

    if (geoResponse.data.length === 0) {
      return res.status(404).send("Location not found"); // If coordinates of place not found.
    }

    const { lat, lon } = geoResponse.data[0]; // Latitude and longitude coordinates.

    const weatherResponse = await axios.get( // Fetching weather data for the coordinates.
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const { weather, main, wind } = weatherResponse.data; // Storing the response.

    const weatherData = { // Creating a JSON response object to send back to the fronted.
      description: weather[0].description, // Description of the current weather (ex. cloudy, clear skies).
      icon: weather[0].icon, // Weather icon which mirrors the description.
      temperature: main.temp, // Temperature of location.
      humidity: main.humidity, // Humidity at location.
      wind_speed: wind.speed, // Wind speed at location.
    };

    res.json(weatherData); // Send response back to the frontend.
  } catch (error) { // In case there is an error.
    console.error("Error fetching weather data:", error); // For debugging.
    if (error.response) {
      // The request was made and the server responded with a status code
      res.status(500).send("Error fetching weather data from the server");
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).send("Unable to connect to the weather service");
    } else {
      // Something happened in setting up the request that triggered an error
      res.status(500).send("An unexpected error occurred");
    }
  }
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
