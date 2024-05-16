const { Client } = require("discord.js-selfbot-v13");
const fs = require("fs");
const path = require("path");

// Load tokens from secrets.json
const secretsPath = path.join(__dirname, "secrets.json");
const secrets = JSON.parse(fs.readFileSync(secretsPath));

// Use the first bot token in secrets
const tokenVar = secrets[Object.keys(secrets)[0]];
const client = new Client();

let notify = 5000;
let scannedMessages = 0;
let totalScannedMessages = 0;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(tokenVar);

client.on("messageCreate", (message) => {
    if (message.author.bot || !message.guild) return; // Ignore messages from bots and DMs
    
    // Log the message details to the console
    console.log(`Author: ${message.author.username}`);
    console.log(`Server: ${message.guild.name}`);
    console.log(`Server ID: ${message.guild.id}`);
    console.log(`Channel: ${message.channel.name}`);
    console.log(`Channel ID: ${message.channel.id}`);
    console.log(`NSFW Channel? ${message.channel.nsfw}`);
    console.log(`Sent At: ${message.createdAt}`);
    console.log(`Message: ${message.content}`);

    scannedMessages += 1;
    totalScannedMessages += 1;

    if (scannedMessages == notify) {
        console.log(`Saved ${totalScannedMessages} messages`);
        scannedMessages = 0;
    }
});
