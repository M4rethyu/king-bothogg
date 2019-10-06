exports.run = async (client, message, permission, content) => {
	args = content.trim().split(/ +/g);
	
	for (const arg of args) {
		switch(arg[1])	{
			case "u":
				if (client.config.hosted) client.discord.commands.get("update").run(client);
				else client.log("warn", "didn't run '!update', because program isn't running on glitch");
				break;
			case "b":
				client.discord.commands.get("backup").run(client);
				break;
			default:
				client.log("warn", "used '" + arg + "' as an argument in shortcuts, has no function");
				break;
		}
	}
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0
};

exports.condition = (client, message, permission, content) => {
	args = content.trim().split(/ +/g);
	var regex = /\-[a-zA-Z]/;
	
	for (const arg of args) {
		if (!regex.test(arg)) return false;
	}
	
	return true;
};