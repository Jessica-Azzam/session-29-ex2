// backend/server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Define the route to get jokes based on the topic
app.post('/api/get-joke', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Please provide a topic.' });
  }

  try {
    // Make an API call to JokeAPI or another joke API with the topic
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any', {
      params: {
        type: 'single',  // Can be 'single' or 'twopart' for setup & delivery
        contains: topic, // Include topic in the joke request
        lang: 'en',
      },
    });

    // Check if joke data is returned
    if (response.data.error) {
      return res.status(404).json({ error: 'No jokes found for the given topic.' });
    }

    const joke = response.data.joke || `${response.data.setup} ${response.data.delivery}`;
    return res.json({ joke });
  } catch (err) {
    console.error('Error fetching joke:', err);
    return res.status(500).json({ error: 'Error fetching joke.' });
  }
});

// Start the server on port 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
