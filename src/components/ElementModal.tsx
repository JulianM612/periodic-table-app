import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Element } from "../types/element";

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
    let temp = kelvin;
    if (tempUnit === "C") {
      temp = kelvin - 273.15;
    } else if (tempUnit === "F") {
      temp = (kelvin * 9) / 5 - 459.67;
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
          className="bg-white rounded-lg p-6 max-w-2xl w-full mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                {element.name}
                <span className="text-2xl text-gray-500">{element.symbol}</span>
              </h2>
              <p className="text-lg text-gray-600">
                Atomic Number: {element.atomicNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">Basic Properties</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Atomic Mass:</dt>
                  <dd>{element.atomicMass.toFixed(4)} u</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="capitalize">
                    {element.category.replace("-", " ")}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Period:</dt>
                  <dd>{element.period}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Group:</dt>
                  <dd>{element.group}</dd>
                </div>
              </dl>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-3">
                Electronic Properties
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Electron Configuration:</dt>
                  <dd className="font-mono">{element.electronConfiguration}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Oxidation States:</dt>
                  <dd>{element.oxidationStates.join(", ")}</dd>
                </div>
                {element.electronegativity && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Electronegativity:</dt>
                    <dd>{element.electronegativity}</dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="md:col-span-2">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Physical Properties</h3>
                <div className="inline-flex rounded-lg border border-gray-200 bg-white">
                  {(["K", "C", "F"] as TemperatureUnit[]).map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setTempUnit(unit)}
                      className={`px-3 py-1 text-sm font-medium first:rounded-l-lg last:rounded-r-lg
                        ${
                          tempUnit === unit
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      °{unit}
                    </button>
                  ))}
                </div>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {element.meltingPoint && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Melting Point:</dt>
                    <dd>{convertTemp(element.meltingPoint)}</dd>
                  </div>
                )}
                {element.boilingPoint && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Boiling Point:</dt>
                    <dd>{convertTemp(element.boilingPoint)}</dd>
                  </div>
                )}
                {element.density && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Density:</dt>
                    <dd>{element.density} g/cm³</dd>
                  </div>
                )}
              </dl>
            </section>

            {(element.discoveryYear || element.discoverer) && (
              <section className="md:col-span-2 border-t pt-4 mt-2">
                <h3 className="text-lg font-semibold mb-2">Discovery</h3>
                <p className="text-gray-700">
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
