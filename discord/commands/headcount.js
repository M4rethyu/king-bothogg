const Discord = require("discord.js")

exports.run = async (client, message, arguments, options, permission) => {
    const server = message.guild;
    const mID = arguments.messageID;

    let m;

    await Promise.all(server.channels.array().map(c => {
        if (c.fetchMessage) {
            return (c.fetchMessage(mID).then(message => m = message, message => undefined))
        }
    }));

    if(m) {

        await Promise.all(m.reactions.array().map(r => {
            return r.fetchUsers()
        }));

        let s = "";

        for (const reaction of m.reactions.array()) {
            let users = reaction.users.filter(u => {
                return u.id !== client.discord.user.id
            }).array()
            if (users.length > 0) {
                s += reaction.emoji + " : " + users.join(", ") + "\n";
            }
        }
        await message.channel.send({
            "embed": {
                "description": s
            }
        })
    } else {
        await message.channel.send("Couldn't find requested message in this server");
    }

};

exports.config = {
    "cooldown" : 0,
    "sharedCooldown" : true,
    "permission" : 4,
    "syntax" : [
        "messageID_id"
    ],
    "usage" : [
        "[message ID]"
    ],
    "channels" : "spam",
    "help" : "list the people who reacted to a message"
};

exports.condition = (client, message, arguments, options, permission) => {
    if (arguments._command === "hc" || arguments._command === "headcount" ) return true;
    return false;
};
