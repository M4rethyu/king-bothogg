exports.run = async (client, channel, userstate, command, args, content) => {
	
	client.log("log+", "UPDATING REPOSITORY");
	
	const exec = require("child_process").exec;
	
	exec("git pull", (err, stdout, stderr) => {
		process.stdout.write(stdout)
	});
	setTimeout(function() {
		exec("refresh", (err, stdout, stderr) => {
			process.stdout.write(stdout)
		});
	}, 1000);
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0
};

exports.condition = (client, channel, userstate, command, args, content) => {
	return false;
	if (command === "update" && client.config.hosted) return true;
	return false;
};

exports.help = "Updates glitch to origin/master"