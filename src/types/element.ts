export type ElementCategory =
  | "alkali-metal"
  | "alkaline-earth-metal"
  | "transition-metal"
  | "post-transition-metal"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble-gas"
  | "lanthanide"
  | "actinide";

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  period: number;
  group: number;
  electronConfiguration: string;
  oxidationStates: string[];
  meltingPoint?: number;
  boilingPoint?: number;
  density?: number;
  electronegativity?: number;
  discoveryYear?: number;
  discoverer?: string;
  imageUrl?: string;
}
