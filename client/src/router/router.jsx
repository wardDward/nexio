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
import ViewMedia from "../components/newsfeed/ViewMedia";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<NewsFeed />} />
      </Route>
      <Route path="/verify/email" element={<VerifyEmail />} />
      <Route path="/media/attachments/:id/*" element={<ViewMedia/>}/>
    </Route>
  )
);

export default router;
