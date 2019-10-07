exports.run = async (client, message, permission, command, args, content) => {
	channel.send("test successful")
	
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

exports.help = "test code here"