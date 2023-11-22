const ethers = require("ethers");
const Discord = require("discord.js");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const webhookClient = new Discord.WebhookClient({
  url: process.env.WEBHOOK_URL,
});

const app = express();
const port = process.env.PORT || 3010;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

//Alternate way to send data to discord
const contractAddress = "0xcFF76d06F90af2668d7a259a2C12C3b88a1A13F3";

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/r1xrnkXFSD92Fd715SqGkluuVwQ_5-YK"
);

const topic0 =
  "0xcb6783276e8a4347387036bbfea000268f0a4b1f8c46ac79980609f2af8d2acd";

// Create a filter for the specific contract and topic
const filter = {
  address: contractAddress,
  topics: [topic0],
};

provider.on(filter, (log, event) => {
  console.log("Event received:");
  webhookClient.send("Wow! " + "0x" + log.topics[1].slice(26) + " just voted!");
  console.log("------------------------");
});

console.log("Listening for events...");
