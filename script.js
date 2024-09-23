import { GEOCODING_API, WEATHER_API } from "./js/config.js";
import { sortForecastData } from "./js/helpers.js";

const menuBtn = document.getElementById("menu-btn");
const mobileNavbar = document.querySelector(".mobile-navbar");
const searchForm = document.querySelector(".navbar__search-form");
const searchInput = document.querySelector(".navbar__search-form--input");
const searchResults = document.querySelector(".navbar__search-form--results");
const loader = document.querySelector(
  ".navbar__search-form--loader-container--loader"
);

const fetchOptions = {
  method: "GET",
  headers: { "x-api-key": GEOCODING_API },
};

const toggleMobileMenu = function () {
  menuBtn.classList.toggle("open");
  mobileNavbar.classList.toggle("hidden");
};

const displayResultsContainer = function () {
  searchForm.classList.add("radius-none");
  searchResults.classList.add("results-active");
};

const hideResultsContainer = function () {
  searchForm.classList.remove("radius-none");
  searchResults.classList.remove("results-active");
};

const fetchResultsMarkup = function (data) {
  searchResults.innerHTML = "";
  const markup = data
    .map((item) => {
      return `
          <li>
              <svg>
                <use href="/imgs/icons.svg#icon-location"></use>
              </svg>
              <div>
                <p class="navbar__search-form--results--city" data-latitude="${
                  item.latitude
                }" data-longitude="${item.longitude}">${item.name}</p>
                <p class="navbar__search-form--results--country">${
                  !item.state ? "" : item.state
                } ${item.country}</p>
              </div>
          </li>
  `;
    })
    .join("");
  searchResults.insertAdjacentHTML("afterbegin", markup);
};

const fetchDropdownResults = async function () {
  const searchValue = searchInput.value;
  loader.classList.add("loader-active");

  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/geocoding?city=${searchValue}`,
      fetchOptions
    );

    if (!res.ok) {
      throw new Error("Something went wrong. Please try again!");
    }

    const data = await res.json();

    loader.classList.remove("loader-active");
    displayResultsContainer();
    fetchResultsMarkup(data);
  } catch (error) {
    alert(error.message);
  }
};

const fetchCityWeatherDetails = async function (e) {
  const cityEl = e.target
    .closest("li")
    .querySelector(".navbar__search-form--results--city");
  const lon = +cityEl.dataset.longitude;
  const lat = +cityEl.dataset.latitude;

  // @@@@@@@@@@@@@ display data

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat.toFixed(
        2
      )}&lon=${lon.toFixed(2)}&appid=${WEATHER_API}`
    );

    if (!res.ok) {
      throw new Error(`Something went wrong while fetching data!`);
    }

    const data = await res.json();
    console.log(data);
    sortForecastData(data);
  } catch (error) {
    console.log(error);
  }
};

searchResults.addEventListener("click", fetchCityWeatherDetails);
menuBtn.addEventListener("click", toggleMobileMenu);
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  fetchDropdownResults();
});
window.addEventListener("click", function (e) {
  if (!e.target.closest(".navbar__search-form")) {
    hideResultsContainer();
  }
});
