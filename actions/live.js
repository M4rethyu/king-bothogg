exports.run = async (client) => {
	const live = await client.twitch.live("king_nidhogg");
	if (live) console.log("Erick is live");
	else console.log("Erick is not live");
	
	return;
};

exports.config = {
	"cooldown" : 30
};

exports.condition = (client) => {
	return true;
};