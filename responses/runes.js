exports.run = async (client, channel, userstate, content) => {
	client.say(channel, client.answers.runes);
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, content) => {
	
	const wordDelim = client.spelling.wordDelimiter;
	const sentDelim = client.spelling.sentenceDelimiter.source;
	
	content = content.toLowerCase();
	
	// Sentence has word staring with "w", followed by "runes"
	var regex1 = new RegExp(sentDelim + "[^.!?;$^]*(\\bw\\w+\\b)" + "[^.!?;$^]*" + "runes" + "[^.!?;$^]*" + sentDelim, "ig");
	// Sentence has "runes" and ends in "?"
	var regex2 = new RegExp(sentDelim + "[^.!?;$^]*" + "runes" + "[^.!?;$^]*" + "\\?", "ig");
	
	if (regex1.test(content) || regex2.test(content)) return true;
	return false;
};