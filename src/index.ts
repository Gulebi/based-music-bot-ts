import { Client, GatewayIntentBits } from "discord.js";
import { Player } from "discord-player";
import dotenv from "dotenv";
import { registerClientEvents, registerPlayerEvents } from "./events";
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

registerClientEvents(client);

const player = new Player(client, {
    ytdlOptions: {
        quality: "lowestaudio",
    },
});

registerPlayerEvents(player);

player.extractors.loadDefault();

client.login(process.env.TOKEN);
