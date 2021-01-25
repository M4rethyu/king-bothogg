exports.run = async (client) => {
	client.discord.updateGamesChannels(client.discord.mainServer());

	return;
};

exports.config = {
	"cooldown" : 60,
	"initial" : 5
};

exports.condition = (client) => {
	return true;
};