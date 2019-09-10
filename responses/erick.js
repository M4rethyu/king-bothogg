exports.run = async (client, channel, userstate, content) => {
	client.say(channel, "@" + userstate["display-name"] + " Erick's name is spelled \"E-R-I-C-K\"");
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, content) => {
	const levenshtein = require('js-levenshtein');
	content = content.toLowerCase();
	
	var regex;
	for (const i in client.spelling.erickTrue) {
		regex = new RegExp("\\b"+client.spelling.erickTrue[i]+"\\b");
		if (regex.test(content)) return true;
		
	}
	
	var words = content.split(/\b/);
	
	if (client.spelling.useLevenshtein) {
		for (const i in words) {
			if (!client.spelling.erickFalse.includes(words[i]) && levenshtein(words[i],"erick") == 1) return true;
		}
	}
	
	return false;
};