exports.run = async (client, channel, userstate, command, args, content) => {
	client.say(channel, "template");
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, command, args, content) => {
	
	return false;
};