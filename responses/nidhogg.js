exports.run = async (client, channel, userstate, content) => {
	const n = client.persist("commands.nidhogg." + userstate.username);
	const sum = client.persist.commandTotal("nidhogg");
	const name = userstate["display-name"];
	
	client.twitch.say(channel, "@" + name + " " + client.answers.nidhogg + " (" + n + " times by " + name + ", " + sum + " times total)");
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, content) => {
	if (client.spelling.findMisspellings(content, "nidhogg")) return true;
	return false;
};