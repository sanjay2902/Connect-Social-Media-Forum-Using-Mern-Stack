import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";
import Chatbot from "../Chatbot"; // Import the chatbot component

const faqData = [
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, go to the settings page and click on 'Reset Password'.",
    redirectTo: "/profile/settings",
  },
  {
    question: "How do I create a new post?",
    answer:
      "Click on the 'Create Post' button on your home page to share your thoughts or updates.",
    redirectTo: "/posts/create",
  },
  {
    question: "How can I update my profile?",
    answer:
      "You can update your profile by visiting your profile page and clicking 'Edit Profile'.",
    redirectTo: "/profile/edit",
  },
  {
    question: "How do I send a private message?",
    answer:
      "Click on a user's profile and choose the 'Send Message' option to start a conversation.",
    redirectTo: "/messenger",
  },
  {
    question: "How do I search for users?",
    answer:
      "Use the search bar at the top of the page to find users by name or username.",
    redirectTo: "/search",
  },
  
];

const HelpView = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Help Page
      </Typography>
      <Typography variant="body1" paragraph>
        To solve your queries, check here.
      </Typography>

      {/* FAQ Section */}
      <Box>
        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                {faq.answer}
              </Typography>
              {faq.redirectTo && (
                <Link
                  component={RouterLink}
                  to={faq.redirectTo}
                  color="primary"
                >
                  Click here to go to the relevant page
                </Link>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Chatbot Section */}
      <Box mt={4}>
        <Typography variant="body1" paragraph>
          Need further assistance? Talk with our bot, Ana , for personalized help.
        </Typography>
        <Chatbot />
      </Box>
    </Container>
  );
};

export default HelpView;
