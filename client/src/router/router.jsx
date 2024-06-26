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
import ExploreFeed from "../screens/ExploreFeed";
import SuggestionFriends from "../screens/SuggestionFriends";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute/>}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/explore" element={<ExploreFeed />} />
          <Route path="/suggestions" element={<SuggestionFriends />} />
        </Route>

        <Route path="/verify/email" element={<VerifyEmail />} />
        <Route path="/media/attachments/:id/*" element={<ViewMedia />} />
      </Route>
    </Route>
  )
);

export default router;
