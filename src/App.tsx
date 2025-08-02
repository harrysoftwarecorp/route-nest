import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage, { tripLoader } from "./pages/LandingPage";
import { Layout } from "./pages/Layout";
import TripPage, { tripDetailLoader } from "./pages/TripPage";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    loader: tripLoader,
  },
  {
    path: "/trip",
    element: <Layout />,
    children: [
      {
        element: <TripPage />,
        path: ":tripId",
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
