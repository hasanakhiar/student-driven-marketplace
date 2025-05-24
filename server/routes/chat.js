const express = require('express');
const router = express.Router();
const axios = require('axios');
const Listing = require('../models/Listing');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received message:', message);

    // Get all listings from the database
    const listings = await Listing.find({}, 'title description price category condition');
    console.log('Found listings:', listings.length);
    
    // Create a context string from the listings
    const listingsContext = listings.map(listing => 
      `${listing.title} - ${listing.description} - $${listing.price} - ${listing.category} - ${listing.condition}`
    ).join('\n');

    // Create the prompt for OpenRouter
    const prompt = `You are a helpful shopping assistant for a student marketplace. 
    Here are the current listings available:
    ${listingsContext || 'No listings available at the moment.'}
    
    User query: ${message}
    
    Please help the user find relevant products or provide helpful shopping advice. 
    If recommending products, only suggest from the available listings provided above.
    If no listings are available, provide general shopping advice.`;

    // Make request to OpenRouter API
    console.log('Sending request to OpenRouter...');
    // at the top of router.post(…)
    const apiKey = process.env.OPENROUTER_API_KEY;
    console.log('🔑 OpenRouter API Key loaded?', !!apiKey, apiKey);
    if (!apiKey) {
      console.error('❌ Missing OPENROUTER_API_KEY');
      return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct', // Using Mistral as it's a good balance of performance and cost
        messages: [
          {
            role: 'system',
            content: 'You are a helpful shopping assistant for a student marketplace.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          //'HTTP-Referer': 'http://localhost:3000', // Your frontend URL
          //'X-Title': 'Student Marketplace Assistant' // Your app name
          'Content-Type':  'application/json',
        }
      }
    );

    console.log('Received response from OpenRouter');
    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Chat error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    res.status(500).json({ 
      error: 'Failed to process chat request',
      details: error.message 
    });
  }
});

module.exports = router; 