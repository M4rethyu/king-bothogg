exports.run = async (client, channel, userstate, command, args, content) => {
	client.log("warn", "RESETTING REPOSITORY TO ORIGIN/MASTER");
	
	const exec = require("child_process").exec;
	
	exec("git fetch", (err, stdout, stderr) => {
		process.stdout.write(stdout)
	});
	exec("git reset --hard origin/master", (err, stdout, stderr) => {
		process.stdout.write(stdout)
	});
	exec("refresh", (err, stdout, stderr) => {
		process.stdout.write(stdout)
	});
	
	// Does it work? Maybe
	
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