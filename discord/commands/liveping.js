exports.run = async (client, message, arguments, options, permission) => {
	
	if (client.discord.tasks.get("liveping").config.ready) client.discord.tasks.get("liveping").run(client);
	
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
	if (arguments._command === "ping") return true;
	return false;
};