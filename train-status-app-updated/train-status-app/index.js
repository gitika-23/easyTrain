
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.static('public')); 

if (!process.env.RAPIDAPI_KEY) {
    console.error("Error: RAPIDAPI_KEY not found in .env file.");
    process.exit(1);
}

app.get('/api/train-status', async (req, res) => {
    const { trainNumber, departureDate } = req.query;
    const apiKey = process.env.RAPIDAPI_KEY;

    console.log("Train Number:", trainNumber, "Departure Date:", departureDate); 

    try {
        const response = await axios.get('https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status', {
            params: {
                train_number: trainNumber,
                departure_date: departureDate,
                isH5: 'true',
                client: 'web'
            },
            headers: {
                'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
                'x-rapidapi-key': apiKey,
                'x-rapid-api': 'rapid-api-database'
            }
        });
        console.log("API Response:", response.data); // Debugging
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            // Error response from the API
            console.error('API Error:', error.response.status, error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // No response was received from the API
            console.error('No response received from API:', error.request);
            res.status(500).send('No response received from API');
        } else {
            // Error setting up the request
            console.error('Error setting up API request:', error.message);
            res.status(500).send('Error setting up API request');
        }
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
