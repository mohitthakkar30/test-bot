const Discord = require('discord.js');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3010;

const webhookClient = new Discord.WebhookClient(
    {
        url: process.env.WEBHOOK_URL,
    }
);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.post('/', (req, res) => {
    const bodyData = req.body;
    console.log("bodyData - ", bodyData);
    webhookClient.send(`Wow, ${bodyData[0].from} just voted...`); 
    res.send(JSON.stringify(bodyData));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


