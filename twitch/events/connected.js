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
	
	// Add money to all viewers every minute
	setInterval(async function() {
		const live = await client.twitch.live("king_nidhogg")
		if (live) {
			console.log("awarding chatters a nidcoin");
			
			const chatters = (await client.twitch.viewerlist("king_nidhogg")).chatters;
			var list = chatters.broadcaster.concat(chatters.vips, chatters.moderators, chatters.staff, chatters.admins, chatters.global_mods, chatters.viewers);
			
			list.forEach(name => {
				const amount = client.currency(name, 1);
			});
		}
	}, 1 * 60 * 1000);
	
	// Resets the !daily command at 3pm EST
	resetDaily = () => {
		// Reset   daily    at                                 EST               3pm
		const t = (24 * 3600 * 1000) - (new Date().getTime() - 5 * 3600 * 1000 - 15 * 3600 * 1000)%(24 * 3600 * 1000);
		setTimeout(async function() {
			client.dataStorage.del("currency.usedDaily");
			resetDaily();
		}, t);
		const hours = Math.floor(t/(3600 * 1000))
		console.log("resetting daily in " + hours + " hours, " + Math.floor((t - hours * 3600 * 1000)/(60 * 1000)) + " minutes");
	}
	resetDaily();
	
	const cooldown = {};
	
	setInterval(async function() {
		client.actions.forEach((functions, name) => {
			if (!functions.onCooldown && functions.condition(client)) {
				functions.run(client);
				functions.onCooldown = true;
				setTimeout(async function() {
					functions.onCooldown = false;
				}, functions.config.cooldown * 1000)
			}
		});
	}, 10001)
	
	
	
	return;
}