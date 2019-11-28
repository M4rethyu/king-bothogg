exports.run = async (client, message, arguments, options, permission) => {
	const string = arguments._rest;
	if (!string) {
		message.channel.send(message.author + ", please specify a quote");
		return false;
	}
	
	quotes = client.persist("quotes");
	if (!quotes) {
		quotes = [];
	}
	time = (new Date()).getTime();
	quotes.push([string, time]);
	client.persist("quotes", quotes);
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 3,
	"syntax" : [
		""
	],
	"usage" : [
		"[quote] (e.g.: '!quote the quote is a lie'"
	],
	"channels" : "spam",
	"help" : "Add quotes to a list"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "newquote") return true;
	return false;
};