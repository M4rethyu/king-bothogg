exports.run = async (client, channel, userstate, command, args, content) => {
	client.twitch.say(channel, client.currentAccount());
	return;
};

exports.config = {
	"cooldown" : 30,
	"permission" : 5,
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "opgg" || command === "op.gg") {
		return true;
	}
	return false;
};

exports.help = "Shows runes of Erick's current game"