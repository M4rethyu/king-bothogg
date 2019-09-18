module.exports = async (client, address, port) => {
	// Link social media in king_nidhogg's chat every 45 minutes
	//client.linkSocialMedia("king_nidhogg");
	//setInterval(function(){client.twitch.linkSocialMedia("king_nidhogg");}, 45 * 60 * 1000);
	
	setTimeout(function(){
		client.getSummonerRunes().then(runes =>  {
			client.erick.summonerRunes = runes;
		});
	}, 20 * 1000);
	
	setInterval(function(){
		client.getSummonerRunes().then(runes =>  {
			client.erick.summonerRunes = runes;
		});
	}, 3 * 60 * 1000);
	/*
	const names = ["ULTMEBETCH","xcvzsdfa","Teenslikeitbig","CaillouX"];
	
	for (const name of names) {
		client.league.Summoner.by.name(name.toLowerCase()).then((summoner) => {
			console.log(summoner)
			client.league.CurrentGame.by.summonerID(summoner.id).then((game) => {
				// Extract rune IDs from game
				var part = game.participants.filter(s => s.summonerName == name)[0];
				var perks = part.perks;
				mainTree = client.runeNames.filter(t => t.id == perks.perkStyle)[0];
				
				scndTree = client.runeNames.filter(t => t.id == perks.perkSubStyle)[0];
				
				main0 = mainTree.slots[0].runes.filter(t => t.id == perks.perkIds[0])[0];
				main1 = mainTree.slots[1].runes.filter(t => t.id == perks.perkIds[1])[0];
				main2 = mainTree.slots[2].runes.filter(t => t.id == perks.perkIds[2])[0];
				main3 = mainTree.slots[3].runes.filter(t => t.id == perks.perkIds[3])[0];
				
				var slots = scndTree.slots[1].runes.concat(scndTree.slots[2].runes, scndTree.slots[3].runes);
				
				scnd0 = slots.filter(t => t.id == perks.perkIds[4])[0];
				scnd1 = slots.filter(t => t.id == perks.perkIds[5])[0];
				
				perk0 = client.runeNames.runeShards[perks.perkIds[6]];
				perk1 = client.runeNames.runeShards[perks.perkIds[7]];
				perk2 = client.runeNames.runeShards[perks.perkIds[8]];
				
				console.log(name + " is running these runes:")
				console.log("Primary tree:" + mainTree.name + ":" + main0.name + ">" + main1.name + ">" + main2.name + ">" + main3.name)
				console.log("Secondary tree:" + scndTree.name + ":" + scnd0.name + ">" + scnd1.name)
				console.log("Rune shards:" + perk0 + ">" + perk1 + ">" + perk2)
			},(err) => {
				console.log(name + " is offline");
			});
		}, (err) => {
			console.log(name + " doesn't exist");
		});
	}
	*/
	return;
}