const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser to parse incoming request bodies
const { analyzeImageFromUrl } = require("./azure-image-analysis"); // Import the analyzeImageFromUrl function from azure-image-analysis module
const { generateImage } = require("./azure-image-generation"); // Import the generateImage function from azure-image-generation module
const cors = require("cors"); // Import the CORS middleware

require("dotenv").config(); // Load environment variables from a .env file

const app = express();
const port = process.env.PORT || 5001;

// List of allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://white-meadow-001b8af03.5.azurestaticapps.net",
];

// Configure CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Check if the origin is in the allowed origins list
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false); // Reject the request if the origin is not allowed
    }
    return callback(null, true); // Allow the request if the origin is allowed
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use the CORS middleware with the defined options
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies

// Endpoint to analyse an image URL
app.post("/analyze-image", async (req, res) => {
  const { imageUrl } = req.body; // Extract the imageUrl from the request body
  try {
    const caption = await analyzeImageFromUrl(imageUrl); // Call the analyzeImageFromUrl function with the imageUrl
    res.json({ caption }); // Send the caption as a JSON response
  } catch (error) {
    res.status(500).send(error.toString()); // Send a 500 status with the error message if something goes wrong
  }
});

// Endpoint to generate an image from a prompt
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body; // Extract the prompt from the request body
  try {
    const { imageUrl } = await generateImage(prompt); // Call the generateImage function with the prompt
    res.json({ imageUrl }); // Send the generated imageUr as a JSON response
  } catch (error) {
    res.status(500).send(error.toString()); // Send a 500 status with the error message if something goes wrong
  }
});

// Endpoint to clear/reset any data (for example purposes)
app.post("/clear-request", (req, res) => {
  res.json({ message: "Request cleared" }); // Send a JSON response indicating the request has been cleared
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log a message to the console indicating the server is running
});
