module.exports = async (client, message) => {
	// Ignore messages sent by a bot
	if (message.author.bot) return;
	// Only use Erick's server when hosted, only use mine when running locally
	if (client.config.hosted) {
		if (message.guild.id != "159712694671245312") return false;
	} else {
		//if (message.guild.id != "437644282933936130") return false;
	}
	// Preparing variables
	const channel = message.channel;
	const guild = message.guild;
	const username = message.author.username;
	const id = message.author.id;
	
	var logMessage = ((channel.type == "dm")?"[DM], ":"#" + channel.name + ", ") + message.author.tag + ": " + message.content + " [ ";
	
	var prefix;
	var content;
	var args;
	var command;
	if (message.content.startsWith(client.discord.config.prefix)) {
		prefix = true;
		content = message.content.slice(client.discord.config.prefix.length);
		args = content.trim().split(/ +/g);
		command = args.shift().toLowerCase();
	} else {
		prefix = false;
		content = message.content;
	}
	
	var permissionLevel = 5;
	if (client.discord.consoleChannel().members.keyArray().includes(message.author.id)) permissionLevel = 3;
	if (client.discord.config.admins.includes(message.author.id)) permissionLevel = 2;
	//if (false) permissionLevel = 1;
	if (client.discord.config.owner.includes(message.author.id)) permissionLevel = 0;
	const permission = permissionLevel;
	
	// Plebs can only use commands in the intended bot spam channel
	console.log(channel.id)
	console.log(typeof channel.id)
	console.log(client.discord.config.spamID)
	console.log(typeof client.discord.config.spamID)
	
	if (/*permissionLevel > 3 && */channel.id != client.discord.config.spamID) {
		logMessage += ("NOT IN SPAM CHANNEL ]");
		client.log("discord", logMessage);
		return false;
	}
	
	var executedCommands = [];
	var executedResponses = [];
	
	var triggeredCommand = false;
	if (prefix) { // only check commands, if the prefix was used
		for (const entry of client.discord.commands.entries()) {
			const name = entry[0];
			const functions = entry[1];
			if (functions.condition(client, message, permission, command, args, content)) {
				if (client.discord.getCooldown(functions, id)) {
					logMessage += ("(!" + name + ") ");
					continue;
				}
				if (functions.config.permission < permissionLevel) {
					logMessage += ("<" + name + "> ");
					continue;
				}
				logMessage += ("!" + name + " ");
				functions.run(client, message, permission, command, args, content);
				executedCommands.push(name);
				break;
			}
		}
	}
	
	if (executedCommands.length == 0) { // only check through hierarchy, if no command has been used
		for (const entry of client.discord.responses.entries()) {
			const name = entry[0];
			const functions = entry[1];
			if (!(client.discord.unconditionalResponses.includes(name)) && functions.condition(client, message, permission, content)) {
				if (client.discord.getCooldown(functions, id)) {
					logMessage += ("(" + name + ") ");
					continue;
				}
				if (functions.config.permission < permissionLevel) {
					logMessage += ("<" + name + "> ");
					continue;
				}
				logMessage += (name + " ");
				functions.run(client, message, permission, content);
				executedResponses.push(name);
				break;
			}
		}
	}
	
	// execute all unconditional responses
	for (const entry of client.discord.responses.entries()) {
		const name = entry[0];
		const functions = entry[1];
		if ((client.discord.unconditionalResponses.includes(name)) && functions.condition(client, message, permission, content)) {
			if (client.discord.getCooldown(functions, id)) {
				logMessage += ("(" + name + ") ");
				continue;
			}
			if (functions.config.permission < permissionLevel) {
				logMessage += ("<" + name + "> ");
				continue;
			}
			logMessage += (name + " ");
			functions.run(client, message, permission, content);
			executedResponses.push(name);
		}
	}
	
	logMessage += ("]");
	client.log("discord", logMessage);
	//client.discord.logChannel().send(logMessage);
	
	const func = ((name, functions) => {
		if (permissionLevel > 3) { // Don't set cooldown for mods+
			client.discord.setCooldown(functions, id)
		}
		
		// Count command usage by users
		const n = client.persist("discord.commands." + name + "." + username);
		if (n == null) client.persist("discord.commands." + name + "." + username, 1);
		else client.persist("discord.commands." + name + "." + username, client.persist("discord.commands." + name + "." + username) + 1);
	});
	
	// Set cooldown for executed commands
	executedCommands.forEach(name => { func(name, client.discord.commands.get(name)) });
	
	
	// Set cooldown for executed responses
	executedResponses.forEach(name => { func(name, client.discord.responses.get(name)) });
	
	
	return;
}