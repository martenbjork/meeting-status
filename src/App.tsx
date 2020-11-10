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

const statuses = [
  {
    color: "green",
    message: "No meeting",
  },
  {
    color: "orange",
    message: "Audio call",
  },
  {
    color: "red",
    message: "Video call",
  },
];

function App() {
  const [currentStatus, setCurrentStatus] = useState(0);
  const ref = db.ref("users/1");

  const updateStatus = (status: number) => {
    ref.set({ status });
    setCurrentStatus(status);
  };

  const cycle = () => {
    let nextStatus = currentStatus + 1;
    if (nextStatus > statuses.length - 1) {
      nextStatus = 0;
    }
    updateStatus(nextStatus);
  };

  useEffect(() => {
    ref.on("value", function (snapshot) {
      const val = snapshot.val();
      if (val && typeof val.status === "number") {
        setCurrentStatus(val.status);
      }
    });
  });

  const status = statuses[currentStatus] || statuses[0];

  return (
    <div className="App" style={{ backgroundColor: status.color }}>
      <p onClick={cycle}>{status.message}</p>
    </div>
  );
}

export default App;
