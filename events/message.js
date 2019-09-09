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
	
	var tmp = client.commands
	console.log(tmp);
	
	
	
	if (prefix) {
		console.log("message included prefix. testing for matching command...")
		for (const entry of client.commands.entries()) {
			const name = entry[0];
			const functions = entry[1];
			console.log("testing '", name, "' command");
			if (functions.condition(client, channel, userstate, command, args, content)) {
				console.log("'", name, "' condition was fulfilled. executing...");
				functions.run(client, channel, userstate, command, args, content);
				break;
			}
		}
	}
	
	return;
	/*
	if (prefix) {
		console.log(client.commands);
		console.log(client.commands.get("ping"));
		console.log(client.commands.get("ping").condition(client, channel, userstate, command, args, content));
		client.commands.get("ping").run(client, channel, userstate, command, args, content);
	} else {
		console.log(client.responses);
		console.log(client.responses.get("erick"));
		console.log(client.responses.get("erick").condition(client, channel, userstate, content));
		client.responses.get("erick").run(client, channel, userstate, content);
	}
	*/
}