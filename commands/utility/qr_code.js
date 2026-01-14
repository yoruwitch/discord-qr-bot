import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import QRCode from "qrcode";

import http from 'http';

//For deploying online:
http
  .createServer((req, res) => {
    res.write("Bot is online!");
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
