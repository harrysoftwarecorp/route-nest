import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage, { tripLoader } from "./pages/LandingPage";
import { TripDetailPage } from "./pages/TripDetailPage";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    loader: tripLoader,
  },
  // {
  //   path: "/trip",
  //   element: <Layout />,
  //   children: [
  //     {
  //       element: <TripPage />,
  //       path: ":tripId",
  //       loader: tripDetailLoader,
  //     },
  //   ],
  // },
  // New enhanced trip detail page route
  {
    path: "/trip-detail/:tripId",
    element: <TripDetailPage />,
  },
  // Test route for the new trip detail page
  {
    path: "/test-trip-detail",
    element: <TripDetailPage />,
  },
  {
    path: "/test-map",
    element: <TripDetailPage />,
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
