import React, { useState } from "react";
import "./App.css";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

function App() {
  const [input, setInput] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleAnalyseImage = () => {
    // Call the image analysis function here
    console.log("Image analysis triggered with URL/Prompt:", input);
  };

  const handleGenerateImage = () => {
    // Call the image generation function here
    console.log("Image generation triggered with URL/Prompt:", input);
  };

  return (
    <div className="App">
      <Container maxWidth="sm" className="app-container">
        <Box textAlign="center" mt={5}>
          <Typography variant="h3" gutterBottom>
            Computer Vision
          </Typography>
          <TextField
            value={input}
            onChange={handleInputChange}
            onClick={(e) => setCursorPosition(e.target.selectionStart)}
            placeholder="Enter image URL or text to generate image"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            inputProps={{ style: { textAlign: "center", fontSize: "1.2em" } }}
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAnalyseImage}
            >
              Analyse Image
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGenerateImage}
              style={{ marginLeft: "10px" }}
            >
              Generate Image
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
