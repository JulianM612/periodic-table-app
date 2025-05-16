import { create } from "zustand";
import type { Element, ElementCategory } from "../types/element";

export type TemperatureUnit = "K" | "C" | "F";

interface Store {
  elements: Element[];
  selectedElement: Element | null;
  searchTerm: string;
  selectedCategory: ElementCategory | null;
  temperatureUnit: TemperatureUnit;
  loading: boolean;
  error: string | null;
  setElements: (elements: Element[]) => void;
  setSelectedElement: (element: Element | null) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: ElementCategory | null) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  elements: [],
  selectedElement: null,
  searchTerm: "",
  selectedCategory: null,
  temperatureUnit: "K",
  loading: false,
  error: null,
  setElements: (elements) => set({ elements }),
  setSelectedElement: (element) => set({ selectedElement: element }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setTemperatureUnit: (unit) => set({ temperatureUnit: unit }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
