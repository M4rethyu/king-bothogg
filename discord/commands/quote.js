exports.run = async (client, message, arguments, options, permission) => {
	
	quotes = client.persist("quotes");
	if (!quotes) {
		message.channel.send("There are no quotes yet");
	}
	
	quote = quotes[Math.floor(Math.random()*quotes.length)];
	string = quote[0];
	time = new Date(quote[1]);
	message.channel.send("\"" + string + "\" -Erick on " + (time.getMonth()+1) + "/" + time.getDate() + "/" + time.getFullYear());
	
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