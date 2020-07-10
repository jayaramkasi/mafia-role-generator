import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/performance";
import * as serviceWorker from "./serviceWorker";
import firebaseConfig from "./firebaseConfig.json";

import store from "./redux/store";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.analytics().logEvent("page_view");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
