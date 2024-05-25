import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../screens/auth/Login";
import MainLayout from "../layouts/MainLayout";
import NewsFeed from "../screens/NewsFeed";
import Register from "../screens/auth/Register";
import VerifyEmail from "../screens/email/VerifyEmail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<NewsFeed />} />
      </Route>
      <Route path="/verify/email" element={<VerifyEmail />} />
    </Route>
  )
);

export default router;
