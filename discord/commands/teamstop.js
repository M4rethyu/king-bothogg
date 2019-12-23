exports.run = async (client, message, arguments, options, permission) => {
	client.teamsort = {};
	msg = "Stopped forming teams"
	message.channel.send(msg);
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
	"channels" : "spam",
	"help" : "Join a list which will be sorted into teams"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "teamstop") return true;
	return false;
}; {}