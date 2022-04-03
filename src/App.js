import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import io from "socket.io-client";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App;