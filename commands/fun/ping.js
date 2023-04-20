const { SlashCommandBuilder } = require('discord.js');
// const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!')
        .addStringOption(option => 
            option.setName('sentence')
                .setDescription('The words you want to OwO.')
                .setRequired(true)),
    async execute(interaction) {
        const sentence = interaction.options.getString('sentence', true);
        console.log(sentence);

        await require('../../utils/getUwu.js').then(
            ([{ default: index }]) => {
                const uwuifier = new index({
                    spaces: {
                        faces: 0.5,
                        actions: 0.075,
                        stutters: 0.1,
                    },
                    words: 1,
                    exclamations: 1,
                });
                interaction.reply({
                    content: uwuifier.uwuifySentence(sentence),
                    ephemeral: true,
                });
            }
        )
        // await interaction.reply({ content: 'Pong', ephemeral: true });
        // await wait(2000);
        // await interaction.editReply({ content: `I'm going to eat your children!`, ephemeral: true });
    },
};