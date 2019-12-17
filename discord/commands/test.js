exports.run = async (client, message, arguments, options, permission) => {
	
	//if (client.discord.tasks.get("liveping").config.ready) client.discord.tasks.get("liveping").run(client);
	
	const member = client.discord.guilds.find(g => g.id == "437644282933936130").members.find(m => m.id == "231491348279066624");
	client.discord.arrivalChannel().send("Greetings, " + member + ". Welcome to **Nidhogg's Den** <:bongo:648225132925550626>");
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0,
	"syntax" : [
		
	],
	"channels" : "spam",
	"help" : "I'm using this to test code"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "test") return true;
	return false;
};