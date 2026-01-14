# Discord QR Code Bot

A powerful Discord bot that generates QR codes and provides utility commands for your server.

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commands](#commands)
- [Project Structure](#project-structure)
- [Development](#development)
- [License](#license)

## 📖 About

This project was created as part of the [CodeMentor Discord Bot QR Code Generator Challenge](https://www.codementor.io/projects/tool/discord-bot-qr-code-generator-cgkm8b16qf/solutions). It's a practical exercise in building Discord bots with Node.js, demonstrating how to create slash commands, handle interactions, and integrate external libraries for QR code generation.

- **QR Code Generation**: Generate QR codes from text or URLs
- **User Information**: Display user profile information
- **Server Information**: Get server details and statistics
- **Ping Command**: Check bot latency and connection status
- **Modular Architecture**: Easy-to-extend command structure
- **ESLint Integration**: Code quality and style checking

## 📚 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- A **Discord Bot Token** from [Discord Developer Portal](https://discord.com/developers/applications)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd discord-qr-bot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure your environment**
   - Copy `config.json` template or create `.env` file with:
   ```
   DISCORD_TOKEN=your_bot_token_here
   ```

## ⚙️ Configuration

Update `config.json` with your Discord application credentials:

```json
{
  "token": "YOUR_BOT_TOKEN",
  "clientId": "YOUR_CLIENT_ID",
  "guildId": "YOUR_GUILD_ID"
}
```

> **⚠️ Security Note**: Never commit sensitive credentials to version control. Use `.env` files and add `config.json` to `.gitignore`.

## 🎮 Usage

### Development Mode

Start the bot with automatic reload on file changes:

```bash
npm run dev
```

### Deploy Commands

Register slash commands with Discord:

```bash
npm run deploy
```

### Production

```bash
npm start
```

## 📝 Commands

### `/ping`

Check the bot's response time and latency.

**Response**: Displays round-trip time to Discord servers.

### `/qr_code <text>`

Generate a QR code from the provided text.

**Parameters**:

- `text`: The content to encode in the QR code

**Response**: Sends a PNG image of the generated QR code.

### `/user`

Display information about the command user.

**Response**: User profile card with username, ID, and creation date.

### `/server`

Display information about the current server.

**Response**: Server details including member count and creation date.

## 📁 Project Structure

```
discord-qr-bot/
├── index.js                 # Main bot entry point
├── config.json              # Bot configuration (credentials)
├── deploy-commands.js       # Command registration script
├── eslint.config.js         # ESLint configuration
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Dependency lock file
├── readme.md                # This file
└── commands/
    └── utility/
        ├── ping.js          # Ping command
        ├── qr_code.js       # QR code generation command
        ├── server.js        # Server information command
        └── user.js          # User information command
```

### File Descriptions

| File                 | Purpose                                            |
| -------------------- | -------------------------------------------------- |
| `index.js`           | Initializes the Discord client and event listeners |
| `config.json`        | Stores bot token, client ID, and guild ID          |
| `deploy-commands.js` | Registers all slash commands with Discord API      |
| `eslint.config.js`   | Enforces code style and quality standards          |
| `commands/utility/`  | Contains all bot command modules                   |

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run deploy   # Register slash commands
npm run lint     # Check code quality with ESLint
```

### Adding New Commands

1. Create a new file in `commands/utility/` directory
2. Export a command object with the following structure:

```javascript
export default {
  data: new SlashCommandBuilder()
    .setName("command-name")
    .setDescription("Command description"),
  async execute(interaction) {
    await interaction.reply("Response message");
  },
};
```

3. Import and register the command in `index.js`
4. Run `npm run deploy` to register with Discord

### Code Quality

This project uses ESLint to maintain code quality. Configuration can be found in `eslint.config.js`.

## 📦 Dependencies

### Production

- **discord.js** (v14.25.1): Discord API wrapper
- **dotenv** (v17.2.3): Environment variable loader
- **qrcode** (v1.5.4): QR code generation library

### Development

- **eslint** (v9.39.2): Code linter
- **nodemon** (v3.1.11): Auto-reload during development

## 🐛 Troubleshooting

### Bot not responding

- Verify the bot has permission to read messages and send messages in your server
- Check that your bot token is correct in `config.json`
- Ensure the bot is online (Discord app shows it as active)

### Commands not showing up

- Run `npm run deploy` to register commands
- Check that `clientId` and `guildId` are correct in `config.json`
- Restart the bot after deploying

### QR Code generation fails

- Ensure the `qrcode` package is installed: `npm install qrcode`
- Check that the input text is not empty

## 📄 License

This project is licensed under the ISC License. See `package.json` for details.

## 👤 Author

Created as a Discord bot study project.
Feel free to contribute or report issues!
If you want to reach out, please contact me via [email](evelyn.fernandes4@gmail.com) or at [Discord](https://discord.com/users/jalter4)
