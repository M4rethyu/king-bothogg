exports.run = async (client, channel, userstate, command, args, content) => {
	
	const amount = Number(args[0]);
	if (Number.isNaN(amount) || amount <= 0) {
		client.twitch.say(channel, "@" + userstate.username + ", please specify a valid amount (!redeem [amount] ([user]))");
		return false;
	}
	
	var self;
	var target;
	if (typeof args[1] == "undefined") {
		target = userstate.username;
		self = true;
	} else {
		target = args[1].toLowerCase();
		self = false;
	}
	
	
	if (self) { // Redeems money from themself
		if (client.currency(target) >= amount) { // Has enough money
			client.currency(target, -amount);
			client.twitch.say(channel, "@" + target + ", you redeemed " + amount + " " + ((amount == 1)?(client.answers.currency):(client.answers.currencies)));
		} else { // Doesn't have enough money
			client.twitch.say(channel, "@" + target + ", you don't have enough " + client.answers.currencies);
		}
	} else { // Redeem money from someone else
		if (userstate.permission > 1) { // Check if user has permission to redeem from someone else
			client.twitch.say(channel, "@" + userstate.username + ", you don't have permission to redeem " + client.answers.currencies + " from someone else");
			return false;
		}
		if (client.currency(target) >= amount) { // Has enough money
			client.currency(target, -amount);
			client.twitch.say(channel, "@" + target + ", " + userstate.username + " redeemed " + amount + " " + ((amount == 1)?(client.answers.currency):(client.answers.currencies)) + " from you");
		} else { // Doesn't have enough money
			client.twitch.say(channel, "@" + userstate.username + ", " + target + " doesn't have enough " + client.answers.currencies);
		}
	}
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : false,
	"permission" : 1
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "redeem") return true;
	return false;
};

exports.help = "!redeem [amount] [user]. Use to pay for things, ask Erick beforehand unless otherwhise specified.";