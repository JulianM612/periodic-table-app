import { useMemo } from "react";
import type { Element } from "../types/element";
import { ElementTile } from "./ElementTile";
import { motion } from "framer-motion";

interface PeriodicTableProps {
  elements: Element[];
  onElementClick: (element: Element) => void;
}

export const PeriodicTable = ({
  elements,
  onElementClick,
}: PeriodicTableProps) => {
  const elementMap = useMemo(() => {
    const map = new Map<string, Element>();
    elements.forEach((element) => {
      map.set(`${element.period}-${element.group}`, element);
    });
    return map;
  }, [elements]);

  const groupedElements = useMemo(() => {
    return {
      alkaliMetals: elements.filter((el) => el.category === "alkali-metal"),
      alkalineEarthMetals: elements.filter(
        (el) => el.category === "alkaline-earth-metal"
      ),
      transitionMetals: elements.filter(
        (el) => el.category === "transition-metal"
      ),
      postTransitionMetals: elements.filter(
        (el) => el.category === "post-transition-metal"
      ),
      metalloids: elements.filter((el) => el.category === "metalloid"),
      nonmetals: elements.filter((el) => el.category === "nonmetal"),
      halogens: elements.filter((el) => el.category === "halogen"),
      nobleGases: elements.filter((el) => el.category === "noble-gas"),
      lanthanides: elements.filter((el) => el.category === "lanthanide"),
      actinides: elements.filter((el) => el.category === "actinide"),
    };
  }, [elements]);

  // Create a grid of 18 columns and 7 rows (main periods)
  const grid = Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 18 }, (_, col) => {
      const key = `${row + 1}-${col + 1}`;
      return elementMap.get(key) || null;
    })
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full overflow-x-auto"
    >
      <div className="min-w-[1200px] p-4">
        {/* Legend */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {Object.entries(groupedElements).map(
            ([key, elements]) =>
              elements.length > 0 && (
                <div
                  key={key}
                  className={`flex items-center gap-2 text-sm ${getCategoryColorClass(
                    elements[0].category
                  )}`}
                >
                  <div className="w-4 h-4 rounded bg-current opacity-20"></div>
                  <span>{formatGroupName(key)}</span>
                </div>
              )
          )}
        </div>

        {/* Main periodic table grid */}
        <div className="grid grid-cols-18 gap-1">
          {grid.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="contents"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: rowIndex * 0.1 }}
            >
              {row.map((element, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`aspect-square ${element ? "" : "invisible"}`}
                >
                  {element && (
                    <ElementTile element={element} onClick={onElementClick} />
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Special series container */}
        <div className="mt-8 space-y-8">
          {/* Lanthanides series */}
          <div className="grid grid-cols-14 gap-1 ml-[8.33%]">
            <div className="col-span-full flex items-center gap-2 text-sm text-gray-500 mb-1">
              <div
                className={`w-4 h-4 rounded ${getCategoryColorClass(
                  "lanthanide"
                )}`}
              ></div>
              <span>Lanthanides (57-71)</span>
            </div>
            {groupedElements.lanthanides.map((element, index) => (
              <motion.div
                key={element.atomicNumber}
                className="aspect-square"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.7 }}
              >
                <ElementTile element={element} onClick={onElementClick} />
              </motion.div>
            ))}
          </div>

          {/* Actinides series */}
          <div className="grid grid-cols-14 gap-1 ml-[8.33%]">
            <div className="col-span-full flex items-center gap-2 text-sm text-gray-500 mb-1">
              <div
                className={`w-4 h-4 rounded ${getCategoryColorClass(
                  "actinide"
                )}`}
              ></div>
              <span>Actinides (89-103)</span>
            </div>
            {groupedElements.actinides.map((element, index) => (
              <motion.div
                key={element.atomicNumber}
                className="aspect-square"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.9 }}
              >
                <ElementTile element={element} onClick={onElementClick} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const formatGroupName = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/s$/, "s");
};

const getCategoryColorClass = (category: string): string => {
  const colors: Record<string, string> = {
    "alkali-metal": "bg-red-100",
    "alkaline-earth-metal": "bg-orange-100",
    "transition-metal": "bg-yellow-100",
    "post-transition-metal": "bg-green-100",
    metalloid: "bg-teal-100",
    nonmetal: "bg-blue-100",
    halogen: "bg-indigo-100",
    "noble-gas": "bg-purple-100",
    lanthanide: "bg-pink-100",
    actinide: "bg-rose-100",
  };
  return colors[category] || "bg-gray-100";
};
