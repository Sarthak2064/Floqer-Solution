const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const csv = require('csv-parser');
const app = express();
const port = process.env.PORT || 3000

app.use(cors());

// Function to read CSV file and convert it to JSON
const readCSVFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('salaries.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

// Endpoint to get all salaries
app.get('/api/salaries', async (req, res) => {
    try {
        const salaries = await readCSVFile(path.join(__dirname, 'salaries.csv'));
        res.json(salaries);
    } catch (error) {
        res.status(500).send(`Error reading data from CSV file: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
