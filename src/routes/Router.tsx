import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Nav } from "../components/Nav"
import { Home } from "../pages/Home"
import { Analytic } from "../pages/Analytics"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/analytic", element: <Analytic /> }
    ]
  }
])

export function Router() {
  return <RouterProvider router={router} />
}
