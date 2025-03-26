import React, { useState } from "react";
import "@mui/material";
import "react-icons";
import { BsMoon, BsSun } from "react-icons/bs";
import "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import emailjs from "emailjs-com";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { theme } from "./theme"; // Import as a named export

import HelpView from "./components/views/HelpView"; 
import PostView from "./components/views/PostView";
import CreatePostView from "./components/views/CreatePostView";
import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ExploreView from "./components/views/ExploreView";
import PrivateRoute from "./components/PrivateRoute";
import SearchView from "./components/views/SearchView";
import MessengerView from "./components/views/MessengerView";
import { initiateSocketConnection } from "./helpers/socketHelper";

function App() {
  // Track theme mode
  const [mode, setMode] = useState("light");

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Initialize socket connection
  initiateSocketConnection();

  return (
    <ThemeProvider theme={theme(mode)}>
      <BrowserRouter>
        <CssBaseline />
        {/* Dark mode toggle button */}
        <div
  style={{
    position: "fixed", // Changed from absolute to fixed
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
  }}
>
  <button
    onClick={toggleTheme}
    style={{
      padding: "10px",
      fontSize: "16px",
      borderRadius: "50%",
      cursor: "pointer",
      backgroundColor: mode === "light" ? "#3f51b5" : "#444444",
      color: "#ffffff",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "50px",
      height: "50px",
    }}
  >
    {mode === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
  </button>
</div>

        <Routes>
          <Route path="/" element={<ExploreView />} />
          <Route path="/help" element={<HelpView />} /> {/* Add this route for Help */}
          <Route path="/posts/:id" element={<PostView />} />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <CreatePostView />
              </PrivateRoute>
            }
          />
          <Route
            path="/messenger"
            element={
              <PrivateRoute>
                <MessengerView />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchView />} />
          <Route path="/users/:id" element={<ProfileView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// Initialize EmailJS
emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);

export default App;
