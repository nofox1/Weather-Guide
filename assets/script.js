var searchButton = document.querySelector(".search-btn");
var searchInput = document.querySelector(".search-input");
var weatherCardsContainer = document.querySelector(".weather-cast");
var currentWeatherContainer = document.querySelector(".weather-output");

var API_KEY = "8de4872bdf9f760190704f0f4b640c4a";

const createWeatherCard = (cityName, weatherEl, index) => {
  if (index === 0) {
    return `<div class="icon">
              <img
              src="https://openweathermap.org/img/wn/${
                weatherEl.weather[0].icon
              }@4x.png"
                alt="weather-icon"
              />
              <h4>${weatherEl.weather[0].description}
              <h2>${cityName}  ${weatherEl.dt_txt.split(" ")[0]}</h2>
              <h4>Temperature: ${(weatherEl.main.temp - 273.15).toFixed(
                2
              )}°C</h4>
              <h4>Wind: ${weatherEl.wind.speed} mph</h4>
              <h4>Humidity:  ${weatherEl.main.humidity} %</h4>
            </div>`;
  } else {
    return ` <li class="cards">
              <h2>${weatherEl.dt_txt.split(" ")[0]}</h2>
              <img
                src="https://openweathermap.org/img/wn/${
                  weatherEl.weather[0].icon
                }@2x.png"
                alt="weather-icon"
              />
              <h4>Temp: ${(weatherEl.main.temp - 273.15).toFixed(2)}°C</h4>
              <h4>Wind: ${weatherEl.wind.speed} mph</h4>
              <h4>Humidity:  ${weatherEl.main.humidity} %</h4>
            </li>`;
  }
};

const getWeatherInfo = (searchCityInput, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      const differentForecastDays = [];
      const fiveDayForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!differentForecastDays.includes(forecastDate)) {
          return differentForecastDays.push(forecastDate);
        }
      });

      searchCityInput.value = "";
      weatherCardsContainer.innerHTML = "";
      currentWeatherContainer.innerHTML = "";

      fiveDayForecast.forEach((weatherEl, index) => {
        if (index === 0) {
          currentWeatherContainer.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(searchCityInput, weatherEl, index)
          );
        } else {
          weatherCardsContainer.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(searchCityInput, weatherEl, index)
          );
        }
      });
    })
    .catch(() => {
      alert("error has occurred fetching the weather forecast!");
    });
};

const getCoordinates = () => {
  const searchCityInput = searchInput.value.trim();
  if (!searchCityInput) return;
  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchCityInput}&limit=5&appid=${API_KEY}`;

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length)
        return alert(`No coordinates found for ${searchCityInput}`);
      const { name, lat, lon } = data[0];
      getWeatherInfo(name, lat, lon);
    })
    .catch(() => {
      alert("error has occurred fetching coordinates");
    });
};

addEventListener("click", getCoordinates);
