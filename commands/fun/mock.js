const { SlashCommandBuilder } = require('discord.js');
const mockUsers = require("../../state/mockUsers");
// const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mock')
        .setDescription('Does the funny')
        .addStringOption(option => 
            option.setName('username')
                .setDescription('The target idiot')
                .setRequired(true)),
    async execute(interaction) {
        const username = interaction.options.getString('username', true);
        console.log(username);
        console.log(mockUsers);
        mockUsers.set(username);
        // await interaction.reply({ content: 'Pong', ephemeral: true });
        // await wait(2000);
        // await interaction.editReply({ content: `I'm going to eat your children!`, ephemeral: true });
    },
};