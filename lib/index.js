// TODO: Write your JS code in here
import $ from 'jquery';
import 'select2';

$('#input-location').select2();

const cities = ["Amsterdam","Bali","Barcelona","Belo Horizonte","Berlin","Bordeaux","Brussels","Buenos Aires","Casablanca","Chengdu","Copenhagen","Kyoto","Lausanne","Lille","Lisbon","London","Lyon","Madrid","Marseille","Melbourne","Mexico","Milan","Montréal","Nantes","Oslo","Paris","Rio de Janeiro","Rennes","Rome","São Paulo","Seoul","Shanghai","Shenzhen","Singapore","Stockholm","Tel Aviv","Tokyo"];

$('#input-location').select2({ data: cities, width: '100%' });

const key = "17ad9663745dc03fb8b5fb91a16c492e";
const submit = document.getElementById("btn-submit");
const input = document.getElementById("input-location");
const weatherCard = document.getElementById("weather-card");
const submitGeo = document.getElementById("input-geo");


const d = new Date();
const date = d.toDateString();

const fetchWeather = (event) => {
  weatherCard.innerHTML = "";
  event.preventDefault();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`)
    .then(response => response.json())
    .then((data) => {
      const name = data.name;
      const description = data.weather[0].description;
      const temp = Math.round(data.main.temp);
      const weatherTag = `<h2>Weather in ${name}</h2><h3>${date}</h3><p>${description}</p><h3>${temp}°C</h3>`;
      weatherCard.insertAdjacentHTML('beforeend', weatherTag);
    });
};


const fetchWeatherByCoordinates = (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((data) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=${key}&units=metric`)
      .then(response => response.json())
      .then((data) => {
        console.log(data.name);
        const name = data.name;
        const description = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        const weatherTag = `<h2>Weather in ${name}</h2><h3>${date}</h3><p>${description}</p><h3>${temp}°C</h3>`;
        weatherCard.insertAdjacentHTML('beforeend', weatherTag);
      });
  });
};

submit.addEventListener('click', fetchWeather);

submitGeo.addEventListener('click', fetchWeatherByCoordinates);
