exports.run = async (client, channel, userstate, command, args, content) => {
	client.twitch.say(channel, client.answers.social);
	return;
};

exports.config = {
	"cooldown" : 30
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "social") {
		return true;
	}
	return false;
};