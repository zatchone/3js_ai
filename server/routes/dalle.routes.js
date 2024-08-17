import express from 'express';
import * as dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference';

dotenv.config();

const router = express.Router();

const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await hf.textToImage({
      inputs: prompt,
      model: "stabilityai/stable-diffusion-2",
      parameters: {
        negative_prompt: "blurry, bad",
      },
    });

    // The response is a blob, we need to convert it to base64
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    res.status(200).json({ photo: base64 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while generating the image." });
  }
})

export default router;