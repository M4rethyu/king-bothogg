exports.run = async (client, message, arguments, options, permission) => {
    const server = message.guild;
    const channel = message.channel;
    const user = message.author;

    silent = (options.get("s")?true:false);


    if (arguments.rank == null) {
        if (!silent) channel.send(message.author + ", please specify a rank");
        return false;
    }

    var abbreviation = arguments.rank.trim();
    abbreviation = abbreviation.toLowerCase();

    var rank;
    for (const entry of client.discord.ranks) {
        if (entry[1].abbreviation == abbreviation) {
            rank = entry[1];
            break;
        }
    }

    if (typeof rank == "undefined") {
        if (!silent) channel.send(message.author + ", this rank doesn't exist");
        return false;
    }

    if (rank.permission < permission) {
        if (!silent) channel.send(message.author + ", you don't have access to this rank.");
        return false;
    }


    var limit = arguments.limit;

    if (limit === undefined || !(limit > 0 || limit < 0)) limit = 0;

    if (!(limit >= 0 && limit < 100)) {
        channel.send(`${message.author}` + ", that is not a valid user limit");
        return false;
    }

    let channels = client.discord.getGamesChannels(server);

    if (channels.length >= 10) {
        channel.send(`${message.author}` + ", there are too many channels.")
        return false;
    }

    client.discord.makeVoiceChannel(server, rank.name, limit).then(
        (chan) => {
            let id = chan.id;
            var role = message.guild.roles.find(testedrole => testedrole.name === "@everyone");
            var mod_role = message.guild.roles.get("211329653250588672");
            var overrides = [{type:'role', id:role.id, denied:0x400}, {type:'user', id:user.id, allowed:0x400}]
            console.log(mod_role)
            if (mod_role) {
                overrides.concat({type:'role', id:mod_role.id, allowed:0x400})
            }
            client.discord.makeTextChannel(	server,
                rank.name.replace(/\s/g, "") /*+ "-" + limit*/ + "-" + user.username + user.discriminator + "-" + id + "-botchannel",
                "control channel for your voice channel",
                overrides).then(
                (controlChan) => {
                    controlChan.send(`${user}` + ", you have created a **" + rank.name + "** channel " + ((limit !== 0)?("for " + limit + " users"):("without a userlimit")) + ".\n" +
                        "You can use these commands: ([user] can be nickname or username)\n!ban [user] => bans or unbans a user from the channel\n!kick [user] => kicks a user from the channel\nJust writing a number changes the user limit (0 or >99 für no limit)",
                    );
                }
            );
        }
    );

    return;
};

exports.config = {
    "cooldown" : 30,
    "sharedCooldown" : false,
    "permission" : 5,
    "syntax" : [
        "rank_w limit_n:0"
    ],
    "usage" : [
        "[rank] [userlimit]"
    ],
    "channels" : "game",
    "help" : "Creates a temporary voice channel named after a rank"
};

exports.condition = (client, message, arguments, options, permission) => {
    if (arguments._command === "new") return true;
    return false;
};