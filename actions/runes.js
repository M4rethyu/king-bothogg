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
	return true;
};