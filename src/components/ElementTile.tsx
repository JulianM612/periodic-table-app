import { motion } from "framer-motion";
import type { Element, ElementCategory } from "../types/element";

interface ElementTileProps {
  element: Element;
  onClick: (element: Element) => void;
}

export const ElementTile = ({ element, onClick }: ElementTileProps) => {
  return (
    <motion.div
      className={`relative p-2 border rounded cursor-pointer transition-all
        ${getCategoryColor(element.category)}
        hover:z-10 hover:shadow-lg`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(element)}
    >
      <div className="text-xs text-right opacity-75">
        {element.atomicNumber}
      </div>
      <div className="text-xl font-bold text-center">{element.symbol}</div>
      <div className="text-xs text-center truncate">{element.name}</div>
      <div className="text-xs text-center opacity-75">
        {element.atomicMass.toFixed(2)}
      </div>
    </motion.div>
  );
};

const getCategoryColor = (category: ElementCategory): string => {
  switch (category) {
    case "alkali-metal":
      return "bg-red-100 hover:bg-red-200";
    case "alkaline-earth-metal":
      return "bg-orange-100 hover:bg-orange-200";
    case "transition-metal":
      return "bg-yellow-100 hover:bg-yellow-200";
    case "post-transition-metal":
      return "bg-green-100 hover:bg-green-200";
    case "metalloid":
      return "bg-teal-100 hover:bg-teal-200";
    case "nonmetal":
      return "bg-blue-100 hover:bg-blue-200";
    case "halogen":
      return "bg-indigo-100 hover:bg-indigo-200";
    case "noble-gas":
      return "bg-purple-100 hover:bg-purple-200";
    case "lanthanide":
      return "bg-pink-100 hover:bg-pink-200";
    case "actinide":
      return "bg-rose-100 hover:bg-rose-200";
  }
};
