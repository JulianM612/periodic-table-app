import type { TemperatureUnit } from "../store/useStore";

// Constants for temperature conversion
const ABSOLUTE_ZERO_C = -273.15;
const ABSOLUTE_ZERO_F = -459.67;

// Validation functions
const isValidTemperature = (value: number, unit: TemperatureUnit): boolean => {
  switch (unit) {
    case "K":
      return value >= 0;
    case "C":
      return value >= ABSOLUTE_ZERO_C;
    case "F":
      return value >= ABSOLUTE_ZERO_F;
    default:
      return false;
  }
};

// Base conversion functions with validation
export function kelvinToCelsius(kelvin: number): number {
  if (!isValidTemperature(kelvin, "K")) {
    throw new Error("Temperature cannot be below absolute zero");
  }
  return kelvin - 273.15;
}

export function kelvinToFahrenheit(kelvin: number): number {
  if (!isValidTemperature(kelvin, "K")) {
    throw new Error("Temperature cannot be below absolute zero");
  }
  return kelvin * (9 / 5) - 459.67;
}

export function celsiusToKelvin(celsius: number): number {
  if (!isValidTemperature(celsius, "C")) {
    throw new Error("Temperature cannot be below absolute zero");
  }
  return celsius + 273.15;
}

export function celsiusToFahrenheit(celsius: number): number {
  if (!isValidTemperature(celsius, "C")) {
    throw new Error("Temperature cannot be below absolute zero");
  }
  return (celsius * 9) / 5 + 32;
}

export function fahrenheitToKelvin(fahrenheit: number): number {
  if (!isValidTemperature(fahrenheit, "F")) {
    throw new Error("Temperature cannot be below absolute zero");
  }
  return (fahrenheit + 459.67) * (5 / 9);
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  if (!isValidTemperature(fahrenheit, "F")) {
    throw new Error("Temperature cannot be below absolute zero");
  }
  return (fahrenheit - 32) * (5 / 9);
}

export const convertTemperature = (
  value: number | undefined,
  from: TemperatureUnit,
  to: TemperatureUnit
): number | undefined => {
  if (value === undefined) return undefined;
  if (from === to) return value;

  try {
    // First convert to Kelvin as our intermediate unit
    let kelvin: number;
    switch (from) {
      case "K":
        kelvin = value;
        break;
      case "C":
        kelvin = celsiusToKelvin(value);
        break;
      case "F":
        kelvin = fahrenheitToKelvin(value);
        break;
      default:
        throw new Error(`Unsupported temperature unit: ${from}`);
    }

    // Then convert from Kelvin to target unit
    switch (to) {
      case "K":
        return kelvin;
      case "C":
        return kelvinToCelsius(kelvin);
      case "F":
        return kelvinToFahrenheit(kelvin);
      default:
        throw new Error(`Unsupported temperature unit: ${to}`);
    }
  } catch (error) {
    console.error("Temperature conversion error:", error);
    return undefined;
  }
};

export const formatTemperature = (
  value: number | undefined,
  unit: TemperatureUnit
): string => {
  if (value === undefined) return "N/A";
  try {
    if (!isValidTemperature(value, unit)) {
      return "Invalid temperature";
    }
    return `${value.toFixed(1)}°${unit}`;
  } catch {
    return "Invalid temperature";
  }
};

export const getElementStateAtTemperature = (
  meltingPoint: number | undefined,
  boilingPoint: number | undefined,
  temperature: number,
  unit: TemperatureUnit = "K"
): "solid" | "liquid" | "gas" | "unknown" => {
  if (!meltingPoint || !boilingPoint) return "unknown";

  try {
    // Convert temperature to Kelvin for comparison
    const tempInKelvin =
      unit === "K" ? temperature : convertTemperature(temperature, unit, "K");
    if (tempInKelvin === undefined || !isValidTemperature(tempInKelvin, "K")) {
      return "unknown";
    }

    if (tempInKelvin < meltingPoint) return "solid";
    if (tempInKelvin > boilingPoint) return "gas";
    return "liquid";
  } catch {
    return "unknown";
  }
};
