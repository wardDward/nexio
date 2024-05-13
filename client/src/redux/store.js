import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/userSlice";
import postSlice from "./feature/postSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    posts: postSlice
  },
});

export default store;
