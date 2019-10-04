module.exports = async (client, channel, userstate, message, self) => {
	if (self) return; // Ignore messages sent by the bot itself
	var logMessage = userstate["display-name"] + ": " + message + " [ ";
	// Preparing Variables
	var prefix;
	var content;
	var args;
	var command;
	if (message.startsWith(client.config.prefix)) {
		prefix = true;
		content = message.slice(client.config.prefix.length);
		args = content.trim().split(/ +/g);
		command = args.shift().toLowerCase();
	} else {
		prefix = false;
		content = message;
	}
	
	var username = userstate.username;
	
	var permissionLevel = 5;
	if (userstate.mod) permissionLevel = 3;
	if (client.config.admins.includes(username)) permissionLevel = 2;
	if (("#" + username) == channel) permissionLevel = 1;
	if (username == "xmarethyu") permissionLevel = 0;
	userstate.permission = permissionLevel;
	
	var executedCommands = [];
	var executedResponses = [];
	
	var triggeredCommand = false;
	if (prefix) { // only check commands, if the prefix was used
		for (const entry of client.twitch.commands.entries()) {
			const name = entry[0];
			const functions = entry[1];
			if (functions.condition(client, channel, userstate, command, args, content)) {
				if (client.getCooldown(functions, channel, username)) {
					logMessage += ("(!" + name + ") ");
					continue;
				}
				if (functions.config.permission < permissionLevel) {
					logMessage += ("<" + name + "> ");
					continue;
				}
				logMessage += ("!" + name + " ");
				functions.run(client, channel, userstate, command, args, content);
				executedCommands.push(name);
				break;
			}
		}
	}
	
	if (executedCommands.length == 0) { // only check through hierarchy, if no command has been used
		for (const entry of client.twitch.responses.entries()) {
			const name = entry[0];
			const functions = entry[1];
			if (!(client.twitch.unconditionalResponses.includes(name)) && functions.condition(client, channel, userstate, content)) {
				if (client.getCooldown(functions, channel, username)) {
					logMessage += ("(" + name + ") ");
					continue;
				}
				if (functions.config.permission < permissionLevel) {
					logMessage += ("<" + name + "> ");
					continue;
				}
				logMessage += (name + " ");
				functions.run(client, channel, userstate, content);
				executedResponses.push(name);
				break;
			}
		}
	}
	
	// execute all unconditional responses
	for (const entry of client.twitch.responses.entries()) {
		const name = entry[0];
		const functions = entry[1];
		if ((client.twitch.unconditionalResponses.includes(name)) && functions.condition(client, channel, userstate, content)) {
			if (client.getCooldown(functions, channel, username)) {
				logMessage += ("(" + name + ") ");
				continue;
			}
			if (functions.config.permission < permissionLevel) {
				logMessage += ("<" + name + "> ");
				continue;
			}
			logMessage += (name + " ");
			functions.run(client, channel, userstate, content);
			executedResponses.push(name);
		}
	}
	
	logMessage += ("]");
	client.log("chat", logMessage);
	
	
	const func = ((name, functions) => {
		if (permissionLevel > 3) { // Don't set cooldown for mods+
			client.setCooldown(functions, channel, username)
		}
		
		// Count command usage by users
		const n = client.persist("commands." + name + "." + username);
		if (n == null) client.persist("commands." + name + "." + username, 1);
		else client.persist("commands." + name + "." + username, client.persist("commands." + name + "." + username) + 1);
	});
	
	// Set cooldown for executed commands
	executedCommands.forEach(name => { func(name, client.twitch.commands.get(name)) });
	
	
	// Set cooldown for executed responses
	executedResponses.forEach(name => { func(name, client.twitch.responses.get(name)) });
	
	
	return;
}