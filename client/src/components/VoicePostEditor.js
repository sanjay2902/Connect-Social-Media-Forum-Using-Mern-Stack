// src/components/VoicePostEditor.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Stack } from '@mui/material';

const VoicePostEditor = ({ onPost }) => {
  const [postContent, setPostContent] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Your browser does not support Speech Recognition API.');
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setPostContent(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.abort();
    };
  }, [isListening]);

  const handlePost = () => {
    onPost(postContent); // You can handle the post submission here
    setPostContent(''); // Clear content after posting
  };

  return (
    <Stack spacing={2}>
      <TextField
        variant="outlined"
        multiline
        rows={4}
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Write your post here..."
      />
      <Button variant="contained" onClick={() => setIsListening(prev => !prev)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      <Button variant="contained" onClick={handlePost}>
        Post
      </Button>
    </Stack>
  );
};

export default VoicePostEditor;
