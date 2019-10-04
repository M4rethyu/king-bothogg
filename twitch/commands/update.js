exports.run = async (client, channel, userstate, command, args, content) => {
	
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
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "template" && client.config.hosted) return true;
	return false;
};

exports.help = "A template for commands, so I can just copy paste"