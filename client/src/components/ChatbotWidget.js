// src/components/ChatbotWidget.js
import React, { useEffect } from "react";

const ChatbotWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://path-to-chatbot-provider.com/widget.js"; // Replace with actual script source
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // The widget is handled by the script
};

export default ChatbotWidget;
