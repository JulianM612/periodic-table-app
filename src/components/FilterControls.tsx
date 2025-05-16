import type { ElementCategory } from "../types/element";

interface FilterControlsProps {
  selectedCategory: ElementCategory | null;
  onCategoryChange: (category: ElementCategory | null) => void;
}

export const FilterControls = ({
  selectedCategory,
  onCategoryChange,
}: FilterControlsProps) => {
  const categories: ElementCategory[] = [
    "alkali-metal",
    "alkaline-earth-metal",
    "transition-metal",
    "post-transition-metal",
    "metalloid",
    "nonmetal",
    "halogen",
    "noble-gas",
    "lanthanide",
    "actinide",
  ];

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

  const formatCategoryName = (category: ElementCategory): string => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              selectedCategory === null
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          All Elements
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                selectedCategory === category
                  ? "bg-gray-800 text-white"
                  : `${getCategoryColor(category)} text-gray-700`
              }`}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>
    </div>
  );
};
