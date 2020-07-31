exports.run = async (client, message, channel, userstate, arguments, options) => {
	const usedDaily = client.persist("currency.usedDaily." + userstate.username) || false;
	if (usedDaily) return false;

	console.log(usedDaily)

	const amount = Math.floor(Math.random()*21) + 10;
	client.currency(userstate.username, amount);

	console.log(client.currency(userstate.username))
	console.log(amount)
	console.log(client.currency(userstate.username))

	client.twitch.whisper(userstate.username, "You gained " + amount + " " + client.answers.currencies + " for a total of " + client.currency(userstate.username));
	client.persist("currency.usedDaily." + userstate.username, true);
	return true;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 5,
	"syntax" : [
		
	],
	"channels" : "chat",
	"help" : "Hello everyone, this is YOUR daily dose of nidcoins"
};

exports.condition = (client, message, channel, userstate, arguments, options) => {
	if (arguments._command === "daily") return true;
	return false;
};