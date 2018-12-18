import React from "react";

export const kelvinToCelcius = (tempKelvin) => {
  let tempCelcius = tempKelvin - 273.15;
  tempCelcius = Math.round(tempCelcius * 100) / 100;
  return tempCelcius;
}

export const kelvinToFahrenheit = (tempKelvin) => {
  let tempFahrenheit = (tempKelvin - 273.15) * 9/5 + 32;
  tempFahrenheit = Math.round(tempFahrenheit * 100) / 100;
  return tempFahrenheit;
}
