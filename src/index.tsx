import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./redux/store/store";
import { darkMode } from "@utils/darkMode";

darkMode();

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <div className="dark:text-slate-100">
      <App />
    </div>
  </Provider>
);

serviceWorker.unregister();
