const apiKey = "";
const accessKey = "";

const searchBtn = document.getElementById("search-btn");
const searchField = document.getElementById("search-field");
const weatherInfo = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

searchBtn.addEventListener("click", async () => {
  const city = searchField.value.trim();
  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.style.display = "block";
    weatherInfo.style.display = "none";
    return;
  }

  try {
    errorMessage.style.display = "none";
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );

    if (!weatherRes.ok) throw new Error("City not found");
    const weatherData = await weatherRes.json();

    document.getElementById("city-name").textContent = capitalize(city);
    document.getElementById(
      "temperature"
    ).textContent = `🌡️ Temperature: ${weatherData.main.temp}°C`;
    document.getElementById(
      "condition"
    ).textContent = `🌤️ Condition: ${weatherData.weather[0].description}`;
    document.getElementById(
      "humidity"
    ).textContent = `💧 Humidity: ${weatherData.main.humidity}%`;
    weatherInfo.style.display = "block";

    // Fetch background
    const imageRes = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        city
      )}&client_id=${accessKey}`
    );
    const imageData = await imageRes.json();
    if (imageData.results.length > 0) {
      const imageUrl = imageData.results[0].urls.regular;
      document.body.style.backgroundImage = `url(${imageUrl})`;
    }
  } catch (err) {
    console.error(err);
    weatherInfo.style.display = "none";
    errorMessage.textContent = "City not found. Try again!";
    errorMessage.style.display = "block";
  }
});
