# Weather App

## Project Overview

This project is an interactive web application designed to allow users to enter a location and retrieve the current weather conditions for that location. The app displays details such as temperature, precipitation, wind speed, weather description, an icon, and more. The application uses [OpenWeatherMap&#39;s](https://openweathermap.org/ "Go to their website.") free API calls for the weather data (specifically the geocoding and weather APIs).

## Key Features

* **Location Input**: Users can enter the name of a city or location in a text input field for which they want to check the weather.
* **Display Weather Data**: After the user submits a location, the current weather conditions for that location is displayed.
* **Styling**: CSS is used to make the app visually appealing. The project is also responsive and user-friendly.
* **Error Handling**: Error handling has been implemented ()in case the user has entered an invalid location or if
  there are issues with the API). The user is alerted of any specific errors that may arise.
* **Responsive Design** : The user interface is optimized for both desktop and mobile devices.

## Technologies Used

* **HTML5** : For structuring of the web application.
* **CSS3** : For styling and responsiveness.
* **JavaScript (React.js)**: For dynamic functionality and interactive features.
* **Axios**: For handling server requests from the frontend and to fetch data from the API.
* **Express.js**: For working with APIs within the NodeJS framework.

## Project Structure

1. **App.css** : The CSS file for styling the application.
2. **App.tsx** : The main JavaScript file where the application logic and interactions are implemented.
3. **main.tsx** : Used in conjunction with **index.html** to render the **App.tsx** into the DOM.

## Setup Instructions

1. Clone the repository from GitHub.
2. Run `npm install` in the terminal while in the main directory.
3. Run `npm run dev` in the terminal while in the main directory.
4. Navigate to **localhost:5173** in a browser.
5. Ensure you have an active internet connection for accessing the OpenWeatherMap API.

## Usage Instructions

1. Access the application in a web browser through the **localhost:5173** URL.
2. Input the name of a location in the location input field.
3. View the current weather data for that location.

## Project Outcomes

This project provided practical experience in front-end web development, particularly in working with APIs. The skills gained include:

* Implementing API functionality using OpenWeatherMap's geocoding and weather data APIs.
* Enhancing user experience through interactive elements such as input fields, error handling, and responsive design.
* Developing a full-stack application using HTML, CSS, and JavaScript.

## Contact Information

For any inquiries or further information, please contact me at [badhrihari123@gmail.com](mailto:badhrihari123@gmail.com "Email Me!").
