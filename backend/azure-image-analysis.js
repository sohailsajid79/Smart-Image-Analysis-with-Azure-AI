const { ImageAnalysisClient } = require("@azure-rest/ai-vision-image-analysis");
const createClient = require("@azure-rest/ai-vision-image-analysis").default;
const { AzureKeyCredential } = require("@azure/core-auth");

require("dotenv").config();

// Retrieve endpoint and key from environment variables
const endpoint = process.env["VISION_ENDPOINT"];
const key = process.env["VISION_KEY"];

const credential = new AzureKeyCredential(key); // AzureKeyCredential using the retrieved key
const client = createClient(endpoint, credential); // Client instance for image analysis

const features = ["Caption", "Read"];

// Function to analyse an image URL
async function analyzeImageFromUrl(imageUrl) {
  // Make a POST request to the Azure Image Analysis API
  const result = await client.path("/imageanalysis:analyze").post({
    body: {
      url: imageUrl, // The URL of the image to be analysed
    },
    queryParameters: {
      features: features,
    },
    contentType: "application/json", // the content type of the request
  });

  const iaResult = result.body; // Extract the response body

  // Check if the response contains a caption result
  if (iaResult.captionResult) {
    // Log the caption and its confidence score for debugging purposes
    console.log(
      `Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`
    );

    return iaResult.captionResult.text; // Return the caption text
  }
  return null; // Return null if no caption is found
}
function isConfigured() {
  return !!process.env["VISION_ENDPOINT"] && !!process.env["VISION_KEY"];
}

module.exports = { analyzeImageFromUrl, isConfigured };
