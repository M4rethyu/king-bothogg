exports.run = async (client, channel, userstate, command, args, content) => {
	client.twitch.say(channel, client.runesToMessage());
	return;
};

exports.config = {
	"cooldown" : 30
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "runes") {
		return true;
	}
	return false;
};