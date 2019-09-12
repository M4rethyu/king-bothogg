exports.run = async (client, channel, userstate, command, args, content) => {
	client.say(channel, "test successful");
	return;
};

exports.config = {
	"cooldown" : 30
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "test" && process.env.CHANNEL_NAME === userstate.username) {
		return true;
	}
	return false;
};