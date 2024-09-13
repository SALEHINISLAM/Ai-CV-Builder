import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInUser from "./auth/signIn/signIn.jsx";
import Home from "./Pages/Home/Home.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./Pages/Dashboard/resume/[resume]/edit/index.jsx";
import MyResume from "./Pages/Dashboard/MyResume/MyResume.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path:'/dashboard/resume/:resume/edit',
        element:<EditResume/>
      },
      {
        path:`/dashboard/myResume/:id`,
        element:<MyResume/>
      }
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/signIn",
    element: <SignInUser />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
