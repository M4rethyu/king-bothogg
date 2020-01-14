exports.run = async (client, message, arguments, options, permission) => {
	
	switch(arguments._command) {
		case "ping":
			if (client.discord.tasks.get("liveping").config.ready) client.discord.tasks.get("liveping").run(client);
			break;
		case "startping":
			client.pinging = true;
			message.channel.send("Enabled live-pings");
			break;
		case "stopping":
			client.pinging = true;
			message.channel.send("Disabled live-pings");
			break;
	}
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 3,
	"syntax" : [
		
	],
	"usage" : [
		
	],
	"channels" : "console",
	"help" : "Pings everyone in the announcements channel with a live notification"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "ping" ||
		arguments._command === "startping" ||
		arguments._command === "stopping"
		) return true;
	return false;
};