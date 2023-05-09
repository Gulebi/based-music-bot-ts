import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../types";

const command: SlashCommand = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Shows the bot's ping"),
    execute: async ({ interaction, player }) => {
        try {
            const queue = player.nodes.get(interaction.guildId!);

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("#4188D2")
                        .setTitle("Понг!")
                        .addFields(
                            {
                                name: "Пинг:",
                                value: `\`${interaction.client.ws.ping}ms\``,
                            },
                            {
                                name: "Пинг войса:",
                                value: !queue ? "`N/A`" : `\`${queue.ping ?? "`N/A`"}\`ms`,
                            }
                        )
                        .setFooter({ text: "Based Music Bot", iconURL: "https://imgur.com/Zd14R2K.png" }),
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
