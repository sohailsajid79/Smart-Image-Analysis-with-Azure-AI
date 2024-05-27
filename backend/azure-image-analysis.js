const { ImageAnalysisClient } = require("@azure-rest/ai-vision-image-analysis");
const createClient = require("@azure-rest/ai-vision-image-analysis").default;
const { AzureKeyCredential } = require("@azure/core-auth");

require("dotenv").config();

const endpoint = process.env["VISION_ENDPOINT"];
const key = process.env["VISION_KEY"];

const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const features = ["Caption", "Read"];

async function analyzeImageFromUrl(imageUrl) {
  const result = await client.path("/imageanalysis:analyze").post({
    body: {
      url: imageUrl,
    },
    queryParameters: {
      features: features,
    },
    contentType: "application/json",
  });

  const iaResult = result.body;

  if (iaResult.captionResult) {
    console.log(
      `Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`
    );

    return iaResult.captionResult.text;
  }
  return null;
}

module.exports = { analyzeImageFromUrl };
