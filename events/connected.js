module.exports = async (client, address, port) => {
	console.log("connected");
	
	// Link social media in king_nidhogg's chat every 45 minutes
	//client.linkSocialMedia("king_nidhogg");
	//setInterval(function(){client.twitch.linkSocialMedia("king_nidhogg");}, 45 * 60 * 1000);
	
	// Get summoner runes initially
	setTimeout(function(){
		client.getSummonerRunes().then(runes =>  {
			client.erick.summonerRunes = runes;
		});
	}, 20 * 1000);
	// Get summoner runes every 3 minutes
	setInterval(function(){
		client.getSummonerRunes().then(runes =>  {
			client.erick.summonerRunes = runes;
		});
	}, 3 * 60 * 1000);
	
	// Add money to all viewers every 5 minutes
	setTimeout(async function() {
		const chatters = (await client.twitch.viewerlist("xmarethyu")).chatters;
		var list = chatters.broadcaster.concat(chatters.vips, chatters.moderators, chatters.staff, chatters.admins, chatters.global_mods, chatters.viewers);
		
		list.forEach(name => {
			const amount = client.currency(name, 1);
		});
			
	}, 1 * 60 * 1000);
	
	// Resets the !daily command at 3pm EST
	resetDaily = () => {
		// Reset daily at                 EST             3pm
		const t = (new Date().getTime() - 5 * 60 * 1000 + 15 * 60 * 1000)%(24 * 60 * 1000);
		setTimeout(async function() {
			client.dataStorage.del("currency.usedDaily");
			resetDaily();
		}, 24 * 60 * 1000 - t);
	}
	
	return;
}