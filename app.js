const express = require('express');
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware');
const cors = require('cors');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(apiKeyMiddleware);
var corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.get('/protected', (req, res) => {
    res.status(200).send('Protected route');
});

app.get('/about', (req, res) => {
    res.status(200).send({
        status: 'success',
        code: 200,
        message: 'This is a sample project',
    });
});

app.post('/upload', (req, res) => {
    const { base64Data, fileName } = req.body;

    if (!base64Data || !fileName) {
        return res.status(400).send({ message: 'Base64 data and fileName are required' });
    }

    try {
        const filePath = base64ToImage(base64Data, fileName);
        res.status(200).send({ message: 'Image saved successfully', filePath });
    } catch (error) {
        res.status(500).send({ message: 'Failed to save image', error: error.message });
    }
});

app.listen(port, () => {
    console.log('success');
    console.log(`Example app listening at http://localhost:${port}`);
}
);

