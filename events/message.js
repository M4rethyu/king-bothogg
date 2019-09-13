module.exports = async (client, channel, userstate, message, self) => {
	if (self) return; // Ignore messages sent by the bot itself
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
	
	var executedCommands = [];
	var executedResponses = [];
	
	var triggeredCommand = false;
	if (prefix) { // only check commands, if the prefix was used
		console.log("message included prefix. testing for matching command...")
		for (const entry of client.commands.entries()) {
			const name = entry[0];
			const functions = entry[1];
			console.log("testing '", name, "' command");
			if (functions.condition(client, channel, userstate, command, args, content)) {
				console.log(name, "'s cooldown state is: ", functions.onCooldown);
				if (functions.onCooldown) continue;
				console.log("'", name, "' condition was fulfilled. executing...");
				functions.run(client, channel, userstate, command, args, content);
				executedCommands.push(name);
				break;
			}
		}
	}
	
	if (!triggeredCommand) { // only check through hierarchy, if no command has been used
		console.log("testing for matching hierarchy response...")
		for (const entry of client.responses.entries()) {
			const name = entry[0];
			const functions = entry[1];
			console.log("testing '", name, "' response");
			if (!(client.unconditionalResponses.includes(name)) && functions.condition(client, channel, userstate, content)) {
				if (functions.onCooldown) continue;
				console.log("'", name, "' condition was fulfilled. executing...");
				functions.run(client, channel, userstate, content);
				executedResponses.push(name);
				break;
			}
		}
	}
	
	// execute all unconditional responses
	console.log("testing for matching unconditional response...")
	for (const entry of client.responses.entries()) {
		const name = entry[0];
		const functions = entry[1];
		console.log("testing '", name, "' response");
		if ((client.unconditionalResponses.includes(name)) && functions.condition(client, channel, userstate, content)) {
			if (functions.onCooldown) continue;
			console.log("'", name, "' condition was fulfilled. executing...");
			functions.run(client, channel, userstate, content);
			executedResponses.push(name);
		}
	}
	
	// Set cooldown for executed commands
	executedCommands.forEach((name) => {
		const functions = client.commands.get(name);
		if (!(typeof functions.config.cooldown) == Number) return;
		functions.onCooldown = true;
		setTimeout(function(){ functions.onCooldown = false; }, functions.config.cooldown * 1000);
	});
	
	// Set cooldown for executed responses
	executedResponses.forEach((name) => {
		const functions = client.responses.get(name);
		if (!(typeof functions.config.cooldown) == Number) return;
		functions.onCooldown = true;
		setTimeout(function(){ functions.onCooldown = false; }, functions.config.cooldown * 1000);
	});
	
	return;
}