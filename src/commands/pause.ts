import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { colors, getAvatar, getUsername } from "../utils";

const command: SlashCommand = {
    data: new SlashCommandBuilder().setName("pause").setDescription("Pause player"),
    execute: async ({ interaction, player }) => {
        try {
            await interaction.deferReply();

            const queue = interaction.inCachedGuild() && player.nodes.get(interaction.guildId);

            if (!queue || !queue.isPlaying())
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

            if (queue.node.isPaused())
                return interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Плеер уже приостановлен!")
                            .setColor(colors.baseColor)
                            .setFooter({
                                text: getUsername(interaction),
                                iconURL: getAvatar(interaction),
                            }),
                    ],
                });

            queue.node.pause();

            return interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Плеер приостановлен!")
                        .setColor(colors.baseColor)
                        .setFooter({
                            text: getUsername(interaction),
                            iconURL: getAvatar(interaction),
                        }),
                ],
            });
        } catch (error) {
            console.error(error);
            return await interaction.editReply({
                content: "Error!",
            });
        }
    },
};

export default command;
