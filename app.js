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

function currentCity(response) {
  let city = document.querySelector("#cityName");
  city.innerHTML = response.data.name;

  //console.log(response.data);

  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);

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
}

function searching(cityName) {
  let apiKey = "84e1c9463953605b19de1b1f09a0a7d7";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=84e1c9463953605b19de1b1f09a0a7d7`;

  axios.get(apiUrl).then(currentCity);
}

function submitButton(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");

  searching(searchCity.value);
}
searching("Nigeria");

let form = document.querySelector("#myForm");
form.addEventListener("submit", submitButton);
