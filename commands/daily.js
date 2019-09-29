exports.run = async (client, channel, userstate, command, args, content) => {
	const usedDaily = client.persist("currency.usedDaily." + userstate.username) || false;
	if (usedDaily) return false;
	
	const amount = Math.floor(Math.random()*21) + 10;
	client.currency(userstate.username, amount);
	
	client.twitch.say(channel, "@" + userstate.username + ", you gained " + amount + " " + client.answers.currencies + " for a total of " + client.currency(userstate.username));
	client.persist("currency.usedDaily." + userstate.username, true);
	return true;
};

exports.config = {
	"cooldown" : 0,
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "daily") return true;
	return false;
};