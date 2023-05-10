import { ChatInputCommandInteraction, ColorResolvable } from "discord.js";

export const colors = {
    baseColor: "#4188D2" as ColorResolvable,
};

export const getUsername = (interaction: ChatInputCommandInteraction, author?: boolean): string => {
    if (author) {
        return interaction.user.username;
    } else {
        return interaction.client.user.username;
    }
};

export const getAvatar = (interaction: ChatInputCommandInteraction, author?: boolean, size: number = 512): string => {
    const defaultAvatar = `https://www.gravatar.com/avatar/00000000000000000000000000000000?s=${size}&d=mp&f=y`;

    if (author) {
        return `${interaction.user.avatarURL()}?size=${size}` || defaultAvatar;
    } else {
        return `${interaction.client.user.avatarURL()}?size=${size}` || defaultAvatar;
    }
};
