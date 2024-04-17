import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Modal from "react-modal";
import { Provider } from "react-redux";

import { store } from "./store/store";
Modal.setAppElement("#root");

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<Provider store={store}><App /></Provider>);