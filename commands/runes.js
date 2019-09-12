exports.run = async (client, channel, userstate, command, args, content) => {
	client.say(channel, client.answers.runes);
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "runes") {
		return true;
	}
	return false;
};