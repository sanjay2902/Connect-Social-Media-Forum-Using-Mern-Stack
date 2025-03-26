import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Copyright from "./Copyright";

const Footer = () => {
  const quotes = [
    "Believe in yourself and all that you are.",
    "You are capable of amazing things.",
    "Every day is a new beginning.",
    "Push yourself, because no one else is going to do it for you.",
    "Dream it. Wish it. Do it.",
    "Stay positive, work hard, and make it happen.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "Act as if what you do makes a difference. It does.",
    "Keep going. Everything you need will come to you at the perfect time."
  ];

  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 30000); // Change quote every 30 seconds

    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <Box pb={3}>
      <Card>
        <Typography variant="subtitle1" align="center" p={2}>
          {quote}
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
