exports.run = async (client, message, arguments, options, permission) => {
	message.delete();
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : false,
	"permission" : 5,
	"syntax" : [

	],
	"channels" : "game",
	"help" : "A template for responses, so I can just copy paste"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (message.channel.id === client.discord.config.gameChannelID[0]) return true; // Hardcoded because mods ignore channel restrictions and it can't be turned off (oops)
	return false;
};