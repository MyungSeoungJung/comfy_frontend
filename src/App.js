import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./reset.css";
import Login from "./component/Login.js";
import Signup from "./component/Signup.js";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
