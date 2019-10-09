exports.run = async (client, channel, userstate, content) => {
	var n = 1; var sum = 1;
	var nAdd = client.persist("twitch.commands.erick." + userstate.username);
	var sumAdd = client.persist.twitchCommandTotal("erick");
	
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