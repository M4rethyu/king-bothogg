exports.run = async (client, channel, userstate, content) => {
	const n = client.persist("commands.erick." + userstate.username);
	const sum = client.persist.commandTotal("erick");
	const name = userstate["display-name"];
	
	client.twitch.say(channel, "@" + name + " " + client.answers.erick + " (" + n + " times by " + name + ", " + sum + " times total)");
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, content) => {
	if (client.spelling.findMisspellings(content, "erick")) return true;
	return false;
};