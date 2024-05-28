const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID,
});

// Function to generate an image based on a prompt
const generateImage = async (prompt) => {
  try {
    // Make a request to the OpenAI API to generate an image
    const response = await openai.images.generate({
      model: "dall-e-3", // Use the DALL-E model to generate the image
      prompt: prompt, // Pass the prompt provided by the user
      n: 1, // Number of images to generate
      size: "1024x1024",
    });
    //console.log(response.data); // Log the response data for debugging

    // Extract and return the URL of the generated image
    const imageUrl = response.data.data[0].url;
    const revisedPrompt = response.data.prompt;

    return { imageUrl, revisedPrompt }; // Return the URL and revised prompt of the generated image
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error generating image:", error); // Log the error message
    throw new Error("Failed to generate image"); // Throw a new error to be handled by the calling function
  }
};

// Export the generateImage function so it can be used in other parts of the application
module.exports = { generateImage };
