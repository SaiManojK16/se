// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/api/calculate', (req, res) => {
    const { A, B } = req.body;
    const sum = parseFloat(A) + parseFloat(B);
    res.json({ sum });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
