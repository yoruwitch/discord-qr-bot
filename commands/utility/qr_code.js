import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import QRCode from "qrcode";

import http from "http";

const inviteLink = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=34816&scope=bot%20applications.commands`;

//For deploying online:
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    res.write(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QR Code Bot Status</title>
        <style>
            body { 
                font-family: sans-serif; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                height: 100vh; 
                margin: 0; 
                background-color: #2c2f33; 
                color: white; 
            }
            .button {
                background-color: #5865F2;
                color: white;
                padding: 15px 25px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
                font-weight: bold;
                transition: background-color 0.3s;
            }
            .button:hover {
                background-color: #4752c4;
            }
            h1, p { margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <h1>Bot is online! 🤖</h1>
        <p>The QR Code Generator is on! Click on the button to add it and test it out!</p>
        <a href="${inviteLink}" target="_blank" class="button">Add Bot to my server
    </body>
    </html>
  `);
    res.end();
  })
  .listen(8080);

export default {
  data: new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription(
      "Generates a QR Code to whatever the user describes or a link"
    )
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Link or text to be qr coded")
        .setRequired(true)
    ),

  async execute(interaction) {
    const text = interaction.options.getString("content");

    try {
      const qrBuffer = await QRCode.toBuffer(text);

      const attachment = new AttachmentBuilder(qrBuffer, {
        name: "qrcode.png",
      });

      await interaction.reply({
        content: `Here is your QR Code`,
        files: [attachment],
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "An error has happened with yout QR Code generation.",
        ephemeral: true,
      });
    }
  },
};
