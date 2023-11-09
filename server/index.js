
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const app = express()
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 5050

app.post('/', async (req,res) => {
    const { message, currentModel, currentTemperature, currentToken } = req.body;
    const lastMessage = message[message.length - 1];
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${lastMessage}`,
        max_tokens: JSON.parse(currentToken),
        temperature: JSON.parse(currentTemperature),
    });
    res.json({
        message: response.data.choices[0].text,
    })
    
});

app.get('/models', async (req,res) => {
    const response = await openai.listEngines();
    res.json({
        models: response.data.data,
    })
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
});
