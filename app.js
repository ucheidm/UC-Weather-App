function formatTime(timestamp) {
  let date = new Date();
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[date.getDay()];

  return `${weekday} ${hours}:${minutes}`;
}

function formatWeek(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  console.log(response.data);

  let weatherForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  weatherForecast.forEach(function (forecastWeek, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
      <div class = "weather-days">${formatWeek(forecastWeek.dt)}</div>
      

      <img
        src="https://openweathermap.org/img/wn/${
          forecastWeek.weather[0].icon
        }@2x.png" alt="" width="40"/>
      
     <div class="dayElement">
       <span id ="forecast-Max"> ${Math.round(forecastWeek.temp.max)}°</span>
       <span id = "forecast-Min"><small>${Math.round(
         forecastWeek.temp.min
       )}°</small></span> 
      </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function forecastDisplay(coordinates) {
  console.log(coordinates);
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

/*function forecastDisplay(coordinates) {
  //console.log(coordinates);
  let apiKey = "84e1c9463953605b19de1b1f09a0a7d7";
  //let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}
*/
function currentCity(response) {
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#temp");
  Celsius = response.data.main.temp;
  temperature.innerHTML = Math.round(Celsius);

  let showTime = document.querySelector("#time");
  showTime.innerHTML = formatTime(response.data.dt * 1000);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let icons = document.querySelector("#icon");
  icons.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icons.setAttribute("alt", response.data.weather[0].description);

  forecastDisplay(response.data.coord);
}

function search(cityName) {
  let apiKey = "84e1c9463953605b19de1b1f09a0a7d7";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentCity);
}

function submitButton(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");

  search(searchCity.value);
}

function showFahrenheit(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temp");
  let fahrenheit = (Celsius * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
}
function showCelsius(event) {
  event.preventDefault();

  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(Celsius);
}

let Celsius = null;

let form = document.querySelector("#myForm");
form.addEventListener("submit", submitButton);

let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#Celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("Nigeria");
