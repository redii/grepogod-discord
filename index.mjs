import "dotenv/config"
import { REST, Routes, Client, IntentsBitField, GatewayIntentBits } from "discord.js"
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_CLIENT_TOKEN)
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		GatewayIntentBits.Guilds,
	],
})

// Guild ID
const guildId = "1038806113656770611"

// Bot Commands
// https://discord.com/developers/docs/interactions/application-commands#registering-a-command
const commands = [
	{
		name: "ping",
		description: "Replies with Pong!",
	},
]

// Register Commands
;(async () => {
	try {
		await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
			body: commands,
		})
		console.log("👍 Successfully reloaded bot commands")
	} catch (err) {
		console.error("🚨 Error while reloading bot commands", err)
	}
})()

// Bot Code
client.on("ready", async () => {
	console.log(`✅ Logged in as ${client.user.tag}!`)
})

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return

	if (interaction.commandName === "ping") {
		await interaction.reply("Pong!")
	}
})

client.on("messageCreate", async (message) => {
	// autodelete for market channels
	if (message.channel.name.startsWith("market-")) {
		setTimeout(() => message.delete(), 1000 * 10)
	}
})

client.login(process.env.DISCORD_CLIENT_TOKEN)
