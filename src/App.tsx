import React, { useEffect, useState } from "react";
import "./App.css";
import Status from "./Status";
import { v4 as uuidv4 } from "uuid";

function App() {
  let id: string;
  let isMirroring = false;

  const urlParams = new URLSearchParams(window.location.search);
  const mirrorId = urlParams.get("action");

  if (mirrorId) {
    id = mirrorId;
    isMirroring = true;
  } else if (window.localStorage) {
    let storedId = window.localStorage.getItem("id");
    if (storedId) {
      id = storedId;
    } else {
      id = uuidv4();
      window.localStorage.setItem("id", id);
    }
  } else {
    return <p>Please enable localStorage</p>;
  }

  return <Status id={id} isMirroring={isMirroring} />;
}

export default App;
