import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, thunkApi) => {
    console.log(data);

    const formData = new FormData();
    formData.append("body", data.body);
    data.attachment.forEach((file) => {
      formData.append("attachment[]", file);
    });

    const totalFileSize = data.attachment.reduce(
      (acc, file) => acc + file.size,
      0
    );
    console.log(totalFileSize);
    try {
      await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
          const uploadedBytes = progressEvent.loaded;
          const totalBytes = progressEvent.total;
          const progress = Math.round((uploadedBytes / totalBytes) * 100);

          // Dispatch an action to update the progress state
          thunkApi.dispatch(
            setUploadProgress({
              showProgress: true,
              progress,
              uploadedBytes,
              totalBytes,
            })
          );
        },
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    } finally {
      // Dispatch to hide the progress indicator
      thunkApi.dispatch(setUploadProgress({ showProgress: false }));
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState().posts;
      const response = await axios.get(`/api/posts?page=${state.page}`);
      const fetchedPosts = response.data.data;
      if (fetchedPosts.length === 0) {
        thunkApi.dispatch(setHasMorePost(false));
        return state.posts;
      } else {
        thunkApi.dispatch(incrementPage());
        return [...state.posts, ...fetchedPosts];
      }
    } catch (error) {
      thunkApi.dispatch(clearPosts());
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const loadMorePost = createAsyncThunk(
  "posts/loadMorePost",
  async (_, thunkApi) => {
    await thunkApi.dispatch(getPosts());
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    uploadProgress: 0,
    uploadedBytes: 0,
    totalBytes: 0,
    showProgress: false,
    page: 1,
    hasMorePosts: true,
    errorMessage: {},
  },
  reducers: {
    clearState(state) {
      state.errorMessage = {};
      state.uploadProgress = 0;
      state.uploadedBytes = 0;
      state.totalBytes = 0;
    },
    setUploadProgress(state, action) {
      state.showProgress = action.payload.showProgress;
      if (action.payload.progress !== undefined) {
        state.uploadProgress = action.payload.progress;
        state.uploadedBytes = action.payload.uploadedBytes;
        state.totalBytes = action.payload.totalBytes;
      }
    },
    incrementPage: (state) => {
      state.page++;
    },
    setHasMorePost: (state, action) => {
      state.hasMorePosts = action.payload;
    },
    pushPosts: (state, action) => {
      state.posts.push(...action.payload);
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.uploadProgress = 0;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMessage = {};
        state.uploadProgress = 0;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.uploadProgress = 0;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  clearState,
  setUploadProgress,
  incrementPage,
  setHasMorePost,
  clearPosts,
} = postSlice.actions;
export default postSlice.reducer;
