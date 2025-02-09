import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use "react-dom/client" instead of "react-dom"
import "jquery";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import"./index.css";
import App from "./App.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
