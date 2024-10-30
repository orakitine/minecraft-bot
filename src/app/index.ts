import "dotenv/config";
import { Bot, createBot, Player } from "mineflayer";
import { aiJoke } from "../ai/joke";
import { delay } from "../utils/delay";

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is missing in environment variables.");
}

// Validate required environment variables
const requiredEnvVars = [
  "MINECRAFT_HOST",
  "MINECRAFT_PORT",
  "MINECRAFT_USERNAME",
  "MINECRAFT_AUTH",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is missing in environment variables.`);
  }
}

// After validation, we can safely assert these values exist
const bot: Bot = createBot({
  host: process.env.MINECRAFT_HOST!,
  port: parseInt(process.env.MINECRAFT_PORT!),
  username: process.env.MINECRAFT_USERNAME!,
  auth: "microsoft",
});

function lookAtPlayer(username: string) {
  const player = bot.players[username];
  if (player?.entity) {
    const playerPos = player.entity.position.offset(0, 1.6, 0);
    bot.lookAt(playerPos);
    return true;
  }
  return false;
}

function getLocationString(): string {
  const pos = bot.entity.position;
  return `I'm at coordinates: X: ${Math.round(pos.x)}, Y: ${Math.round(
    pos.y
  )}, Z: ${Math.round(pos.z)}`;
}

async function tellLocation(username: string) {
  lookAtPlayer(username);
  bot.chat(getLocationString());
}

async function greetPlayer(username: string) {
  lookAtPlayer(username);
  const timeOfDay = new Date().getHours();
  let greeting = "";

  if (timeOfDay < 12) {
    greeting = "Good morning";
  } else if (timeOfDay < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  bot.chat(`${greeting}, ${username}! How are you today?`);
}

async function tellJokeToPlayer(player: Player | null, username: string) {
  lookAtPlayer(username);
  const answers = await aiJoke();

  for (const line of answers) {
    lookAtPlayer(username);
    await delay(500);
    bot.chat(line);
  }
}

async function dance(username: string) {
  lookAtPlayer(username);
  bot.chat("Time to show you my sweet moves! 🕺");

  // Dance routine
  for (let i = 0; i < 4; i++) {
    // Jump and spin
    bot.setControlState("jump", true);
    bot.setControlState("right", true);
    await delay(200);

    bot.setControlState("right", false);
    bot.setControlState("left", true);
    await delay(200);

    bot.setControlState("left", false);
    bot.setControlState("jump", false);
    await delay(200);

    // Sneak dance
    bot.setControlState("sneak", true);
    await delay(200);
    bot.setControlState("sneak", false);
    await delay(200);
  }

  // Reset all controls
  bot.clearControlStates();
  bot.chat("How was that? 😎");
}

bot.on("chat", async (username: string, message: string) => {
  if (username === bot.username) return;

  const messageLower = message.toLowerCase();
  const botNameMentioned = messageLower.includes(bot.username.toLowerCase());

  if (!botNameMentioned) return;

  if (messageLower.includes("joke")) {
    const player = bot.players[username];
    await tellJokeToPlayer(player, username);
  } else if (
    messageLower.includes("hi") ||
    messageLower.includes("hello") ||
    messageLower.includes("hey") ||
    messageLower.includes("greetings") ||
    messageLower.includes("howdy")
  ) {
    await greetPlayer(username);
  } else if (messageLower.includes("where are you")) {
    await tellLocation(username);
  } else if (
    messageLower.includes("dance") ||
    messageLower.includes("moves") ||
    messageLower.includes("groove")
  ) {
    await dance(username);
  } else {
    bot.chat(
      `Sorry ${username}, I didn't understand that. Try asking me for a joke, saying hello, asking where I am, or telling me to dance!`
    );
  }
});

bot.on("kicked", (reason: string) => {
  console.log(
    "I was kicked from the server: " + JSON.stringify(reason, null, 2)
  );
});
