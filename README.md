# 🗺️ RouteNest

**RouteNest** is a modern web application for planning, saving, and sharing custom travel routes. Designed for travelers, bikers, and road trip enthusiasts, it lets you create multi-point journeys on an interactive map, organize your trips, and revisit them anytime.

Built with **React + Vite**, styled using **Material UI**, and powered by **Leaflet** and **OpenStreetMap** for dynamic, open-source mapping.

---

## 🚀 Features

- Interactive map powered by Leaflet + OpenStreetMap
- Route planning with multiple waypoints
- Save and organize routes with names and tags
- Visualize and revisit saved routes
- Add notes and details to each trip
- Share route previews with others
- Optimized for motorbike tours and custom trip planning

---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI Framework:** Material UI (MUI)
- **Mapping:** Leaflet, Leaflet Routing Machine
- **Map Source:** OpenStreetMap
- **State Management:** React Context (Zustand optional)
- **Storage:** LocalStorage (backend integration in progress)

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/routenest.git
cd routenest
npm install
```

### Running the App

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```text
src/
├── components/       # UI & map widgets (Material UI + Leaflet)
├── pages/            # Route-based views (Home, Planner, Saved)
├── types/            # TypeScript types and interfaces
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── context/          # App-level state
├── App.tsx           # Main shell
└── main.tsx          # Vite entry point
```

---

## 🧪 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint code
```

---

## 🧭 Roadmap

- [x] Create and visualize routes with waypoints
- [x] Save routes locally with metadata
- [ ] Add notes and photos to routes
- [ ] User authentication (backend in progress)
- [ ] Cloud sync and multi-device support
- [ ] Export routes to GPX/KML
- [ ] Mobile-first responsive UI

---

## 🛠 Core Dependencies

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

> 🚧 Demo coming soon: [https://routenest.app](https://routenest.app)

---

## 📄 License

MIT License

---

## 🧑‍💻 Contributing

Contributions are welcome!  
Open an issue or submit a pull request. For major changes, please start a discussion first.

---

## 🙌 Acknowledgments

- [React](https://reactjs.org)
- [Leaflet.js](https://leafletjs.com)
- [OpenStreetMap](https://www.openstreetmap.org)
- [Material UI](https://mui.com)
- [Vite](https://vitejs.dev)

---

## 👤 Author

Built with ❤️ by Harry

## 👤 Author

**RouteNest** — built with ❤️ by Harry
