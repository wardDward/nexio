import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/userSlice";
import postSlice from "./feature/postSlice";
import attachmentSlice from "./feature/attachmentSlice";
import exploreSlice from "./feature/exploreSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    posts: postSlice,
    attachments: attachmentSlice,
    explores: exploreSlice,
  },
});

export default store;
