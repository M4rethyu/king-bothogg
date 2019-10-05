exports.run = async (client, channel, userstate, content) => {
	client.twitch.say(channel, "@" + userstate["display-name"] + ", please don't use this emote here");
	return;
};

exports.config = {
	"cooldown" : 60,
	"sharedCooldown" : false
};

exports.condition = (client, channel, userstate, content) => {
	const wordDelim = client.spelling.wordDelimiter;
	const sentDelim = client.spelling.sentenceDelimiter;
	
	content = content.toLowerCase();
	
	// Sentence has :) in it
	if (content == ":)" || content.includes(" :)") || content.includes(":) ")) return true;
	return false;
};