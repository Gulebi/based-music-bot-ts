import { Player } from "discord-player";
import { SlashCommandBuilder, ChatInputCommandInteraction, ButtonBuilder, ButtonInteraction } from "discord.js";

export interface SlashCommand {
    data: SlashCommandBuilder | any;
    execute: ({ interaction, player }: { interaction: ChatInputCommandInteraction; player: Player }) => void;
}

export interface Button {
    data: ButtonBuilder | any;
    execute: ({ interaction, player }: { interaction: ButtonInteraction; player: Player }) => void;
}

export type Interaction = ChatInputCommandInteraction | ButtonInteraction;
