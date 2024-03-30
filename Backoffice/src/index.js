import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import ThemeContext from "./context/ThemeContext";
import { store } from "./store/store";
ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
      <SimpleReactLightbox>
        <BrowserRouter>
          <ThemeContext>
            <App />
          </ThemeContext>
        </BrowserRouter>
      </SimpleReactLightbox>
      </Provider> ,
  // </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
