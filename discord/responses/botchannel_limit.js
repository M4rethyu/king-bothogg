exports.run = async (client, message, arguments, options, permission) => {
	const server = message.guild;
	const controlchannel = message.channel;

	var nameparts = controlchannel.name.split("-");
	const voicechannel = message.guild.channels.get(nameparts[nameparts.length - 2]);

	var limit = parseInt(message.content);

	if (!(limit > 0 && limit < 100)) {
		limit = 0;
	}

	await voicechannel.setUserLimit(limit);

	limit = ((limit === 0)?("unbegrenzt"):(limit));

	controlchannel.send(`${message.author}` + ", das Nutzerlimit für den Channel **" + voicechannel.name + "** wurde auf " + limit + " geändert");
	return true;
};

exports.config = {
	"cooldown" : 5,
	"sharedCooldown" : false,
	"permission" : 5,
	"syntax" : [

	],
	"channels" : "controlchannel",
	"help" : "change your botchannel's userlimit"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (message.channel.name.endsWith("-botchannel") && !isNaN(parseInt(message.content))) return true; // Hardcoded because mods ignore channel restrictions and it can't be turned off (oops)
	return false;
};