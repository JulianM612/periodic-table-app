import React from "react";
import { useStore } from "../store/useStore";

const TemperatureUnitSelector: React.FC = () => {
  const { temperatureUnit, setTemperatureUnit } = useStore();

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTemperatureUnit(event.target.value as "K" | "C" | "F");
  };

  return (
    <div className="mb-4">
      <label htmlFor="temperatureUnit" className="block text-sm font-medium text-gray-700">
        Temperature Unit
      </label>
      <select
        id="temperatureUnit"
        value={temperatureUnit}
        onChange={handleTemperatureChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="K">Kelvin (K)</option>
        <option value="C">Celsius (°C)</option>
        <option value="F">Fahrenheit (°F)</option>
      </select>
    </div>
  );
};

export default TemperatureUnitSelector;
