const { Events } = require("discord.js");
const makeUwu = require("../utils/makeUwu");

const channelId = "1064362433101189190";
const userId = "191391697442308096";
const botId = "1071653532907880528";

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (!message.author.bot && !message.webhookId) {
            if (message.channelId === channelId) {
                const nickname = message.guild.members.cache.get(
                    message.author.id
                ).nickname || message.author.username;
                makeUwu(message.content).then((slurs) => {
                    console.log(`${message.author.id}: ${slurs}`);
                    message.channel
                        .createWebhook({
                            name: nickname,
                        })
                        .then((webhook) => {
                            console.log(`Created webhook ${{ ...webhook }}`);
                            webhook.send({
                                content: slurs,
                            });
                            return webhook;
                        })
                        .then((webhook) => {
                            webhook.delete();
                            message.delete();
                        })
                        .catch((err) => console.error(err));
                });
            }
        }
    },
};
