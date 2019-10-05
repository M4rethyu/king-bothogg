exports.run = async (client, message, permission, command, args, content) => {
	message.channel.send("template");
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "template") return true;
	return false;
};

exports.help = "A template for commands, so I can just copy paste"