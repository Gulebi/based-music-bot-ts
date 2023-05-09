import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../types";
import { QueryType } from "discord-player";

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play command")
        .addStringOption((option) => option.setName("query").setDescription("query").setRequired(true)),
    execute: async ({ interaction, player }) => {
        try {
            const channel = interaction.inCachedGuild() && interaction.member.voice.channel;

            if (!channel) return interaction.reply("You are not connected to a voice channel!");

            const query = interaction.options.getString("query", true);

            await interaction.deferReply();

            const { track } = await player.play(channel, query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
                nodeOptions: {
                    metadata: interaction,
                    leaveOnEnd: false,
                },
            });

            return interaction.followUp(`**${track.title}** enqueued!`);
        } catch (error) {
            console.error(error);
            return await interaction.editReply({
                content: "Error!",
            });
        }
    },
};

export default command;
