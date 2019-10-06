exports.run = async (client) => {
	const liveStati = [
		(() => client.discord.user.setPresence({
			game: {
				name: "Erick's stream",
				type: "WATCHING"
			}
		})),
		(() => client.discord.user.setPresence({
			game: {
				name: "to Erick's stream",
				type: "LISTENING"
			}
		}))
	];
	
	const deadStati = [
		(() => client.discord.user.setPresence({
			game: {
				name: "you closely",
				type: "WATCHING"
			}
		})),
		(() => client.discord.user.setPresence({
			game: {
				name: "to AI debates",
				type: "LISTENING"
			}
		})),
		(() => client.discord.user.setPresence({
			game: {
				name: "apocalyptic movies",
				type: "WATCHING"
			}
		})),
		(() => client.discord.user.setPresence({
			game: {
				name: "god",
				type: "PLAYING"
			}
		}))
	];
	
	const live = await client.twitch.live("king_nidhogg");
	if (live) { // Is live
		var i = Math.floor(Math.random()*liveStati.length);
		liveStati[i]();
		
		if (client.twitch.liveStatus) { // Was live => continued streaming
			client.log("log", "Erick continued streaming");
		} else { // Wasn't live => started streaming
			client.log("log+", "Erick started streaming");
		}
	} else { // Isn't live
		var i = Math.floor(Math.random()*deadStati.length);
		deadStati[i]();
		
		if (client.twitch.liveStatus) { // Was live => stopped streaming
			client.log("log+", "Erick stopped streaming");
		} else { // Wasn't live => Isn't streaming
			client.log("log", "Erick isn't streaming");
		}
	}
	client.twitch.liveStatus = live; // Update live status for next time
	return;
};

exports.config = {
	"cooldown" : 40
};

exports.condition = (client) => {
	return true;
};