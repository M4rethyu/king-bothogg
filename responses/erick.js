exports.run = async (client, channel, userstate, content) => {
	client.say(channel, "@" + userstate["display-name"] + " Erick's name is spelled \"E-R-I-C-K\"");
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, content) => {
	return true;
	return false;
};