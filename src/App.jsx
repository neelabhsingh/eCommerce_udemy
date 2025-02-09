import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Use BrowserRouter
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import Dashboard from "./Dashboard";
import "jquery";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./index.css";
import NavBar from "./NavBar";
function App() {
  return (
    <BrowserRouter>
      <NavBar />

      {/* ✅ Change HashRouter to BrowserRouter */}
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
