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

function showForecast(response) {
  let forecast = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  let forecastHTML = `<div class ="row">`;
  days.forEach(function (weekday) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
      <div class = "weather-days">${weekday}</div>
      
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII="
        id="icon"
      />
      <p class="day">
        34° <small>25°</small>
      </p>
    </div>
  
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function forecastDisplay(coordinates) {
  let apiKey = "84e1c9463953605b19de1b1f09a0a7d7";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function currentCity(response) {
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;

  //console.log(response.data);

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
  forecastDisplay(response.data.coord);
}

function searching(cityName) {
  let apiKey = "84e1c9463953605b19de1b1f09a0a7d7";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(currentCity);
}

function submitButton(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");

  searching(searchCity.value);
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

searching("Nigeria");
