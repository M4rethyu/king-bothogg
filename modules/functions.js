const fetch = require("node-fetch");

module.exports = (client) => {
	// Functions bound to client
	client.checkHosted = () =>
	{
		return (process.env.PROJECT_DOMAIN == "king-bothogg");
	}
	
	client.getSummonerAccounts = () =>
	{
		client.erick.summonerAccounts = [];
		for (const name of client.erick.summonerNames) {
			client.league.Summoner.by.name(name.toLowerCase()).then((summoner) => {
				client.erick.summonerAccounts.push(summoner);
				console.log("loaded account '" + name + "'");
			}, (err) => {
				console.log("couldn't find account '" + name + "'");
			});
		}
	}
	
	client.currency = (name, amount) => 
	{
		var currentAmount = client.persist("currency.amount." + name);
		if ((typeof currentAmount) != "number" || currentAmount == NaN) {
			client.persist("currency.amount." + name, 0);
			currentAmount = 0;
		}
		
		if ((typeof amount) == "number") {
			client.persist("currency.amount." + name, currentAmount + amount);
			currentAmount += amount;
		}
		
		return client.persist("currency.amount." + name);
	}
	
	client.getSummonerRunes = () =>
	{
		console.log("Getting runes");
		var promises = [];
		for (const summoner of client.erick.summonerAccounts) {
			promises.push(client.league.CurrentGame.by.summonerID(summoner.id).then((game) => {
				
				// Extract rune IDs from game
				const part = game.participants.filter(s => s.summonerName == summoner.name)[0];
				const perks = part.perks;
				const mainTree = client.runeNames.filter(t => t.id == perks.perkStyle)[0];
				
				const scndTree = client.runeNames.filter(t => t.id == perks.perkSubStyle)[0];
				
				const main0 = mainTree.slots[0].runes.filter(t => t.id == perks.perkIds[0])[0];
				const main1 = mainTree.slots[1].runes.filter(t => t.id == perks.perkIds[1])[0];
				const main2 = mainTree.slots[2].runes.filter(t => t.id == perks.perkIds[2])[0];
				const main3 = mainTree.slots[3].runes.filter(t => t.id == perks.perkIds[3])[0];
				
				const slots = scndTree.slots[1].runes.concat(scndTree.slots[2].runes, scndTree.slots[3].runes);
				
				const scnd0 = slots.filter(t => t.id == perks.perkIds[4])[0];
				const scnd1 = slots.filter(t => t.id == perks.perkIds[5])[0];
				
				const stat0 = client.runeNames.runeShards[perks.perkIds[6]];
				const stat1 = client.runeNames.runeShards[perks.perkIds[7]];
				const stat2 = client.runeNames.runeShards[perks.perkIds[8]];
				
				// Pack runes neatly
				const runes = {
					"accName" : summoner.name,
					"mainTree" : mainTree.name,
					"mainRunes" : [main0.name, main1.name, main2.name, main3.name],
					"scndTree" : scndTree.name,
					"scndRunes" : [scnd0.name, scnd1.name],
					"statRunes" : [stat0, stat1, stat2]
				}
				
				// And bind to client
				client.erick.summonerRunes = runes;
				console.log(summoner.name + " is online")
				return runes;
			},(err) => {
				console.log(summoner.name + " is offline");
			return undefined;
			}));
		}
		
		const promise = Promise.all(promises.map(p => p.catch(e => e)))
			.then(results => {
				return results.filter(o => o != undefined);
			})
			.catch(e => console.log(e));
		
		return promise;
	}
	
	client.runesToMessage = () =>
	{
		var string;
		if (client.erick.summonerRunes.length > 0) {
			const runes = client.erick.summonerRunes[0];
			string =	runes.accName + "'s runes are " + 
						"Primary: " + runes.mainTree + "[" + runes.mainRunes[0] + " > " + runes.mainRunes[1] + " > " + runes.mainRunes[2] + " > " + runes.mainRunes[3] + "], " +
						"Secondary: " + runes.scndTree + "[" + runes.scndRunes[0] + " > " + runes.scndRunes[1] + "], " +
						"Rune Shards: [" + runes.statRunes[0] + " > " + runes.statRunes[1] + " > " + runes.statRunes[2] + "]";
		} else {
			string = "Can't find active game. You can look at Erick's op.gg to see the runes of past games (accounts in twitch description)";
		}
		
		return string;
	}
	
	client.test = (str) => {
		console.log("test function received :'", str, "'")
	}
	
	// Functions bound to client.twitch
	client.twitch.linkSocialMedia = (channel) =>
	{
		console.log("linking social media in", channel, "'s chat");
		client.twitch.say(channel, client.answers.social);
	}
	
	client.twitch.viewerlist = (name) => {
		console.log("getting viewlist");
		const list = fetch("http://tmi.twitch.tv/group/user/" + name + "/chatters")
			.then(res => res.json());
		return list;
	}
	
	// Functions bound to client.discord
	
	// Functions bound to client.league
	client.league.getCurrentRunes = () =>
	{
		
	}
	
	// Functions bound to client.persist
	client.persist.commandTotal = (name) =>
	{
		if ((typeof name) != "string") return false;
		
		const map = client.persist("commands." + name);
		if (map == undefined) return false;
		
		var sum = 0;
		const names = Object.getOwnPropertyNames(map);
		names.forEach(name => {
			sum += map[name];
		});
		
		return sum;
	}
	
	// Functions bound to client.spelling
	client.spelling.findMisspellings = (string, word) =>
	{
		const wordDelim = client.spelling.wordDelimiter; // Shorten variable name
		// Make case-insensitive
		string = string.toLowerCase();
		word = word.toLowerCase();
		
		if (client.spelling.misspellings[word] != undefined) {
			for (const misspelling of client.spelling.misspellings[word]) {
				const regex = new RegExp(wordDelim + misspelling + wordDelim);
				if (regex.test(string)) return true;
			}
		}
		return false;
	}
}