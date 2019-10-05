exports.run = async (client, message, permission, command, args, content) => {
	console.log(message.author.fetchProfile());
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "test") return true;
	return false;
};

exports.help = "A template for commands, so I can just copy paste"