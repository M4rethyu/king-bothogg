exports.run = async (client, message, permission, command, args, content) => {
	message.channel.send(Math.random() < 0.5?"heads":"tails");
	return;
};

exports.config = {
	"cooldown" : 10,
	"sharedCooldown" : false,
	"permission" : 5
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "coinflip") return true;
	return false;
};

exports.help = "Flip a coin"