import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPostAttachment = createAsyncThunk(
  "posts/getPostAttactment",
  async ({ id, path }, thunkApi) => {
    try {
      const response = await axios.get(`/api/media_attachments/${id}/${path}`);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const attachmentSlice = createSlice({
  name: "attachments",
  initialState: {
    attachments: [],
    attachment: "",
    isLoading: false,
    errorMessage: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostAttachment.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = {};
      })
      .addCase(getPostAttachment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attachments = action.payload.allAttachments;
        state.attachment = action.payload.post_attachment;
      });
  },
});

export default attachmentSlice.reducer;
