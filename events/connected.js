module.exports = async (client, address, port) => {
	// Link social media in king_nidhogg's chat every 30 minutes
	setInterval(function(){client.linkSocialMedia("king_nidhogg");}, 45 * 60 * 1000);
	
	// Set global values by binding them to client
	
	client.spelling.wordDelimiter = /(\b|_)/
	client.spelling.sentenceDelimiter = /(\.|!|\?|;|^|$)/
	
	client.spelling.exceptions = {};
	client.spelling.exceptions.erick = {"wrong" : [],
										"right" : ["rick", "ericka"] };
	client.spelling.exceptions.nidhogg = {"wrong" : ["nid hog", "nighog", "niddhog", "nigghog", "nighod", "nigghod"],
										  "right" : [] };
	client.spelling.useLevenshtein = true;
	return;
}