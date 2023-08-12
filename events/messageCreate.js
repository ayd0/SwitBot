const { Events } = require("discord.js");
const makeUwu = require("../utils/makeUwu");

// const channelId = "1064362433101189190";
const channelId = "1096930986295570543";
const exec = true; // TK: DEV

const asyncMsgBuffer = [];
const iterateAsyncMsgBuffer = (webhook, initial = true) => {
    if (asyncMsgBuffer.length === 0) return;

    webhook
        .send(asyncMsgBuffer[0])
        .then(() => {
            asyncMsgBuffer.pop();
            iterateAsyncMsgBuffer(webhook, false);
        })
        .catch((err) => console.error(err));

    if (initial) return new Promise((resolve) => resolve(null));
};

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (!message.author.bot && !message.webhookId && exec) {
            if (message.channelId === channelId) {
                const nickname =
                    message.guild.members.cache.get(message.author.id)
                        .nickname || message.author.username;
                makeUwu(message.content).then((msg) => {
                    console.log(`${message.author.id}: ${msg}`);
                    message.channel
                        .createWebhook({
                            name: nickname,
                        })
                        .then((webhook) => {
                            console.log(`Created webhook ${{ ...webhook }}`);

                            const maxMsgLength = 1999;

                            // TODO: create a buffer to handle async requests in for loop
                            if (msg.length > maxMsgLength) {
                                // Math.ceil() accounts for last iteration of lastMsgLength
                                const iterations = Math.ceil(
                                    msg.length / maxMsgLength
                                );

                                for (let i = 0; i < iterations; ++i) {
                                    if (i === iterations) {
                                        if (msg.length % maxMsgLength > 0) {
                                            asyncMsgBuffer.push(`${msg}`);
                                        }
                                    } else {
                                        asyncMsgBuffer.push(
                                            `${msg.slice(0, maxMsgLength)}`
                                        );
                                        msg = msg.slice(
                                            maxMsgLength,
                                            msg.length
                                        );
                                    }
                                }
                                iterateAsyncMsgBuffer().then(() => {
                                    webhook.delete();
                                    message.delete();
                                });
                            } else {
                                webhook.send({
                                    content: msg,
                                })
                                .then(() => {
                                    webhook.delete();
                                    message.delete();
                                });
                            }
                        })
                        .catch((err) => console.error(err));
                });
            }
        }
    },
};
