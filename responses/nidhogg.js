exports.run = async (client, channel, userstate, content) => {
	client.twitch.say(channel, "@" + userstate["display-name"] + " " + client.answers.nidhogg);
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, content) => {
	if (client.spelling.findMisspellings(content, "nidhogg")) return true;
	return false;
};