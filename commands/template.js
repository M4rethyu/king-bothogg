exports.run = async (client, channel, userstate, command, args, content) => {
	client.say(channel, "template");
	return;
};

exports.config = {
	"cooldown" : 0
};

exports.condition = (client, channel, userstate, command, args, content) => {
	
	return false;
};