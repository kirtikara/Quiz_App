import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";   // Global CSS styles and theme

/**
 * Application Entry Point
 * 
 * This file bootstraps the React application by:
 * 1. Creating a React root using the new React 18 API
 * 2. Wrapping the App component with BrowserRouter for client-side routing
 * 3. Rendering the application to the DOM element with id "root"
 */

// Create React root for the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application with routing support
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
