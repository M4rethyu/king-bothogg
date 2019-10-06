exports.run = async (client, message, permission, command, args, content) => {
	
	client.discord.logChannel().send(
	"[BACKUP]: Created at '" + new Date() + "'",
	{
		files: [{
			attachment: './modules/permanentData.json',
			name: 'permanentData.json'
		}]
	});
	
	client.log("console", "Created backup in " + client.discord.logChannel());
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 3
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "backup" && message.channel.id == client.discord.config.consoleID) return true;
	return false;
};

exports.help = "Create a backup of 'permanentData.json', and send it to the log channel"