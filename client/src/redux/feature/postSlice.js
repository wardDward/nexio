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
            setUploadProgress({ showProgress: true ,progress, uploadedBytes, totalBytes })
          );
        },
      })
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.errors);
    }finally {
      // Dispatch to hide the progress indicator
      thunkApi.dispatch(setUploadProgress({ showProgress: false }));
    }
  }
);


export const getPosts = createAsyncThunk('posts/getPosts', async() => {
  try {
    const response = await axios.get('/api/posts')
    console.log(response);
    return response.data.data
  } catch (error) {
    console.error(error);
  }
})

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    uploadProgress: 0,
    uploadedBytes: 0,
    totalBytes: 0,
    showProgress: false,
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
        state.isLoading = true
      })
      .addCase(getPosts.fulfilled, (state,action) => {
        state.isLoading = false
        state.posts = action.payload
      })
  },
});

export const { clearState, setUploadProgress } = postSlice.actions;
export default postSlice.reducer;
