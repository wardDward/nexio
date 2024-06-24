import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const likePost = createAsyncThunk(
  "likes/likePost",
  async (post, thunkApi) => {
    try {
      const response = await axios.post(`/api/posts/${post.id}/like`);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

const likeSlice = createSlice({
  name: "likes",
  initialState: {
    likes: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default likeSlice.reducer;
