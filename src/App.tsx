import React, { useEffect, useState } from "react";
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.database();

function App() {
  const [state, setState] = useState("Offline");
  const ref = db.ref("users/1");

  const updateState = (state: string) => {
    ref.set({
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

  useEffect(() => {
    ref.on("value", function (snapshot) {
      const val = snapshot.val();
      setState(val.state);
    });
  });

  return (
    <div className="App">
      <p onClick={cycle}>{state}</p>
    </div>
  );
}

export default App;
