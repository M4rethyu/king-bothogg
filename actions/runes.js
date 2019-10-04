exports.run = async (client) => {
	client.getSummonerRunes().then(runes =>  {
		client.erick.summonerRunes = runes;
	});
	return;
};

exports.config = {
	"cooldown" : 1 * 60
};

exports.condition = (client) => {
	if (client.league.active) return true;
	return false;
};