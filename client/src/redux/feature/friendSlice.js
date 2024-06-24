import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSuggestions = createAsyncThunk(
  "friends/getSuggetions",
  async () => {
    try {
      const response = await axios.get("/api/suggestions");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  "friends/sendFriendRequest",
  async (data, thunkApi) => {
    console.log(data);
    try {
      await axios.post("/api/add_friend", data);
    } catch (error) {
      console.error(error);
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "friends/acceptFriendRequest",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/api/accept_friend", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const friendSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    isLoading: false,
    page: 1,
    hasMoreData: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = action.payload;
      });
  },
});

export default friendSlice.reducer;
