exports.run = async (client, message, channel, userstate, arguments, options) => {
	var n = 1; var sum = 1;
	var nAdd = client.persist("twitch.commands.erick." + userstate.username);
	var sumAdd = client.persist.twitchCommandTotal("erick");
	
	if ((typeof nAdd) == "number") n += nAdd
	if ((typeof sumAdd) == "number") sum += sumAdd
	
	const name = userstate["display-name"];

	var s = "@" + name + " " + client.answers.erick
	//s += " (" + n + " times by " + name + ", " + sum + " times total)"

	client.twitch.say(channel, s);
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 5,
	"syntax" : [
		
	],
	"channels" : "chat",
	"help" : "Corrects misspellings of \"Erick\"."
};

exports.condition = (client, message, channel, userstate, arguments, options) => {
	if (client.spelling.findMisspellings(message, "erick")) return true;
	return false;
};