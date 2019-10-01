exports.run = async (client, channel, userstate, command, args, content) => {
	
	client.twitch.say(channel, "@" + userstate.username + ", you have " + client.currency(userstate.username) + " " + client.answers.currencies);
	return;
};

exports.config = {
	"cooldown" : 30,
	"sharedCooldown" : false,
	"permission" : 5
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "coins") return true;
	return false;
};

exports.help = "Shows your balance";