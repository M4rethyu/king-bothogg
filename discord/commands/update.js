exports.run = async (client, message, permission, command, args, content) => {
	
	client.log("warn", "UPDATING REPOSITORY");
	
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

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "update" && client.config.hosted) return true;
	return false;
};

exports.help = "Updates the repository."