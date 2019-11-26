exports.run = async (client, message, channel, userstate, arguments, options) => {
	
	quotes = client.persist("quotes");
	if (!quotes) {
		client.twitch.say(channel, "There are no quotes yet");
	}
	
	quote = quotes[Math.floor(Math.random()*quotes.length)];
	client.twitch.say(channel, "\"" + quote + "\" -Erick");
	return;
};

exports.config = {
	"cooldown" : 60,
	"sharedCooldown" : true,
	"permission" : 5,
	"syntax" : [
		"number_n:null"
	],
	"channels" : "chat",
	"help" : "Select a random Erick-quote"
};

exports.condition = (client, message, channel, userstate, arguments, options) => {
	if (arguments._command === "quote") return true;
	return false;
};