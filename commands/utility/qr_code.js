const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const QRCode = require("qrcode");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qrcode")
    .setDescription("Generates a QR Code to whatever the user describes or a link")
    // Adicionamos um campo para o usuário digitar o conteúdo
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Link or text to be qr coded")
        .setRequired(true)
    ),

  async execute(interaction) {
    // 1. Pegamos o que o usuário digitou
    const text = interaction.options.getString("content");

    try {
      // 2. Geramos o QR Code como um Buffer (imagem em memória)
      const qrBuffer = await QRCode.toBuffer(text);

      // 3. Criamos o anexo para enviar ao Discord
      const attachment = new AttachmentBuilder(qrBuffer, {
        name: "qrcode.png",
      });

      // 4. Respondemos com a imagem
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
