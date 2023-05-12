import { ButtonBuilder, EmbedBuilder, ButtonStyle } from "discord.js";
import { Button } from "../types";
import { colors, getAvatar, getUsername } from "../utils";

const button: Button = {
    data: new ButtonBuilder().setLabel("Skip").setCustomId("skip").setStyle(ButtonStyle.Secondary).setEmoji("⏩"),
    execute: async ({ interaction, player }) => {
        try {
            const queue = interaction.inCachedGuild() && player.nodes.get(interaction.guildId);

            if (!queue || !queue.isPlaying() || !queue.currentTrack)
                return interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Сейчас музыка не играет!")
                            .setColor(colors.baseColor)
                            .setFooter({
                                text: getUsername(interaction),
                                iconURL: getAvatar(interaction),
                            }),
                    ],
                });

            queue.setMetadata(interaction);
            queue.node.skip();
        } catch (error) {
            console.error(error);
            return await interaction.editReply({
                content: "Error!",
            });
        }
    },
};

export default button;
