# 🗺️ RouteNest

**RouteNest** is a modern route-planning web app designed for travelers, bikers, and road trip enthusiasts. Plan custom routes on an interactive map, save your journeys, and revisit them anytime.

Built with **React + Vite**, styled with **Material UI**, and powered by **Leaflet + OpenStreetMap** for dynamic, open-source mapping.

---

## 🚀 Features

- 🗺️ Interactive map powered by Leaflet + OpenStreetMap
- 🧭 Route planning with multi-point waypoints
- 💾 Save and organize routes by name or tags
- 🔁 Revisit and visualize saved routes anytime
- 📍 Add notes, names, and details to each trip
- 🤝 Shareable route previews
- 🏍️ Optimized for motorbike tours and custom trip planning

---

## ⚙️ Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| Frontend     | React + TypeScript + Vite          |
| UI Framework | Material UI (MUI)                  |
| Mapping      | Leaflet + Leaflet Routing Machine  |
| Map Source   | OpenStreetMap                      |
| State Mgmt   | React Context / Zustand (optional) |
| Storage      | LocalStorage (optional backend)    |

---

## 📦 Setup & Installation

### 1. Clone the project

```bash
git clone https://github.com/yourusername/routenest.git
cd routenest
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/       # Reusable UI & map widgets (Material UI + Leaflet)
├── pages/            # Route-based views (Home, Planner, Saved)
├── types/            # TypeScript types and interfaces
├── hooks/            # Custom React hooks (e.g., useLocalStorage)
├── utils/            # Utility functions (e.g., route formatting)
├── context/          # App-level state (routes, settings)
├── App.tsx           # Main shell
└── main.tsx          # Vite entry point
```

---

## 🧪 Scripts

```bash
npm run dev       # Start local dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint with ESLint
```

---

## 🧭 Roadmap

- [x] Create route with waypoints
- [x] Visualize route on Leaflet map
- [x] Save routes locally with metadata
- [ ] Add route notes, photos
- [ ] User authentication (optional backend)
- [ ] Cloud sync and multi-device support
- [ ] Export route to GPX / KML
- [ ] Mobile-first responsive UI

---

## 🛠 Dependencies (core)

```json
"dependencies": {
  "leaflet": "^1.9.x",
  "leaflet-routing-machine": "^3.2.x",
  "@mui/material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x",
  "react-leaflet": "^4.x",
  "react-router-dom": "^6.x"
}
```

---

## 🌐 Demo

> 🚧 Coming soon: [https://routenest.app](https://routenest.app)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 Contributing

Contributions are welcome!  
Please open an issue or submit a pull request. For larger features, start a discussion first.

---

## 🙌 Acknowledgments

- [React](https://reactjs.org)
- [Leaflet.js](https://leafletjs.com)
- [OpenStreetMap](https://www.openstreetmap.org)
- [Material UI](https://mui.com)
- [Vite](https://vitejs.dev)

---

## 👤 Author

**RouteNest** — built with ❤️ by Harry
