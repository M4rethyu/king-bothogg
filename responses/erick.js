exports.run = async (client, channel, userstate, content) => {
	const n = 1; const sum = 1;
	const nAdd = client.persist("commands.erick." + userstate.username);
	const sumAdd = client.persist.commandTotal("erick");
	if ((typeof nAdd) == "number") n += nAdd
	if ((typeof sumAdd) == "number") sum += sumAdd
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