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
      <div className="text-xs text-right opacity-75 font-semibold">
        {element.atomicNumber}
      </div>
      <div className="text-xl font-bold text-center mt-1">{element.symbol}</div>
      <div className="text-xs text-center truncate mt-1">{element.name}</div>
      <div className="text-xs text-center opacity-75 mt-1 font-semibold">
        {element.atomicMass.toFixed(2)}
      </div>
    </motion.div>
  );
};

const getCategoryColor = (category: ElementCategory): string => {
  switch (category) {
    case "alkali-metal":
      return "bg-metal-alkali hover:bg-metal-alkali/80";
    case "alkaline-earth-metal":
      return "bg-metal-alkaline-earth hover:bg-metal-alkaline-earth/80";
    case "transition-metal":
      return "bg-metal-transition hover:bg-metal-transition/80";
    case "post-transition-metal":
      return "bg-metal-post-transition hover:bg-metal-post-transition/80";
    case "metalloid":
      return "bg-metalloid hover:bg-metalloid/80";
    case "nonmetal":
      return "bg-nonmetal hover:bg-nonmetal/80";
    case "halogen":
      return "bg-halogen hover:bg-halogen/80";
    case "noble-gas":
      return "bg-noble-gas hover:bg-noble-gas/80";
    case "lanthanide":
      return "bg-lanthanide hover:bg-lanthanide/80";
    case "actinide":
      return "bg-actinide hover:bg-actinide/80";
    default:
      return "bg-gray-200 hover:bg-gray-300";
  }
};
