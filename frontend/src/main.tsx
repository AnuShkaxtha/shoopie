import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./index.css";
import { ThemeProvider } from "./processes/theme/theme-provider";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
