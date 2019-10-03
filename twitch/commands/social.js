exports.run = async (client, channel, userstate, command, args, content) => {
	client.twitch.linkSocialMedia(channel);
	return;
};

exports.config = {
	"cooldown" : 30,
	"permission" : 5
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "social") {
		return true;
	}
	return false;
};

exports.help = "Links Erick's social media";