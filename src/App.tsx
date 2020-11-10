import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAYuIsZwEi5jYRZG4mh-Ram-1PjQybLzys",
  authDomain: "meeting-status-d0db6.firebaseapp.com",
  databaseURL: "https://meeting-status-d0db6.firebaseio.com",
  projectId: "meeting-status-d0db6",
  storageBucket: "meeting-status-d0db6.appspot.com",
  messagingSenderId: "972106182315",
  appId: "1:972106182315:web:e18f2d708fe672ebb6d1ee",
};

var app = firebase.initializeApp(firebaseConfig);

var db = firebase.database();

function App() {
  const [state, setState] = useState("Offline");

  const updateState = (state: string) => {
    firebase.database().ref("users/1").set({
      state,
    });
    setState(state);
  };

  const cycle = () => {
    if (state === "In a meeting") {
      updateState("Offline");
    } else {
      updateState("In a meeting");
    }
  };

  return (
    <div className="App">
      <p onClick={cycle}>{state}</p>
    </div>
  );
}

export default App;
