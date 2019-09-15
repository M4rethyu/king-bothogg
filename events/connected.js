module.exports = async (client, address, port) => {
	// Link social media in king_nidhogg's chat every 45 minutes
	//client.linkSocialMedia("king_nidhogg");
	setInterval(function(){client.twitch.linkSocialMedia("king_nidhogg");}, 45 * 60 * 1000);
	return;
}