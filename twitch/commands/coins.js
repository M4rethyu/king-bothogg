exports.run = async (client, channel, userstate, command, args, content) => {
	
	var self;
	var target;
	if (typeof args[0] == "undefined") {
		target = userstate.username;
		self = true;
	} else {
		target = args[0].toLowerCase();
		self = false;
	}
	
	if (self) { // Check money from themself
		client.twitch.say(channel, "@" + userstate.username + ", you have " + client.currency(userstate.username) + " " + client.answers.currencies);
	} else { // Check money from someone else
		if (userstate.permission > 3) { // Check if user has permission to check money of someone else
			//client.twitch.say(channel, "@" + userstate.username + ", you don't have permission to check someone else's balance");
			return false;
		}
		client.twitch.say(channel, target + " has " + client.currency(target) + " " + client.answers.currencies);
	}
	return;
	
	client.twitch.say(channel, "@" + userstate.username + ", you have " + client.currency(userstate.username) + " " + client.answers.currencies);
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : false,
	"permission" : 5
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "coins") return true;
	return false;
};

exports.help = "Shows your balance";