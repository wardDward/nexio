import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "users/login",
  async (credentials, thunkApi) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      await thunkApi.dispatch(authenticated());
    } catch (error) {
      credentials.password = "";
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const authenticated = createAsyncThunk(
  "users/authenticated",
  async () => {
    try {
      await axios.get("sanctum/csrf-cookie");
      const response = await axios.get("/api/user");
      return response.data;
    } catch (error) {
      localStorage.removeItem("auth");
      alert("Something Went Wrong");
      window.location.replace("/login");
    }
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (data, thunkApi) => {
    try {
      await axios.get("sanctum/csrf-cookie");
      await axios.post("/register", data);
      await thunkApi.dispatch(authenticated());
    } catch (error) {
      data.password = "";
      data.password_confirmation = "";
      return thunkApi.rejectWithValue(error.response.data.errors);
    }
  }
);

export const resendEmailVerification = createAsyncThunk(
  "users/resendEmailVerification",
  async () => {
    try {
      await axios.post("/email/verification-notification");
    } catch (error) {
      console.error(error);
    }
  }
);

export const countUnreadNotification = createAsyncThunk(
  "user/countUnreadNotification",
  async () => {
    try {
      const response = await axios.get("/api/unread_notification");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getNotification = createAsyncThunk(
  "user/getNotification",
  async () => {
    try {
      const response = await axios.get("/api/notification");
      return response.data.notifications.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const readNotitication = createAsyncThunk(
  "user/getNotification",
  async () => {
    try {
      const response = await axios.get("/api/read_notification");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);


const userSlice = createSlice({
  name: "users",
  initialState: {
    user: {},
    authFlag: JSON.parse(localStorage.getItem("auth")) || null,
    isLoading: false,
    notification_count: 0,
    notifications: [],
    errorMessage: {},
  },
  reducers: {
    clearState: (state) => {
      state.user = {};
      state.authFlag = false;
      state.isLoading = false;
      state.errorMessage = {};
    },
    incrementNotification: (state) => {
      state.notification_count++
    },
    clearNotification: (state) => {
      state.notification_count = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = {};
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMessage = {};
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.errorMessage = {};
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(authenticated.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticated.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem("auth", JSON.stringify(true));
      })
      .addCase(authenticated.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(resendEmailVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resendEmailVerification.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendEmailVerification.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(countUnreadNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(countUnreadNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notification_count = action.payload.unreadNotification;
      })
      .addCase(getNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      });
  },
});

export const { clearState,incrementNotification,clearNotification } = userSlice.actions;
export default userSlice.reducer;
