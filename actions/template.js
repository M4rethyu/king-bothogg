exports.run = async (client) => {
	client.log("log", "template");
	return;
};

exports.config = {
	"cooldown" : 0
};

exports.condition = (client) => {
	return false;
};