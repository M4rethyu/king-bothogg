exports.run = async (client, message, arguments, options, permission) => {
    const server = message.guild;
    const controlchannel = message.channel;

    var nameparts = controlchannel.name.split("-");
    const voicechannel = message.guild.channels.get(nameparts[nameparts.length - 2]);

    let target = arguments._string;
    const prey = voicechannel.members.find(m => m.user.username === target) || voicechannel.members.find(m => m.nickname === target) || server.members.find(m => m.user.username === target) || server.members.find(m => m.nickname === target) || voicechannel.members.find(m => (m.user.username !== null)?(m.user.username.toLowerCase() === target.toLowerCase()):(false)) || voicechannel.members.find(m => (m.nickname !== null)?(m.nickname.toLowerCase() === target.toLowerCase()):(false)) || server.members.find(m => (m.user.username !== null)?(m.user.username.toLowerCase() === target.toLowerCase()):(false)) || server.members.find(m => (m.nickname !== null)?(m.nickname.toLowerCase() === target.toLowerCase()):(false));

    if (!prey) {
        controlchannel.send(`${message.author}` + ", user could not be found");
        return false;
    } else if (prey === message.member) {
        controlchannel.send(`${message.author}` + ", you can not kick yourself (why would you want that?)");
        return false;
    } else if (!(voicechannel.members.has(prey.id))) {
        controlchannel.send(`${message.author}` + ", the user isn't in your voice channel");
        return false;
    }

    await prey.setVoiceChannel(null);
    controlchannel.send(`${message.author}` + ", the user " + prey.user.username + " has been kicked from your channel");
    return true;
};

exports.config = {
    "cooldown" : 0,
    "sharedCooldown" : false,
    "permission" : 5,
    "syntax" : [
    ],
    "usage" : [
        "[user]"
    ],
    "channels" : "controlchannel",
    "help" : "kick a user from your botchannel"
};

exports.condition = (client, message, arguments, options, permission) => {
    if (arguments._command === "kick") return true;
    return false;
};