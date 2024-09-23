// import { DAYS_FORECAST_LENGTH } from "./config";

const sortedObjects = [
  {
    forecast: 0,
    data: [],
  },
  {
    forecast: 1,
    data: [],
  },
  {
    forecast: 2,
    data: [],
  },
  {
    forecast: 3,
    data: [],
  },
  {
    forecast: 4,
    data: [],
  },
  {
    forecast: 5,
    data: [],
  },
];

const sortForecastData = function (data) {
  const date = new Date().getTime();

  const sortedForecatsDays = data.list.reduce((acc, currItem) => {
    const daysForecast = new Date(currItem.dt_txt.split(" ")[0]).getTime();
    const daysDifference = Math.ceil(
      (daysForecast - date) / (1000 * 60 * 60 * 24)
    );
    switch (daysDifference) {
      case 0: // CONTINUE FROM HERE@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    }

    return acc;
  }, []);
  // console.log(sortedForecatsDays);

  return sortedForecatsDays;
};

export { sortForecastData };
