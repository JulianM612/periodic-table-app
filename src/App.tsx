import { useEffect } from "react";
import type { Element, ElementCategory } from "./types/element";
import { SearchBar } from "./components/SearchBar";
import { FilterControls } from "./components/FilterControls";
import { PeriodicTable } from "./components/PeriodicTable";
import { ElementModal } from "./components/ElementModal";
import TemperatureUnitSelector from "./components/TemperatureUnitSelector";
import { useStore } from "./store/useStore";
import "./App.css";

function App() {
  const {
    elements,
    selectedElement,
    searchTerm,
    selectedCategory,
    loading,
    error,
    setElements,
    setSelectedElement,
    setSearchTerm,
    setSelectedCategory,
    setLoading,
    setError,
  } = useStore();

  useEffect(() => {
    const fetchElements = async () => {
      setLoading(true);
      try {
        const response = await fetch("/elements-data.json");
        if (!response.ok) throw new Error("Failed to fetch elements data");
        const data = await response.json();
        setElements(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load elements"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchElements();
  }, [setElements, setError, setLoading]);

  const filteredElements = elements.filter((element: Element) => {
    const matchesSearch =
      !searchTerm ||
      element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.atomicNumber.toString().includes(searchTerm) ||
      element.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || element.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading elements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Periodic Table of Elements
        </h1>

        <div className="space-y-6">
          <SearchBar
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />

          <TemperatureUnitSelector />

          <FilterControls
            selectedCategory={selectedCategory as ElementCategory | null}
            onCategoryChange={(category) => setSelectedCategory(category)}
          />

          <PeriodicTable
            elements={filteredElements}
            onElementClick={setSelectedElement}
          />
        </div>

        {selectedElement && (
          <ElementModal
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
