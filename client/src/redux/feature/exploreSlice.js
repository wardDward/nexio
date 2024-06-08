import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const storeExplore = createAsyncThunk(
  "explores/storeExplore",
  async (data, thunkApi) => {
    try {
      // console.log(data);
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

export const getExplores = createAsyncThunk(
  "explores/getExplores",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/api/explores");
      return response.data.data;
    } catch (error) {
      thunkApi.dispatch(clearExplores());
      console.log(error);
    }
  }
);

export const specificExplores = createAsyncThunk(
  "explores/specificExplores",
  async (data, thunkApi) => {
    console.log(data);
    try {
      const response = await axios.get(
        `/api/explore_attachments/${data.firstSegment}/${data.path}`
      );

      console.log(response);
    } catch (error) {
      console.error(error);
      thunkApi.dispatch(clearExplores());
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

const exploreSlice = createSlice({
  name: "explores",
  initialState: {
    explores: [],
    isLoadingStoring: false,
    isLoadingfetching: false,
    errorMesssage: [],
  },
  reducers: {
    clearExplores: (state) => {
      state.explores = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeExplore.pending, (state) => {
        state.isLoadingStoring = true;
      })
      .addCase(storeExplore.fulfilled, (state) => {
        state.isLoadingStoring = false;
        state.errorMessage = [];
      })
      .addCase(storeExplore.rejected, (state, action) => {
        state.isLoadingStoring = false;
        state.errorMessage = action.payload;
      })
      .addCase(getExplores.pending, (state) => {
        state.isLoadingfetching = true;
      })
      .addCase(getExplores.fulfilled, (state, action) => {
        state.isLoadingfetching = false;
        state.explores = action.payload;
      });
  },
});

export const { clearExplores } = exploreSlice.actions;
export default exploreSlice.reducer;
