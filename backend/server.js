const express = require("express");
const bodyParser = require("body-parser");
const { analyzeImageFromUrl } = require("./azure-image-analysis");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/analyze-image", async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const caption = await analyzeImageFromUrl(imageUrl);
    res.json({ caption });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post("/clear-request", (req, res) => {
  res.json({ message: "Request cleared" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
