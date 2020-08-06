exports.run = async (client, message, channel, userstate, arguments, options) => {

	console.log(arguments)
	console.log(options)

	let chad;
	switch (arguments.mode) {
		case "pussy":
			chad = false;
			break;
		case "chad":
			chad = true;
			break;
		default:
			let response = "@" + userstate.username + " tried to avoid both being a pussy and the risk of being a chad. pathetic.";
			client.twitch.say(channel, response);
			return;
	}

	const amount = arguments.amount
	const current = client.currency(userstate.username);

	if (amount > current) {
		let response = "@" + userstate.username + " tried to flex with " + client.answers.currencies + " they don't have.";
		client.twitch.say(channel, response);
		return false;
	}

	let response = "@" + userstate.username + " gambled " + amount + " " + client.answers.currencies + " ";

	let chance;
	let multiplier;
	if (chad) {
		chance = 0.3;
		multiplier = 2;
		response += "like a chad"
	} else { //pussy
		chance = 0.5;
		multiplier = 1.5;
		response += " like a pussy"
	}

	const win = (Math.random() < chance)

	if (chad && !win) response += ", but it seems that they're still a looser at heart, because those " + client.answers.currencies + " are gone forever."
	if (chad && win) response += ", and wins like one, gaining " + multiplier*amount + " " + client.answers.currencies + "."
	if (!chad && !win) response += ", and looses like one, despite going out of their way to play it safe."
	if (!chad && win) response += ". They may have won " + multiplier*amount + " " + client.answers.currencies + ", but the real winner is chat, who gets to laugh at them for being a pussy.";

	if (win) {
		client.currency(userstate.username, multiplier*amount - amount);
	} else { //!win
		client.currency(userstate.username, -amount);
	}

	if (options.has("s")) {
		client.twitch.whisper(userstate.username, response);
	} else {
		client.twitch.say(channel, response);
	}

	return true;
};

exports.config = {
	"cooldown" : 30,
	"sharedCooldown" : true,
	"permission" : 1,
	"syntax" : [
		"amount_n mode_w:pussy"
	],
	"channels" : "chat",
	"help" : "!gamble x mode. mode pussy has 50% of winning, mode chad has 30%. Winnings await!"
};

exports.condition = (client, message, channel, userstate, arguments, options) => {
	if (arguments._command === "gamble") return true;
	return false;
};