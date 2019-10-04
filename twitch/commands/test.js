exports.run = async (client, channel, userstate, command, args, content) => {
	
	if (client.config.hosted) {
		client.log("warn", "RESETTING REPOSITORY TO ORIGIN/MASTER");
		
		const exec = require("child_process").exec;
		
		exec("git fetch", (err, stdout, stderr) => {
			process.stdout.write(stdout)
		});
		setTimeout(function() {
			exec("git reset --hard origin/master", (err, stdout, stderr) => {
				process.stdout.write(stdout)
			});
			
			setTimeout(function() {
				exec("refresh", (err, stdout, stderr) => {
					process.stdout.write(stdout)
				});
			}, 10);
		}, 700);
	}
	
	client.twitch.say(channel, "test successful");
	return;
};

exports.config = {
	"cooldown" : 0,
	"permission" : 0
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "test") {
		return true;
	}
	return false;
};

exports.help = "A command for testing code";