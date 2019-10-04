exports.run = async (client, channel, userstate, command, args, content) => {
	
	exec = require("child_process").exec;
	exec("refresh", (err, stdout, stderr) => {
		process.stdout.write(stdout)
	});
	
	
	
	client.twitch.say(channel, "test successful");
	return;
};

exports.config = {
	"cooldown" : 0,
	"permission" : 0
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "test" && client.config.admins.includes(userstate.username)) {
		return true;
	}
	return false;
};

exports.help = "A command for testing code";