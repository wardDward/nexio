import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const storeExplore = createAsyncThunk(
  "explores/storeExplore",
  async (data, thunkApi) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("caption", data.caption);
      data.attachment.forEach((file) => {
        formData.append("attachment[]", file);
      });
      await axios.post("/api/explores", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error(error);
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

const exploreSlice = createSlice({
  name: "explores",
  initialState: {
    explores: [],
    isLoading: false,
    errorMesssage: [],
  },
  reducers: {},
    extraReducers: (builder) => {
      builder.addCase(storeExplore.pending, (state) => {
        state.isLoading = true
      })
      .addCase(storeExplore.fulfilled, (state, action) => {
        state.isLoading = false
        state.explores = action.payload
        state.errorMessage = []
      })
      .addCase(storeExplore.rejected, (state,action) => {
        state.isLoading = false
        state.errorMessage = action.payload
      })
    },
});

export default exploreSlice.reducer;
