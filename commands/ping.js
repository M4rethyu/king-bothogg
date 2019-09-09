exports.run = async (client, channel, userstate, command, args, content) => {
	client.say(channel, "pong " + args.join(" "));
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command == "ping") {
		return true;
	}
	return false;
};