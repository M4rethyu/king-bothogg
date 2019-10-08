exports.run = async (client, message, permission, command, args, content) => {
	
	var channel = args[0];
	if (typeof channel == "undefined") {
		return false;
	}
	
	var string = content.replace("say","");
	
	console.log(string);
	
	if (/<#\d{1,}>/.test(channel)) {
		channelID = channel.match(/\d{1,}/);
		string = string.replace(channel, "");
		channel = client.discord.channels.find(c => c.id == channelID);
	} else {
		return false;
	}
	
	//console.log(channel);
	console.log(string);
	
	string = string.trim();
	
	var options = [];
	for (i = args.length - 1; /\-[a-zA-Z]/.test(args[i]); i--) {
		options.push(args[i][1]);
		string = string.replace(new RegExp(args[i] + "$", "g"), "");
		string = string.trim();
	}
	
	for (const opt of options) {
		switch(opt) {
		case "d": // Delete Message
			message.delete().catch(err => client.log("error", err));
			break;
		}
	}
	
	channel.send(string);
	
	
	return;
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