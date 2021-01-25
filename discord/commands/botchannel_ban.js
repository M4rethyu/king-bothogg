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
        controlchannel.send(`${message.author}` + ", you can not ban yourself (why would you want that?)");
        return false;
    }


    if (voicechannel.permissionOverwrites.get(prey.user.id) === undefined || (voicechannel.permissionOverwrites.get(prey.user.id).deny & 0x00100000) !== 0x00100000) {
        //prey isn't banned yet
        await voicechannel.overwritePermissions(prey.user.id, {CONNECT : false});
        if (voicechannel.members.has(prey.id)) {
            await prey.setVoiceChannel(null);
        }
        controlchannel.send(`${message.author}` + ", the user " + prey.user.username + " has been banned from your channel");
    } else {
        //prey is banned already
        await voicechannel.overwritePermissions(prey.user.id, {CONNECT : null});
        controlchannel.send(`${message.author}` + ", the user " + prey.user.username + " has been unbanned from your channel");
    }
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
    "help" : "ban a user from your botchannel"
};

exports.condition = (client, message, arguments, options, permission) => {
    if (arguments._command === "ban") return true;
    return false;
};