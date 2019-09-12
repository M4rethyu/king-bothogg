exports.run = async (client, channel, userstate, content) => {
	client.say(channel, "you can find runes on Erick's op.gg");
	return;
};

exports.config = {
	
};

exports.condition = (client, channel, userstate, content) => {
	const wordDelim = client.spelling.wordDelimiter;
	const sentDelim = client.spelling.sentenceDelimiter.source;
	
	content = content.toLowerCase();
	
	var regex1 = new RegExp(sentDelim + "[^.!?;$^]*(\\bw\\w+\\b)" + "[^.!?;$^]*" + "runes" + "[^.!?;$^]*" + sentDelim, "ig");
	var regex2 = new RegExp(sentDelim + "[^.!?;$^]*" + "runes" + "[^.!?;$^]*" + "\\?", "ig");
	
	if (regex1.test(content) || regex2.test(content)) return true;
	return false;
};