# RouteNest

RouteNest is a minimal React + TypeScript application powered by [Vite](https://vitejs.dev/). It provides a fast development experience with Hot Module Replacement (HMR), modern linting, and a simple project structure.

## Features

- ⚡️ Fast development with Vite
- ⚛️ React 19 with TypeScript
- 🔥 HMR for instant updates
- 🧹 ESLint integration with recommended rules
- 📦 Minimal dependencies

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build

To build for production:

```sh
npm run build
```

### Preview

To preview the production build:

```sh
npm run preview
```

### Lint

To run ESLint:

```sh
npm run lint
```

## Project Structure

```
route-nest/
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── assets/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ESLint Configuration

The project uses [typescript-eslint](https://typescript-eslint.io/) and recommended React rules. For production, consider enabling type-aware lint rules as described below:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## License

This project is licensed under the MIT License.
