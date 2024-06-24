import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/userSlice";
import postSlice from "./feature/postSlice";
import attachmentSlice from "./feature/attachmentSlice";
import exploreSlice from "./feature/exploreSlice";
import likeSlice from "./feature/likeSlice";
import commentSlice from "./feature/commentSlice/commentSlice";
import friendSlice from "./feature/friendSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    posts: postSlice,
    attachments: attachmentSlice,
    explores: exploreSlice,
    likes: likeSlice,
    comments: commentSlice,
    friends: friendSlice
  },
});

export default store;
