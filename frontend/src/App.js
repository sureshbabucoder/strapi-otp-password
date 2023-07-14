import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateProduct from "./components/CreateProduct";
import LoginOtp from "./components/LoginOtp";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = (bool) => {
    setIsAuthenticated(true);
  };
  const handleLogout = (bool) => {
    localStorage.removeItem("token");
    setIsAuthenticated(bool);
  };

  return (
    <div className="App">
      <Navbar onLogout={handleLogout}/>
      <Routes>
        <Route path="/login" element={<LoginOtp onLogin={handleLogin}/>} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Home />} path="/" />
          <Route element={<CreateProduct />} path="/create-product" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

