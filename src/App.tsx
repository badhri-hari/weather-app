// Import statements.
import { useState, useEffect } from "react";
import { Stack, VStack, Center } from "@chakra-ui/react";
import axios from "axios";

// Define the shape of the weather data response.
interface WeatherData {
  description: string;
  icon: string;
  temperature: number;
  precipitation?: number;
  humidity: number;
  wind_speed: number;
}

export default function App() {
  // State variables to store dynamic values.
  const [placeName, setPlaceName] = useState<string>("");
  const [tempPlaceName, setTempPlaceName] = useState<string>("");
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Disable submit button if input is empty.
  useEffect(() => {
    setSubmitDisabled(tempPlaceName.trim() === "");
  }, [tempPlaceName]);

  // Handle form submission to fetch weather data.
  const handlePlaceNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior.
    setPlaceName(tempPlaceName); // Set the place name for display.
    setLoading(true); // Start the loading sequence.
    setError(null); // Clear any previous errors.

    try {
      const response = await axios.post("/api/weather", {
        // Send place name to the serverless function.
        placeName: tempPlaceName,
      });
      setWeatherData(response.data); // Store the server response.
    } catch (error: unknown) {
      // Check if error is an Axios error
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 2xx
          if (error.response.status === 404) {
            setError("Location not found. Please enter a valid place name.");
          } else {
            setError("Error fetching weather data from the server.");
          }
        } else if (error.request) {
          // Request was made but no response received
          setError(
            "Unable to connect to the server. Check your internet connection."
          );
        } else {
          // Something else happened
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false); // Stop the loading sequence.
    }
  };

  return (
    <>
      {!placeName && ( // Show form for place name submission if not yet inputted.
        <form className="input-container" onSubmit={handlePlaceNameSubmit}>
          <div className="input-fields-container">
            <div className="input-container-head">Enter Place Name</div>
            <input
              type="text"
              maxLength={100}
              className="input-field text"
              value={tempPlaceName}
              onChange={(e) => setTempPlaceName(e.target.value)}
            />
            <input
              type="submit"
              className={`input-field ${
                submitDisabled ? "disabled" : "submit"
              }`}
              value="Submit"
              disabled={submitDisabled} // Disable submit until a place name is entered.
            />
          </div>
        </form>
      )}

      {loading && ( // Show loading state.
        <div className="input-container">
          <div className="input-fields-container">
            <div className="input-container-head">Loading...</div>
          </div>
        </div>
      )}

      {error && ( // Show error message if there is an error.
        <div className="input-container">
          <div className="input-fields-container">
            <div className="input-container-head">{error}</div>
          </div>
        </div>
      )}

      {placeName &&
        weatherData && ( // Show weather data when available.
          <Stack
            direction={["column", "row"]}
            spacing="24px"
            className="main-container"
          >
            <Center className="weather-icon-container">
              <VStack className="weather-icon-stack">
                <img
                  className="weather-icon"
                  alt={weatherData.description}
                  src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  // Displays appropriate icon for each weather condition.
                />
                <div className="weather-icon-text">
                  {weatherData.description}
                </div>
              </VStack>
            </Center>

            {/* Weather data cards below:  */}
            <VStack spacing="30px" className="weather-data">
              <div className="title">
                Weather for{" "}
                <span style={{ fontWeight: "bolder" }}>{placeName}</span>
              </div>
              <div className="weather-data-cards">
                <div className="weather-data-title">Temperature</div>
                <div className="weather-data-text">
                  {weatherData.temperature}°C
                </div>
              </div>
              <div className="weather-data-cards">
                <div className="weather-data-title">Precipitation</div>
                <div className="weather-data-text">
                  {weatherData.precipitation ? weatherData.precipitation : "0"}%
                </div>
              </div>
              <div className="weather-data-cards">
                <div className="weather-data-title">Humidity</div>
                <div className="weather-data-text">{weatherData.humidity}%</div>
              </div>
              <div className="weather-data-cards">
                <div className="weather-data-title">Wind</div>
                <div className="weather-data-text">
                  {weatherData.wind_speed} m/s
                </div>
              </div>
            </VStack>
          </Stack>
        )}
    </>
  );
}
