# 09 - Weather App (Fetching APIs)

In this project, you will learn how to make your React application communicate with the outside world. We will use a free, public API to fetch weather data for any city.

## Learning Objectives
- Understanding the `useEffect` Hook.
- Fetching data from external APIs using `fetch()`.
- Handling asynchronous operations (`async/await`) in React components.
- Managing Loading and Error states.
- Conditional rendering based on API data.

## Setup Instructions

1. Navigate to this folder: `cd 09-Weather-App`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Code Explanation

- **`useEffect`**: A React component is a function that runs to produce HTML. If we put a `fetch()` request directly in the function, it would fetch data every single time the component re-renders (which is bad!). `useEffect` allows us to run code exactly *once* when the component first appears on the screen (by passing an empty array `[]` as the second argument).
- **Multiple States**: When fetching data over the internet, it takes time, and it can fail. Therefore, we don't just have a `weatherData` state; we also have a `loading` state (to show a spinner/text) and an `error` state (to show if the city doesn't exist).
- **Public API**: We use the *Open-Meteo API* which doesn't require an API key. We first have to query their geocoding API to turn a city name (like "London") into Latitude and Longitude, and then we query the forecast API with those coordinates.

## 📝 Assignments

1. **Add More Data:** The Open-Meteo API returns more than just temperature and wind speed. Modify the code to also display the `weathercode` (which represents if it's sunny, raining, etc). Check the console log of `weatherJson` to see what is available!
2. **Auto-refresh (Bonus):** Modify the `useEffect` hook so that it automatically calls `fetchWeather(city)` every 60 seconds using `setInterval`. Don't forget to return a cleanup function (`clearInterval`) inside your `useEffect` so you don't create multiple intervals!
