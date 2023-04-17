const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("heartbeat")
        .setDescription("Provides websocket heartbeat."),
    async execute(interaction) {
        const sent = await interaction.reply({
            content: `Pinging...`,
            fetchReply: true,
        });
        interaction.editReply(
            `\nRoundtrip latency: ${
                sent.createdTimestamp - interaction.createdTimestamp
            }ms\nWebsocket heartbeat: ${interaction.client.ws.ping}ms`
        );
    },
};
