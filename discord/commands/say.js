exports.run = async (client, message, permission, command, args, content) => {
	
	//console.log(message);
	/*
	var channel = args[0];
	if (typeof channel == "undefined") {
		return false;
	}
	
	var string = content.replace("say","");
	
	console.log(string);
	
	if (/<#\d{1,}>/.test(channel)) {
		channelID = channel.match(/\d/);
		string = string.replace(channel, "");
		channel = client.discord.channels.find(c => c.id == channelID);
	} else {
		return false;
	}
	
	console.log(string);
	
	string = string.trim();
	
	var options = [];
	for (i = args.length - 1; /\-[a-zA-Z]/.test(args[i]); i--) {
		options.push(args[i][1]);
		string.replace(new RegExp("\\-" + args[i][1] + "$"), "");
		string.trim();
	}
	
	console.log(string);
	console.log(options);
	
	
	
	string.match(/\-[a-zA-Z](\-[a-zA-Z]|$)/)
	
	if (typeof rank == "undefined") {
		channel.send(message.author + ", this rank doesn't exist");
		return false;
	}
	
	if (rank.permission < permission) {
		channel.send(message.author + ", you can't assign this rank.");
		return false;
	}
	
	const role = message.guild.roles.find(r => r.id == rank.roleID);
	if (!role) {
		channel.send(message.author + ", this rank's role doesn't exist. Please ping a mod, if you think this is unintended");
		return false;
	}
	
	return;*/
};

exports.config = {
	"cooldown" : 30,
	"sharedCooldown" : false,
	"permission" : 0
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "say") return true;
	return false;
};

exports.help = "Make the bot say something."