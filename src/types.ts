import { Player } from "discord-player";
import { SlashCommandBuilder, CommandInteraction, ChatInputCommandInteraction } from "discord.js";

export interface SlashCommand {
    data: SlashCommandBuilder | any;
    execute: ({ interaction, player }: { interaction: ChatInputCommandInteraction; player: Player }) => void;
    aliases?: string[];
    cooldown?: number | 1000;
}
