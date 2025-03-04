import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { UserContext } from "./UserContext";
import Store from "./Store";
import ProductList from "./ProductList";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

function App() {
  let [user, setUser] = useState({
    isLoggedIn: false,
    currentUser: null,
    currentUserName: null,
    currentUserRole: null,
  });

  const handleLogout = async () => {
    await signOut(auth);
    setUser({
      isLoggedIn: false,
      currentUser: null,
      currentUserName: null,
      currentUserRole: null,
    });
    alert("Logged Out!");
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
