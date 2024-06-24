import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createComment = createAsyncThunk(
  "comments/createCommnets",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/api/comments", data);
      return response.data 
      // console.log(response);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const fetchComment = createAsyncThunk(
  "commnets/fetchComment",
  async (data, thunkApi) => {
    try {
      const response = await axios.get(`/api/comments/${data.post_id}`);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return thunkApi.dispatch(clearExplores());
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: false,
    errorMessage: {},
  },
  reducers: {
    clearExplores: (state) => {
      state.comments = [];
    },
    pushComment: (state, action) => {
      state.comments = [...state.comments, ...action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(fetchComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      });
  },
});

export const { clearExplores,pushComment } = commentSlice.actions;
export default commentSlice.reducer;
