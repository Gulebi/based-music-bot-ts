import { Player } from "discord-player";
import { ChatInputCommandInteraction } from "discord.js";

export default function registerPlayerEvents(player: Player) {
    player.events.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);

        const interaction = queue.metadata as ChatInputCommandInteraction;
        interaction.followUp({ content: "Error!" });
    });

    player.events.on("playerError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the player: ${error.message}`);
    });
}
