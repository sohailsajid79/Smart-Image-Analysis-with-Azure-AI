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
  const [input, setInput] = useState(""); // State to store the user input
  const [output, setOutput] = useState(""); // State to store the output message
  const [imageUrl, setImageUrl] = useState(""); // State to store the generated or analyzed image URL
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  // Function to handle input change in the text field
  const handleInputChange = (e) => {
    setInput(e.target.value); // Update the input state with the new value
  };

  // Function to handle analysing an image URL
  const handleAnalyseImage = async () => {
    // Check if input is empty
    if (!input.trim()) {
      setOutput("Please enter a valid image URL or prompt.");
      setImageUrl("");
      return;
    }
    setLoading(true); // Set loading to true to show the loading indicator
    try {
      // Make a POST request to the analyze-image endpoint with the input URL
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
        setOutput(`Caption: ${data.caption}`); // Set the output state with the caption
        setImageUrl(input); // Store the image URL in state
      } else {
        //console.log(`No caption found for: ${input}`);
        setOutput("No caption found."); // Handle case when no caption is found
        setImageUrl(""); // Clear the image URL if no caption is found
      }
    } catch (error) {
      //console.error("Error analyzing image:", error);
      setOutput("Error analysing image."); // Handle any errors during the fetch
      setImageUrl(""); // Clear the image URL on error
    } finally {
      setLoading(false); // Set loading to false to hide the loading indicator
    }
  };

  // Function to handle generating an image from a prompt
  const handleGenerateImage = async () => {
    // Check if input is empty
    if (!input.trim()) {
      setOutput("Please enter a valid image prompt.");
      setImageUrl("");
      return;
    }

    setLoading(true); // Set loading to true to show the loading indicator
    try {
      // Make a POST request to the generate-image endpoint with the input prompt
      const response = await fetch("http://localhost:5001/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json(); // Parse the JSON response
      if (data.imageUrl) {
        // Set the output state with the input prompt
        setOutput(`Generated image for: ${input}`);
        setImageUrl(data.imageUrl); // Store the generated image URL in state
      } else {
        setOutput("No image generated."); // Handle case when no image is generated
        setImageUrl(""); // Clear the image URL
      }
    } catch (error) {
      setOutput("Error generating image."); // Handle any errors during the fetch
      setImageUrl(""); // Clear the image URL on error
    } finally {
      setLoading(false); // Set loading to false to hide the loading indicator
    }
  };

  // Function to handle refreshing the app state
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
      console.error("Error clearing request:", error); // Log any errors during the fetch request
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
            value={input} // Bind the value of the text field to the input state
            onChange={handleInputChange} // Call handleInputChange on text field change
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
              <img
                src={imageUrl}
                alt="Generated"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
