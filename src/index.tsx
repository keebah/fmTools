import { Theme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";

import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <Theme
        accentColor="grass"
        grayColor="gray"
        panelBackground="solid"
        radius="full"
        scaling="100%"
      >
        <App />
      </Theme>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
