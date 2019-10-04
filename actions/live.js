exports.run = async (client) => {
	const live = await client.twitch.live("king_nidhogg");
	if (live) { // Is live
		if (client.twitch.liveStatus) { // Was live => continued streaming
			client.log("log", "Erick continued streaming");
		} else { // Wasn't live => started streaming
			client.log("log", "Erick started streaming");
		}
	} else { // Isn't live
		if (client.twitch.liveStatus) { // Was live => stopped streaming
			client.log("log", "Erick stopped streaming");
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