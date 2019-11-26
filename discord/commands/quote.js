exports.run = async (client, message, arguments, options, permission) => {
	
	quotes = client.persist("quotes");
	quote = quotes[Math.floor(Math.random()*quotes.length)];
	message.channel.send("\"" + quote + "\" -Erick");
	
	return;
};

exports.config = {
	"cooldown" : 5,
	"sharedCooldown" : false,
	"permission" : 5,
	"syntax" : [
		"number_n:null"
	],
	"usage" : [
		
	],
	"channels" : "spam",
	"help" : "Select a random Erick-quote"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "quote") return true;
	return false;
};