import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // FAQ data incorporated into chatbot responses
  const faqData = [
    {
      keywords: ["reset", "password"],
      response:
        "To reset your password, go to the settings page and click on 'Reset Password'.",
    },
    {
      keywords: ["create", "post"],
      response:
        "Click on the 'Create Post' button on your home page to share your thoughts or updates.",
    },
    {
      keywords: ["update", "profile"],
      response:
        "You can update your profile by visiting your profile page and clicking 'Edit Profile'.",
    },
    {
      keywords: ["send", "private message"],
      response:
        "Click on a user's profile and choose the 'Send Message' option to start a conversation.",
    },
    {
      keywords: ["search", "users"],
      response:
        "Use the search bar at the top of the page to find users by name or username.",
    },
    {
      keywords: ["block", "someone"],
      response:
        "Go to the user's profile and click 'Block'. This will prevent them from seeing your posts.",
    },
    {
      keywords: ["notifications"],
      response:
        "Notifications alert you when someone interacts with your posts or when you receive messages.",
    },
  ];

  // Fallback responses
  const fallbackResponses = [
    "I'm sorry, I couldn't find the information you're looking for. Could you ask differently?",
    "I didn't understand that. Could you rephrase?",
    "I’m not sure about that, but I’m here to help! Can you clarify?",
  ];

  // Function to detect user intent and return the appropriate response
  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    // Check if the message matches any FAQ
    for (const faq of faqData) {
      if (faq.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return faq.response;
      }
    }

    // Return a fallback response if no match is found
    return fallbackResponses[
      Math.floor(Math.random() * fallbackResponses.length)
    ];
  };

  // Handle opening the chatbot and sending a greeting message
  const handleOpen = () => {
    setIsOpen(true);
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "Hello! I'm Ana Adan, your assistant. How can I help you today?",
      },
    ]);
  };

  // Handle sending messages
  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Add chatbot response to chat
    const botResponse = getResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);

    setInput("");
  };

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {isOpen ? (
        <Paper
          elevation={4}
          sx={{
            width: 300,
            height: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {/* Chat Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Ana Adan</Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              mb: 2,
              border: "1px solid #ccc",
              borderRadius: "5px",
              p: 1,
            }}
          >
            {messages.map((msg, index) => (
              <Typography
                key={index}
                align={msg.sender === "user" ? "right" : "left"}
                sx={{
                  mb: 1,
                  backgroundColor:
                    msg.sender === "user" ? "#d1e7ff" : "#f1f1f1",
                  display: "inline-block",
                  borderRadius: "10px",
                  padding: "5px 10px",
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>

          {/* Chat Input */}
          <Box display="flex" alignItems="center">
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
              Send
            </Button>
          </Box>
        </Paper>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Chat with Ana Adan
        </Button>
      )}
    </Box>
  );
};

export default Chatbot;
