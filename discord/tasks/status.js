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
				name: "Erick's stream",
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
				name: "AI debates",
				type: "LISTENING"
			}
		})),
		(() => client.discord.user.setPresence({
			game: {
				name: "the voices",
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
				name: "Terminator",
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

	const lockStati = [
		(() => client.discord.user.setPresence({
			game: {
				name: "gatekeeper",
				type: "PLAYING"
			}
		})),
	]

	let i;
	if (client.discord.lockdown) {
		i = Math.floor(Math.random()*lockStati.length);
		lockStati[i]();
	} else if (client.twitch.liveStatus) {
		i = Math.floor(Math.random()*liveStati.length);
		liveStati[i]();
	} else {
		i = Math.floor(Math.random()*deadStati.length);
		deadStati[i]();
	}
	
	return;
};

exports.config = {
	"cooldown" : 50,
	"initial" : 10
};

exports.condition = (client) => {
	return true;
};