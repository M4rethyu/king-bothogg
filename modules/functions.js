module.exports = (client) => {
	// Functions bound to client
	client.checkHosted = () =>
	{
		return (process.env.PROJECT_DOMAIN == "king-bothogg");
	}
	
	client.test = (str) => {
		console.log("test function received :'", str, "'")
	}
	
	// Functions bound to client.twitch
	client.twitch.linkSocialMedia = (channel) =>
	{
		console.log("linking social media in", channel, "'s chat");
		client.twitch.say(channel, client.answers.social);
	}
	
	// Functions bound to client.discord
	
	// Functions bound to client.league
	
	// Functions bound to client.spelling
	client.spelling.findMisspellings = (string, word) =>
	{
		const wordDelim = client.spelling.wordDelimiter; // Shorten variable name
		// Make case-insensitive
		string = string.toLowerCase();
		word = word.toLowerCase();
		
		if (client.spelling.misspellings[word] != undefined) {
			for (const misspelling of client.spelling.misspellings[word]) {
				const regex = new RegExp(wordDelim + misspelling + wordDelim);
				if (regex.test(string)) return true;
			}
		}
		return false;
	}
}