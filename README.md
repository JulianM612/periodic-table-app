# Interactive Periodic Table

An interactive periodic table application built with React, TypeScript, and Vite. Features include element details, temperature unit conversion, and category-based filtering.

## Features

- 🔍 Interactive element exploration
- 🌡️ Temperature unit conversion (K/C/F)
- 🎨 Category-based color coding and filtering
- 📱 Responsive design
- ⚡ Fast performance with Vite
- 🎯 Type-safe with TypeScript

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JulianM612/periodic-table-app.git
cd periodic-table-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Usage

- Click on any element to view detailed information
- Use the category filters to highlight specific element groups
- Toggle temperature units between Kelvin, Celsius, and Fahrenheit
- Search elements by name, symbol, or atomic number

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
