// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./app/App";
// import "./index.css";
// import { ThemeProvider } from "./processes/theme/theme-provider";
// import { Provider } from "react-redux";
// import { store } from "./app/store/store";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <Provider store={store}>
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>
//     </ThemeProvider>
//   </Provider>
// );

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store/store'
import { ThemeProvider } from './processes/theme/theme-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">


      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </ThemeProvider>
  </Provider>
)
