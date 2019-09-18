exports.run = async (client, channel, userstate, command, args, content) => {
	client.twitch.say(channel, client.runesToMessage());
	client.twitch.say(channel, "test successful");
	return;
};

exports.config = {
	"cooldown" : 0
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "test" && client.config.admins.includes(userstate.username)) {
		return true;
	}
	return false;
};