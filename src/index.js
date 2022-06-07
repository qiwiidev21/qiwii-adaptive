import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/index.css";
import App from "./main/App";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
import "./utils/i18nextConf";

const Loader = () => <div>loading...</div>;

const firebaseConfig = {
  apiKey: "AIzaSyC22mJMmB9JeiXHeWQKnme12nWAEwxjm6k",
  authDomain: "qiwii-bd85e.firebaseapp.com",
  databaseURL: "https://qiwii-bd85e.firebaseio.com",
  projectId: "qiwii-bd85e",
  storageBucket: "qiwii-bd85e.appspot.com",
  messagingSenderId: "870706612213",
  appId: "1:870706612213:web:7b9eb33d5b446fd1a682bc",
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
