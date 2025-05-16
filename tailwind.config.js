/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        18: "repeat(18, minmax(0, 1fr))",
        14: "repeat(14, minmax(0, 1fr))",
      },
      colors: {
        primary: "#4682B4", // Steel Blue
        secondary: "#5F9EA0", // Cadet Blue
        accent: "#B0C4DE", // Light Steel Blue
        neutral: "#F5F5DC", // Beige
        "metal-alkali": "#FF6347", // Tomato
        "metal-alkaline-earth": "#FFD700", // Gold
        "metal-transition": "#ADFF2F", // GreenYellow
        "metal-post-transition": "#40E0D0", // Turquoise
        "metalloid": "#DA70D6", // Orchid
        "nonmetal": "#98FB98", // PaleGreen
        "halogen": "#FFFF00", // Yellow
        "noble-gas": "#ADD8E6", // LightBlue
        "lanthanide": "#FFB6C1", // LightPink
        "actinide": "#FFA07A", // LightSalmon
      },
    },
  },
  plugins: [],
};
