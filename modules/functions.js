module.exports = (client) => {
	client.linkSocialMedia = (channel) =>
	{
		console.log("linking social media in", channel, "'s chat");
		client.say(channel, client.answers.social);
	}
	
	client.checkHosted = () =>
	{
		return (process.env.PROJECT_DOMAIN == "king-bothogg");
	}
	
	client.spelling.findMisspellings = (string, word) =>
	{
		const levenshtein = require('js-levenshtein');
		const wordDelim = client.spelling.wordDelimiter;
		
		string = string.toLowerCase();
		word = word.toLowerCase();
		
		if (client.spelling.exceptions[word] != undefined) {
			for (const i in client.spelling.exceptions[word].wrong) {
				const regex = new RegExp(wordDelim.source + client.spelling.exceptions[word].wrong[i] + wordDelim.source);
				if (regex.test(string)) return true;		
			}
		}
		
		var words = string.split(wordDelim);
		
		if (client.spelling.useLevenshtein) {
			for (const i in words) {
				if (client.spelling.exceptions[word] != undefined && !client.spelling.exceptions[word].right.includes(words[i]) && levenshtein(words[i],word) == 1) return true;
			}
		}
		
		return false;
	}
	
	client.test = (str) => {
		console.log("test function received :'", str, "'")
	}
}