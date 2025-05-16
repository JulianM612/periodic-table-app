// Function to convert Kelvin to Celsius
export function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

// Function to convert Kelvin to Fahrenheit
export function kelvinToFahrenheit(kelvin: number): number {
  return (kelvin - 273.15) * (9 / 5) + 32;
}

// Function to convert Celsius to Kelvin
export function celsiusToKelvin(celsius: number): number {
  return celsius + 273.15;
}

// Function to convert Celsius to Fahrenheit
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9 / 5) + 32;
}

// Function to convert Fahrenheit to Kelvin
export function fahrenheitToKelvin(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9) + 273.15;
}

// Function to convert Fahrenheit to Celsius
export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * (5 / 9);
}
