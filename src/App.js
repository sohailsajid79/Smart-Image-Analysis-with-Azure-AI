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
  CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAnalyseImage = async () => {
    if (!input) {
      setImageUrl("");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: input }),
      });
      const data = await response.json();
      if (data.caption) {
        //console.log(`Analysis result for: ${input}`);
        setOutput(`Caption: ${data.caption}`);
        setImageUrl(input); // Store the image URL
      } else {
        //console.log(`No caption found for: ${input}`);
        setOutput("No caption found.");
        setImageUrl(""); // Clear the image URL if no caption is found
      }
    } catch (error) {
      //console.error("Error analyzing image:", error);
      setOutput("Error analyzing image.");
      setImageUrl(""); // Clear the image URL on error
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = () => {
    setOutput(`Generated image for: ${input}`);
    setImageUrl(input); // Store the image URL
  };

  const handleRefresh = async () => {
    // Clear the client-side state
    setInput("");
    setOutput("");
    setImageUrl("");

    // Make a request to the backend to clear/reset data
    try {
      await fetch("http://localhost:5001/clear-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error clearing request:", error);
    }
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
              disabled={loading} // Disable the button when loading
            >
              Analyse Image
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGenerateImage}
              style={{ marginLeft: "10px" }}
              disabled={loading} // Disable the button when loading
            >
              Generate Image
            </Button>
            <IconButton
              onClick={handleRefresh}
              color="primary"
              style={{ marginLeft: "10px" }}
              disabled={loading} // Disable the button when loading
            >
              <RefreshIcon />
            </IconButton>
          </Box>
          {loading && (
            <Box mt={4} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {output && !loading && (
            <Box mt={4}>
              <Paper elevation={3} className="output-box">
                <Typography variant="h6" gutterBottom>
                  Output
                </Typography>
                <Typography variant="body1">{output}</Typography>
              </Paper>
            </Box>
          )}
          {imageUrl && !loading && (
            <Box mt={4}>
              <img src={imageUrl} alt="Analyzed" style={{ maxWidth: "100%" }} />
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
