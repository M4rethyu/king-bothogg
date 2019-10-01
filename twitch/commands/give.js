exports.run = async (client, channel, userstate, command, args, content) => {
	
	const target = args[0];
	
	const amount = Number(args[1]);
	if (Number.isNaN(amount)) {
		client.twitch.say(channel, "@" + userstate.username + ", please specify a valid amount");
		return false;
	}
	
	const before = client.currency(target);
	client.currency(target, amount);
	const after = client.currency(target);
	
	client.twitch.say(channel, "@" + args[0] + ", " + userstate.username + " gave you " + amount + " " + ((amount == 1)?(client.answers.currency):(client.answers.currencies)) + " for a total of " + after);
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 1
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "give") return true;
	return false;
};

exports.help = "!give [user] [amount] of money";