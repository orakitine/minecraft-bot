# Minecraft Bot - Skippy

A sophisticated Minecraft bot powered by Claude 3.5 AI that can tell jokes, dance, and interact with players.

## Features

- 🤖 AI-powered chat responses using Claude 3.5
- 👋 Greets players with time-appropriate messages
- 😄 Tells AI-generated jokes
- 🕺 Can perform dance moves
- 🗺️ Shares its location in the world
- 👀 Makes eye contact with players while interacting

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/orakitine/minecraft-bot.git
   cd minecraft-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your configuration:

   ```env
   ANTHROPIC_API_KEY="your_api_key"
   MINECRAFT_HOST="your_server_host"
   MINECRAFT_PORT="25565"
   MINECRAFT_USERNAME="your_email"
   MINECRAFT_AUTH="microsoft"
   ```

4. Start the bot:
   ```bash
   npm start
   ```

## Commands

- `[botname] hello` - Get a time-appropriate greeting
- `[botname] joke` - Hear an AI-generated joke
- `[botname] dance` - Watch the bot show off its moves
- `[botname] where are you` - Get the bot's current coordinates

## Development

Built with:

- TypeScript
- Mineflayer
- Claude 3.5 AI
- Node.js

## License

ISC
