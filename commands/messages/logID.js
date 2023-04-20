const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eventlog")
        .setDescription("Logs certain events.")
        .addBooleanOption((option) =>
            option.setName('enabled').setDescription("Enables logging")
        ),
    async execute(interaction) {
        console.log("working");
    },
};