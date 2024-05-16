const { Client } = require("discord.js-selfbot-v13");
const fs = require("fs");
const path = require("path");

// Load tokens from secrets.json
const secretsPath = path.join(__dirname, "secrets.json");
const secrets = JSON.parse(fs.readFileSync(secretsPath));

// Select the first bot from the secrets
const selfbotName = Object.keys(secrets)[0];
const tokenVar = secrets[selfbotName];

// Create a Client instance
const client = new Client();

// Client login
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(tokenVar);

// Message creation
client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return; // Ignore messages from bots and DMs
    // Save the message to a text file
    const userDir = path.join(__dirname, "Users", message.author.username);
    const messagesDir = path.join(userDir, "Messages");
    const guildDir = path.join(messagesDir, message.guild.name);
    createFolders([userDir, messagesDir, guildDir]);
    const filePath = path.join(guildDir, `${message.id}.txt`);
    fs.writeFileSync(
        filePath,
        `Author: ${message.author.username}
          Server: ${message.guild.name}
          Server ID: ${message.guild.id}
          Channel: ${message.channel.name}
          Channel ID: ${message.channel.id}
          NSFW Channel? ${message.channel.nsfw}
          Sent At: ${message.createdAt}
          Message: ${message.content}`,
    );
});
