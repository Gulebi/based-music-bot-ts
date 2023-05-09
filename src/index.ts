import { Client, Events, GatewayIntentBits } from "discord.js";
import { Player } from "discord-player";
import { cmdLoader, cmdTrigger } from "./cmdHandler";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

const player = new Player(client, {
    ytdlOptions: {
        quality: "lowestaudio",
    },
});

player.extractors.loadDefault();

client.once(Events.ClientReady, (c) => {
    const isLoaded = cmdLoader();

    if (isLoaded) {
        console.log(`${c.user.username} is up and running!`);
    } else {
        console.log(`${c.user.username} crashed on loading!`);
    }
});

client.on(Events.InteractionCreate, (interaction) => {
    cmdTrigger(interaction, player);
});

client.login(process.env.TOKEN);
