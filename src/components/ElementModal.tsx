import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Element } from "../types/element";
import { kelvinToCelsius, kelvinToFahrenheit } from "../utils/temperature";

type TemperatureUnit = "K" | "C" | "F";

interface ElementModalProps {
  element: Element | null;
  onClose: () => void;
}

export const ElementModal = ({ element, onClose }: ElementModalProps) => {
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>("K");

  if (!element) return null;

  const convertTemp = (kelvin: number | undefined): string => {
    if (kelvin === undefined) return "N/A";
    let temp: number;
    switch (tempUnit) {
      case "C":
        temp = kelvinToCelsius(kelvin);
        break;
      case "F":
        temp = kelvinToFahrenheit(kelvin);
        break;
      case "K":
      default:
        temp = kelvin;
        break;
    }
    return `${temp.toFixed(1)}°${tempUnit}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-neutral rounded-lg p-6 max-w-2xl w-full mx-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                {element.name}
                <span className="text-2xl text-secondary">{element.symbol}</span>
              </h2>
              <p className="text-lg text-gray-700 mt-1">
                Atomic Number: {element.atomicNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-2xl transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-xl font-semibold mb-4 text-primary">Basic Properties</h3>
              <dl className="space-y-3 text-gray-800">
                <div className="flex justify-between">
                  <dt className="text-gray-600 font-medium">Atomic Mass:</dt>
                  <dd>{element.atomicMass.toFixed(4)} u</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 font-medium">Category:</dt>
                  <dd className="capitalize">
                    {element.category.replace("-", " ")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 font-medium">Period:</dt>
                  <dd>{element.period}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600 font-medium">Group:</dt>
                  <dd>{element.group}</dd>
                </div>
              </dl>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Electronic Properties
              </h3>
              <dl className="space-y-3 text-gray-800">
                <div className="flex justify-between">
                  <dt className="text-gray-600 font-medium">Electron Configuration:</dt>
                  <dd className="font-mono text-sm">{element.electronConfiguration}</dd>
                </div>
                {element.oxidationStates && element.oxidationStates.length > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600 font-medium">Oxidation States:</dt>
                    <dd>{element.oxidationStates.join(", ")}</dd>
                  </div>
                )}
                {element.electronegativity && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600 font-medium">Electronegativity:</dt>
                    <dd>{element.electronegativity}</dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-primary">Physical Properties</h3>
                <div className="inline-flex rounded-lg border border-gray-300 bg-white shadow-sm">
                  {(["K", "C", "F"] as TemperatureUnit[]).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setTempUnit(unit)}
                      className={`px-4 py-2 text-sm font-medium transition-colors
                        ${
                          tempUnit === unit
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                        ${unit === "K" ? "rounded-l-lg" : ""}
                        ${unit === "F" ? "rounded-r-lg" : ""}
                      `}
                    >
                      °{unit}
                    </button>
                  ))}
                </div>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                {element.meltingPoint !== undefined && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600 font-medium">Melting Point:</dt>
                    <dd>{convertTemp(element.meltingPoint)}</dd>
                  </div>
                )}
                {element.boilingPoint !== undefined && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600 font-medium">Boiling Point:</dt>
                    <dd>{convertTemp(element.boilingPoint)}</dd>
                  </div>
                )}
                {element.density !== undefined && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600 font-medium">Density:</dt>
                    <dd>{element.density} g/cm³</dd>
                  </div>
                )}
              </dl>
            </section>

            {(element.discoveryYear || element.discoverer) && (
              <section className="md:col-span-2 border-t border-gray-300 pt-4 mt-2">
                <h3 className="text-xl font-semibold mb-3 text-primary">Discovery</h3>
                <p className="text-gray-800">
                  {element.discoveryYear &&
                    `Discovered in ${element.discoveryYear}`}
                  {element.discoverer && ` by ${element.discoverer}`}
                </p>
              </section>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
