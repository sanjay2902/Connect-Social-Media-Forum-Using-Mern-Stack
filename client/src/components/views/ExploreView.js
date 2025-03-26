import { Container, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PostBrowser from "../PostBrowser";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Import Help icon

const ExploreView = () => {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate("/help"); // Navigate to the help page
  };

  return (
    <Container sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* GridLayout with PostBrowser on the left and Sidebar on the right */}
      <GridLayout
        left={<PostBrowser createPost contentType="posts" />}
        right={<Sidebar />}
      />

      {/* Help Icon Button positioned at the bottom-right corner */}
      <IconButton
        onClick={handleHelpClick} // On click, navigate to /help
        sx={{
          position: "fixed", // Keep the button fixed in the viewport
          bottom: 16, // Position it 16px from the bottom
          right: 16, // Position it 16px from the right
          zIndex: 1000, // Ensure it stays on top of other content
          bgcolor: "secondary.main", // Button background color
          color: "white", // Icon color
          "&:hover": {
            bgcolor: "secondary.dark", // Darker background color on hover
          },
        }}
      >
        <HelpOutlineIcon /> {/* Help icon */}
      </IconButton>
    </Container>
  );
};

export default ExploreView;
