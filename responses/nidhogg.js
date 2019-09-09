exports.run = async (client, channel, userstate, content) => {
	client.say(channel, "@" + userstate["display-name"] + " Erick's name is spelled \"N-I-D-H-O-G-G\"");
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, content) => {
	const levenshtein = require('js-levenshtein');
	var str = content.toLowerCase().replace(/ +/g, ",");
	
	for (character in client.surroundingCharacters) {
		str = str.replace(client.surroundingCharacters[character],",");
	}
	
	var words = str.split(",");
	
	console.log(words);
	
	for (const i in words) {
		if (client.nidhoggExplicitMisspellings.includes(words[i])) return true;
		if (client.useGeneralMisspellings && levenshtein(words[i],"nidhogg") == 1) return true;
	}
	return false;
};