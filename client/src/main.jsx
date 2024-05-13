import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store.js";

axios.defaults.baseURL = "http://api.nexio.test";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
