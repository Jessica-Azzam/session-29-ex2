// frontend/src/JokeGenerator.js
import React, { useState } from 'react';
import axios from 'axios';

const JokeGenerator = () => {
  const [topic, setTopic] = useState(''); // Topic entered by user
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle topic input change
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  // Fetch joke from backend API
  const fetchJoke = async () => {
    if (!topic) {
      setError('Please enter a topic!');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/get-joke', { topic });
      setJoke(response.data.joke);
    } catch (err) {
      setError('Failed to fetch joke.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchJoke();
  };

  return (
    <div className="joke-container">
      <h1>Joke Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={topic}
          onChange={handleTopicChange}
          placeholder="Enter a topic (e.g., cat, dog)"
        />
        <button type="submit">Get Joke</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{joke}</p>
      )}
    </div>
  );
};

export default JokeGenerator;
