import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage, { tripLoader } from "./pages/LandingPage";
import { Layout } from "./pages/Layout";
import TripPage, { tripDetailLoader } from "./pages/TripPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <LandingPage />,
        path: "/",
        loader: tripLoader,
      },
      {
        element: <TripPage />,
        path: "/trip/:tripId",
        loader: tripDetailLoader,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
