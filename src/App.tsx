// Import statements.
import { useState, useEffect } from "react";
import { Stack, VStack, Center } from "@chakra-ui/react";
import axios from "axios";

export default function App() {
  // Used to store certain variables whose values can dynamically change.
  const [placeName, setPlaceName] = useState("");
  const [tempPlaceName, setTempPlaceName] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // User cannot submit location input field if there are no characters.
  useEffect(() => {
    setSubmitDisabled(tempPlaceName.trim() === "");
  }, [tempPlaceName]);

  // Sends the name of the place to the server for the weather data.
  const handlePlaceNameSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior.
    setPlaceName(tempPlaceName); // Name of the place.
    setLoading(true); // Start the loading sequence.
    setError(null); // No errors (yet?)

    try {
      const response = await axios.post("/api/weather", {
        // Send place name to the serverless function.
        placeName: tempPlaceName,
      });
      setWeatherData(response.data); // Server response is stored.
    } catch (error) {
      // If there is an error.
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
    } finally {
      // After receiving (or not receiving) data from server:
      setLoading(false); // Loading sequence stopped.
    }
  };

  return (
    <>
      {!placeName && ( // Only shows when placeName not yet inputted by user.
        // Form for place name submission.
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
              disabled={submitDisabled} // User cannot submit until they have entered the place name.
            />
          </div>
        </form>
      )}

      {loading && ( // Loading sequence.
        <div className="input-container">
          <div className="input-fields-container">
            <div className="input-container-head">Loading...</div>
          </div>
        </div>
      )}

      {error && ( // Error message.
        <div className="input-container">
          <div className="input-fields-container">
            <div className="input-container-head">{error}</div>
          </div>
        </div>
      )}

      {placeName &&
        weatherData && ( // When place name and weather data are defined.
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
