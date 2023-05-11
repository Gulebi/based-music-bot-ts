import { ActivityType, Client, Events } from "discord.js";
import { cmdLoader, cmdTrigger } from "../cmdHandler";
import { useMasterPlayer } from "discord-player";

export default function registerClientEvents(client: Client) {
    client.once(Events.ClientReady, (c) => {
        const isLoaded = cmdLoader();

        if (isLoaded) {
            c.user.setActivity("на тебя!", { type: ActivityType.Watching });

            console.log(`${c.user.username} is up and running!`);
        } else {
            console.log("Failed to register commands!");
        }
    });

    client.on(Events.InteractionCreate, (interaction) => {
        const player = useMasterPlayer();

        if (player) {
            cmdTrigger(interaction, player);
        } else {
            console.log("Failed to get player instance!");
        }
    });
}
