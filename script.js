var main = document.querySelector('main');
var geolocation = document.querySelector('.geolocation');
var weatherDescription = document.querySelector('.description');
var temperature = document.querySelector('.temp');
var icon = document.querySelector('.icon');

temperature.addEventListener('click', celsiusFahrenheitToggle);

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(displayWeather, accessNotAllowed);
} else {
  main.innerHTML = 'Your browser does not support geolocation.';
}

function displayWeather(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      temperature.innerHTML = `${Math.round(myJson.main.temp)} &#8451`;
      geolocation.innerHTML = `${myJson.name}, ${myJson.sys.country}`;
      weatherDescription.innerHTML = myJson.weather[0].main;
      icon.innerHTML = weatherIconSelector(myJson.weather[0].main);
    });

}

function celsiusFahrenheitToggle() {
  var temperature = this.innerHTML.split(' ')[0];
  if (this.innerHTML.split(' ')[1] == String.fromCharCode(8451)) {
    this.innerHTML = `${Math.round(temperature * 1.8 + 32)} &#8457`;
  } else {
    this.innerHTML = `${Math.round((temperature - 32) * 0.5556)} &#8451`;
  }
}

function weatherIconSelector(weatherDescription) {
  var icons = {
    'rain': '<i class="wi wi-rain"></i>',
    'drizzle': '<i class="wi wi-sprinkle"></i>',
    'clouds': '<i class="wi wi-cloudy"></i>',
    'snow': '<i class="wi wi-snow"></i>',
    'clear': '<i class="wi wi-day-sunny"></i>',
    'thunderstorm': '<i class="wi wi-storm-showers"></i>',
    'mist': '<i class="wi wi-fog"></i>'
  };
  switch (weatherDescription) {
    case 'Rain':
      return icons.rain;
    case 'Drizzle':
      return icons.drizzle;
    case 'Clouds':
      return icons.clouds;
    case 'Snow':
      return icons.snow;
    case 'Clear':
      return icons.clear;
    case 'Thunderstorm':
      return icons.thunderstorm;
    case 'Mist':
      return icons.mist;
  }
}

function accessNotAllowed(error) {
  if (error.code == error.PERMISSION_DENIED) {
    main.innerHTML = 'In order to use this app, you need to allow the browser to access your location.';
  }
}

