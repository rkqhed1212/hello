require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const API_KEY = '4f18f934d20657fee1716372334629'; // Example API key
const API_URL = 'http://eship.epost.go.kr/api.EmsTotProcCmd.ems';

app.use(express.json());

// Serve the HTML page directly from the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to calculate shipping cost
app.post('/calculate', async(req, res) => {

    const { countrycd, totweight } = req.body;

    if (premiumcd == shippingmethod) {

    } else {

    }


    const params = {
        regkey: API_KEY,
        premiumcd: 31, // Example premium code, adjust as necessary
        countrycd,
        totweight,
        boyn: 'N',
        boprc: 0,
        em_ee: 'em',
        boxwidth: 34,
        boxheight: 27,
        boxlength: 16,
        apprno: '10042H0590'
    };

    try {
        const response = await axios.get(API_URL, { params });

        if (response.data) {
            res.set('Content-Type', 'application/xml');
            return res.send(response.data);
        } else {
            return res.status(404).json({ error: 'Shipping information not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `HTTP Request failed: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});