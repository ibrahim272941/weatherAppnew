const form = document.querySelector('form');
const formInput = document.querySelector('input');
const warning = document.querySelector('.warning');
const resultArea = document.querySelector('.cities');
const currentCity = document.querySelector('.aktuel');

let weatherType = 'metric';
const apiKey = 'c33de92fbfdfe5c65e95631c6820204f';

window.onload = () => {
  findMyState();
};
form.onsubmit = (e) => {
  e.preventDefault();
  getWeatherData();
};

const getWeatherData = async () => {
  const cityCard = document.createElement('div');
  cityCard.classList.add('city');
  let input = formInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=${weatherType}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const { main, name, sys, weather } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    console.log(iconUrl);
    cityCard.innerHTML = ` <div class="head">
                <h2 class="cityName"><span>${name}</span><sup>${
      sys.country
    }</sup>
                </h2>
                <div class="closeIcon">X</div>
            </div>

            <div class="cityTemp">${Math.round(
              parseFloat(main.temp)
            )}<sup>°C</sup></div>

            <img class="cityIcon" src="${iconUrl}">
            <p>${weather[0].description}</p>`;

    resultArea.appendChild(cityCard);
    warning.innerText = '';
    form.reset();
    form.focus();
  } catch (error) {
    warning.innerText = `Die Stadt , die Sie gesucht haben , wurde nicht gefunden${error}`;
  }
};
const cardDelete = (city) => {
  city.parentElement.parentElement.remove();
};

resultArea.onclick = (e) => {
  if (e.target.className === 'closeIcon') {
    cardDelete(e.target);
  }
};
const findMyState = (e) => {
  const success = (position) => {
    const remain = 0.1706794824218747;
    const latitude = position.coords.latitude + remain;
    const longitude = position.coords.longitude;

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const city = data.locality;

        getCurrentCityWeather(city);
      });
  };
  const error = () => {
    console.log('error');
  };

  navigator.geolocation.getCurrentPosition(success, error);
};
const getCurrentCityWeather = async (e) => {
  const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${apiKey}&units=${weatherType}`;
  const res = await fetch(url);
  const data = await res.json();
  const { main, name, sys, weather } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  currentCity.innerHTML = `<div class="cityCurrent">
            <div>${date}</div>
            <div class="head">
                <h5 class="cityName"><span>${name}</span><sup>${
    sys.country
  }</sup>
                </h5>

            </div>

            <div class="cityTemp">${Math.round(
              parseFloat(main.temp)
            )}<sup>°C</sup></div>

            <img  class="cityIcon" src="${iconUrl}">
            <p>${weather[0].description}</p>`;
};
