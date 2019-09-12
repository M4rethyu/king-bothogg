exports.run = async (client, channel, userstate, content) => {
	client.say(channel, "template");
	return;
};

exports.config = {
	"cooldown" : 0
};

exports.condition = (client, channel, userstate, content) => {
	return false;
};