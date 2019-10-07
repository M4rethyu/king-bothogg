exports.run = async (client, channel, userstate, command, args, content) => {
	
	const amount = Number(args[0]);
	if (Number.isNaN(amount)) {
		client.twitch.say(channel, "@" + userstate.username + ", please specify a valid amount (!give [amount] [user])");
		return false;
	}
	
	const target = args[1]
	if (typeof target == "undefined") {
		client.twitch.say(channel, "@" + userstate.username + ", please specify a valid target (!give [amount] [user])");
		return false;
	}
	target = target.toLowerCase();
	
	if (client.currency(userstate.username) < amount) {
		client.twitch.say(channel, "@" + userstate.username + ", you don't have enough " + client.answers.currencies);
		return false;
	}
	
	const before = client.currency(target);
	client.currency(userstate.username, -amount);
	client.currency(target, amount);
	const after = client.currency(target);
	
	client.twitch.say(channel, "@" + target + ", " + userstate.username + " transferred " + amount + " " + ((amount == 1)?(client.answers.currency):(client.answers.currencies)) + " to you for a total of " + after);
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : false,
	"permission" : 0
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "transfer") return true;
	return false;
};

exports.help = "!give [amount] [user] of money";