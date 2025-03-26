import {
  Button,
  Card,
  Stack,
  TextField,
  Typography,
  Box,
  Popover,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic"; // Import Mic icon
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();
  const [recognition, setRecognition] = useState(null);
  const contentBoxRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFormData((prevFormData) => ({
          ...prevFormData,
          content: prevFormData.content + " " + transcript,
        }));
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};
    return errors;
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const handleContentClick = (event) => {
    setAnchorEl(event.currentTarget);
  
    // Get the title from formData and convert to lowercase
    const title = formData.title.toLowerCase();
  
    // Split the title into individual words
    const titleWords = title.split(/\s+/);
  
    // Initialize suggestions array
    let dynamicSuggestions = [];
  
    // Define category-based keyword matching
    const travelKeywords = ["travel", "explore", "trip", "vacation", "adventure"];
    const foodKeywords = ["food", "eat", "cook", "meal", "recipe", "dine"];
    const workoutKeywords = ["workout", "fitness", "gym", "exercise", "health", "training"];
    const motivationKeywords = ["motivation", "inspire", "strength", "goals", "success"];
    const natureKeywords = ["nature", "outdoor", "mountain", "forest", "ocean"];
    const humorKeywords = ["funny", "joke", "laugh", "humor", "comedy"];
  
    // Function to check if any word from title matches category keywords
    const checkCategoryKeywords = (keywords) => {
      return titleWords.some(word => keywords.includes(word));
    };
  
    // Check for each category and assign relevant suggestions
    if (checkCategoryKeywords(travelKeywords)) {
      dynamicSuggestions = [
        "Exploring new places!",
        "Travel makes the soul richer.",
        "Another day, another destination.",
        "The world is waiting for you."
      ];
    } else if (checkCategoryKeywords(foodKeywords)) {
      dynamicSuggestions = [
        "Delicious moments!",
        "A feast for the senses.",
        "Cooking up something special.",
        "Let’s eat!"
      ];
    } else if (checkCategoryKeywords(workoutKeywords)) {
      dynamicSuggestions = [
        "Push harder today!",
        "Fitness is a journey.",
        "Stronger every day.",
        "Sweat now, shine later."
      ];
    } else if (checkCategoryKeywords(motivationKeywords)) {
      dynamicSuggestions = [
        "Believe in yourself.",
        "Dreams don’t work unless you do.",
        "Keep going, your future self will thank you.",
        "Stay focused, stay positive."
      ];
    } else if (checkCategoryKeywords(natureKeywords)) {
      dynamicSuggestions = [
        "The best views come after the hardest climbs.",
        "Nature is the art of God.",
        "Take only pictures, leave only footprints.",
        "The earth has music for those who listen."
      ];
    } else if (checkCategoryKeywords(humorKeywords)) {
      dynamicSuggestions = [
        "Life is short. Smile while you still have teeth.",
        "I’m on a seafood diet. I see food and I eat it.",
        "I’m not arguing. I’m just explaining why I’m right.",
        "Don’t worry if plan A doesn’t work out. There are 25 more letters in the alphabet."
      ];
    } else {
      dynamicSuggestions = [
        "Excited for this!",
        "Another day, another adventure!",
        "Stay tuned!"
      ];
    }
  
    setSuggestions(dynamicSuggestions);
  };
  

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: prevFormData.content + " " + suggestion,
    }));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <Stack spacing={2} padding={2}>
        {user && (
          <HorizontalStack spacing={2}>
            <UserAvatar width={50} height={50} username={user.username} />
            <Typography variant="h5">
              What would you like to post today, {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Typography>
          <a href="https://commonmark.org/help/" target="_blank" rel="noopener noreferrer">
            Markdown Help
          </a>
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={10}
            name="content"
            margin="normal"
            value={formData.content}
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={errors.content}
            required
            onClick={handleContentClick}
            inputRef={contentBoxRef}
          />
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <List>
              {suggestions.map((suggestion, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Popover>
          <Button
            variant="outlined"
            onClick={startListening}
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
            }}
            startIcon={<MicIcon />} // Add microphone icon here
          >
            Voice Listening
          </Button>
          <ErrorAlert error={serverError} />
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
            }}
          >
            {loading ? <>Submitting</> : <>Submit</>}
          </Button>
        </Box>

        {/* Preview Section */}
        <Box mt={3}>
          <Typography variant="h6">Preview:</Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            {formData.content || "No content yet..."}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
