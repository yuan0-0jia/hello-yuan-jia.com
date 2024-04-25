import Homepage from "./pages/Homepage";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ScrollRestoration } from "react-router-dom";

import Photos from "./pages/Photos";
import About from "./pages/About";
import ProjectBPM from "./pages/ProjectBPM";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import Settings from "./pages/Settings";
import UserSetting from "./pages/Settings/UserSetting";
import ProjectSetting from "./pages/Settings/ProjectSetting";
import AboutSetting from "./pages/Settings/AboutSetting";
import PhotoSetting from "./pages/Settings/PhotoSetting";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: (
      <>
        <AppLayout />
        <ScrollRestoration />
      </>
    ),
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/photos",
        element: <Photos />,
      },
      {
        path: "/bpm",
        element: <ProjectBPM />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="/settings/user" />,
      },
      {
        path: "/settings/user",
        element: <UserSetting />,
      },
      {
        path: "/settings/projects",
        element: <ProjectSetting />,
      },
      {
        path: "/settings/about",
        element: <AboutSetting />,
      },
      {
        path: "/settings/photos",
        element: <PhotoSetting />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#FFFFFF",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
