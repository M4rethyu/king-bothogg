exports.run = async (client, message, permission, content) => {
	message.channel.send("template");
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true
};

exports.condition = (client, message, permission, content) => {
	return false;
};