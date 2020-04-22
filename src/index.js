import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/performance";
import * as serviceWorker from "./serviceWorker";
import firebaseConfig from "./firebaseConfig.json";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.analytics().logEvent("page_view");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
