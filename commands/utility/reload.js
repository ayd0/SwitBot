const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}

        const foldersPath = path.join(__dirname, '..');
        const commandFolders = fs.readdirSync(foldersPath);
        let commandFolderPath = '';

        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
            if (commandFiles.includes(`${commandName}.js`)) {
                commandFolderPath = `../${commandsPath.split('\\').pop()}/`;
                console.log('found ', commandFolderPath);
                break;
            } 
        }

        if (commandFolderPath === '') {
            return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }

		delete require.cache[require.resolve(`${commandFolderPath}${command.data.name}.js`)];

		try {
	        interaction.client.commands.delete(command.data.name);
	        const newCommand = require(`${commandFolderPath}${command.data.name}.js`);
	        interaction.client.commands.set(newCommand.data.name, newCommand);
	        await interaction.reply({
                content: `Command \`${newCommand.data.name}\` was reloaded!`,
                ephemeral: true,
            });
		} catch (error) {
	        console.error(error);
	        await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
		}
	},
};