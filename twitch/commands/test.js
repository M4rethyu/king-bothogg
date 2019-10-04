exports.run = async (client, channel, userstate, command, args, content) => {
	
	client.twitch.say(channel, "test successful");
	return;
};

exports.config = {
	"cooldown" : 0,
	"permission" : 0
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "test") {
		return true;
	}
	return false;
};

exports.help = "A command for testing code";