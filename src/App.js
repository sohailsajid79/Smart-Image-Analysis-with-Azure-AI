import React, { useState } from "react";
import "./App.css";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAnalyseImage = () => {
    // Call the image analysis function here
    setOutput(`Analysis result for: ${input}`);
  };

  const handleGenerateImage = () => {
    // Call the image generation function here
    setOutput(`Generated image for: ${input}`);
  };

  const handleRefresh = () => {
    setInput("");
    setOutput("");
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
            placeholder="Please enter the image URL or a prompt to create an image."
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            inputProps={{ style: { textAlign: "center", fontSize: "1.2em" } }}
          />
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
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
            <IconButton
              onClick={handleRefresh}
              color="primary"
              style={{ marginLeft: "10px" }}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
          {output && (
            <Box mt={4}>
              <Paper elevation={3} className="output-box">
                <Typography variant="h6" gutterBottom>
                  Output
                </Typography>
                <Typography variant="body1">{output}</Typography>
              </Paper>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
