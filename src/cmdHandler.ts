import { Collection, Interaction as DJSInteraction, REST, Routes } from "discord.js";
import { join } from "path";
import { readdirSync } from "fs";
import { Button, SlashCommand } from "./types";
import dotenv from "dotenv";
import { Player } from "discord-player";
dotenv.config();

const rest = new REST().setToken(process.env.TOKEN!);

const slashCommands = new Collection<string, SlashCommand>();

function cmdLoader(): boolean {
    try {
        const commandsPath = join(__dirname + "/commands");

        const commandsArray = readdirSync(commandsPath).filter((file) => file.endsWith(".ts"));

        commandsArray.forEach((file) => {
            const command: SlashCommand = require(`${commandsPath}/${file}`).default;

            if (command && "data" in command && "execute" in command) {
                slashCommands.set(command.data.name, command);
                // process.stdout.write(`${command.data.name} command is loaded!\r`);
            } else {
                console.warn(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
            }
        });

        console.log("Slash commands are loaded!");

        const slashCommandsArray = Array.from(slashCommands, ([key, value]) => value.data.toJSON());

        rest.put(Routes.applicationCommands(process.env.ID!), { body: slashCommandsArray });

        console.log("Slash commands are registered!");
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        return true;
    }
}

function cmdTrigger(interaction: DJSInteraction, player: Player) {
    let command: SlashCommand | Button | undefined;

    if (interaction.isChatInputCommand()) {
        command = slashCommands.get(interaction.commandName);
    } else return;

    if (!command) return;

    try {
        command.execute({ interaction, player });
    } catch (error) {
        console.error(error);
        interaction.reply({
            content: "Error!",
        });
    }
}

export { slashCommands, cmdLoader, cmdTrigger };
