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
  let input = formInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=${weatherType}`;
  try {
    //!----getCityWeatherInfo--------//////
    const cityCard = document.createElement('div');
    cityCard.classList.add('city');
    const countryInfo = document.createElement('div');
    countryInfo.classList.add('country');
    const res = await fetch(url);
    const data = await res.json();
    const { main, name, sys, weather } = data;

    const cityList = Array.from(resultArea.querySelectorAll('.city'));

    if (cityList.length > 0) {
      const filteredCity = cityList.filter(
        (item) =>
          item.querySelector('.cityName span').innerText.toLowerCase() ==
          name.toLowerCase()
      );
      if (filteredCity.length > 0) {
        warning.innerText = `Sie kennen das Wettervorhersage von ${
          filteredCity[0].querySelector('.cityName span').innerText
        }bereits, suchen Sie bitte nach einer anderen Stadt`;
        form.reset();
        formInput.focus();
        return;
      }
    }
    //!------getCountryInfo---------//////
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${sys.country}`
    );

    const data2 = await response.json();

    const {
      name: { official },
      flags: { png },
      capital,
      currencies,
      region,
      languages,
      population,
    } = data2[0];

    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    cityCard.innerHTML = ` <div class="head">
    <h2 class="cityName"><span>${name}</span><sup>${sys.country}</sup>
    </h2>
    <div class="closeIcon">X</div>
    </div>
    
    <div class="cityTemp">${Math.round(
      parseFloat(main.temp)
    )}<sup>°C</sup></div>
      
      <img class="cityIcon" src="${iconUrl}">
      <p>${weather[0].description}</p>
      `;
    countryInfo.innerHTML = ` 
                    <img src="${png}" alt="" class="countryImg">
                    <div class="countryData">
                        <h4 class="countryName">
                            ${official}
                        </h4>
                        <h4>${capital[0]}</h4>
                        <h5 class="countryRegion">${region}</h5>
                        <h5 class="countryCapital">${
                          Object.values(currencies)[0].name
                        }</h5>
                        <h4 class="countryPop">${(
                          +population / 1_000_000
                        ).toFixed(1)}M People</h4>
                        <h4 class="countryLang">${Object.values(
                          languages
                        )}</h4>`;
    form.reset();
    formInput.focus();
    cityCard.appendChild(countryInfo);
    resultArea.appendChild(cityCard);
    warning.innerText = '';
  } catch (error) {
    warning.innerText = `Die Stadt , die Sie gesucht haben , wurde nicht gefunden`;
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
    const remain = 0.17;
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
            <div class="date">${date}</div>
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
