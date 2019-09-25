exports.run = async (client, channel, userstate, content) => {
	const n = 1; const sum = 1;
	var nAdd = client.persist("commands.nidhogg." + userstate.username);
	var sumAdd = client.persist.commandTotal("nidhogg");
	if ((typeof nAdd) == "number") n += nAdd
	if ((typeof sumAdd) == "number") sum += sumAdd
	
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