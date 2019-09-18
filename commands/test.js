exports.run = async (client, channel, userstate, command, args, content) => {
	console.log(client.twitch.getChannels());
	client.twitch.say(channel, "test successful");
	return;
};

exports.config = {
	"cooldown" : 30
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "test" && client.config.admins.includes(userstate.username)) {
		return true;
	}
	return false;
};