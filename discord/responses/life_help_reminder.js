exports.run = async (client, message, arguments, options, permission) => {
	message.channel.send("life help");
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 5,
	"syntax" : [

	],
	"channels" : "life_help",
	"help" : "Tell people in the life help requests channel to only reply in DMs"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (message.channel.id === client.discord.config.life_helpID[0]) return true; // Hardcoded because mods ignore channel restrictions and it can't be turned off (oops)
	return false;
};