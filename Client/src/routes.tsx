import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/login";
import Error from "./Pages/error";
import Signup from "./Pages/signup";
import Home from "./Pages/home";
import Profile from "./Pages/profile";
import Post from "./Pages/Post";
import MyPhotos from "./Pages/myPhotos";
import ProtectedRoutes from "./components/ProtectedRoute";
import EditProfile from "./Pages/profile/editProfile";


export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: "/post",
        element: <Post />,
        errorElement: <Error />,
      },
      {
        path: "/myPhotos",
        element: <MyPhotos />,
        errorElement: <Error />,
      },
      {
        path: "/editProfile",
        element: <EditProfile />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Error />,
  },
]);

export default router;
